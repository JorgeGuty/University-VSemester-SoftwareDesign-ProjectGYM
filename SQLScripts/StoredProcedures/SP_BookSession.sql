-- Create a new stored procedure called 'SP_BookSession' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_BookSession'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_BookSession
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_BookSession
    @pClientIdentification  NVARCHAR(50),
    @pDate                  NVARCHAR(50),
    @pStartTime             NVARCHAR(50),
    @pRoomId                INT
AS
BEGIN
    BEGIN TRY

        DECLARE @BookedSpaces                   INT
        DECLARE @TotalSpaces                    INT
        DECLARE @AvailableSpaces                INT
        DECLARE @ClientID                       INT
        DECLARE @SessionID                      INT

        DECLARE @AlreadyBookedErrorCode         INT
        DECLARE @SessionOutOfSpacesErrorCode    INT
        DECLARE @SPErrorCode                    INT     

        -- SETS ERROR CODES SET TO BE RETURNED IN CASE OF ERROR
        SET @AlreadyBookedErrorCode = 
            (
                SELECT
                    [error].Code
                FROM
                    dbo.Errors AS [error]
                WHERE
                    [error].[ErrorName] = 'AlreadyBookedError'
            )   
        SET @SessionOutOfSpacesErrorCode = 
            (
                SELECT
                    [error].Code
                FROM
                    dbo.Errors AS [error]
                WHERE
                    [error].[ErrorName] = 'SessionOutOfSpacesError'
            )   
        SET @SPErrorCode = 
            (
                SELECT
                    [error].Code
                FROM
                    dbo.Errors AS [error]
                WHERE
                    [error].[ErrorName] = 'SPError'
            )   

                SET @ClientID = 
            (
                SELECT 
                    client.ClientId
                FROM
                    dbo.CompleteClients AS client
                WHERE
                    client.Identification = @pClientIdentification               
            )

        -- Sets session id based on the session info provided.
        SET @SessionID = 
            (
                SELECT 
                    [session].SessionID
                FROM 
                    dbo.CompleteSessions AS [session]
                WHERE 
                        [session].SessionDate   = CONVERT(DATE, @pDate)
                    AND [session].RoomId        = @pRoomId
                    AND [session].StartTime     = CONVERT(TIME, @pStartTime)
            )

        -- Sets client id based on the client identification provided.
        SET @ClientID = 
            (
                SELECT 
                    client.ClientId
                FROM
                    dbo.CompleteClients AS client
                WHERE
                    client.Identification = @pClientIdentification               
            )

        -- Gets the total available spaces for a certain session.
        SET @TotalSpaces = 
            (
                SELECT 
                    [session].Spaces 
                FROM 
                    dbo.CompleteSessions AS [session]
                WHERE 
                    [session].SessionId = @SessionID                
            )

        -- Checks if client already booked that session.
        IF @ClientID IN 
            ( 
                SELECT 
                    booking.ClienteId 
                FROM 
                    dbo.Reserva AS booking 
                WHERE 
                        booking.SesionId = @SessionID 
                    AND booking.Activa = 1 
            )
            RETURN @AlreadyBookedErrorCode           
        ELSE
            BEGIN 
                SET TRANSACTION ISOLATION LEVEL REPEATABLE READ
                BEGIN TRANSACTION
                    -- Gets count of already booked spaces for that session
                    SET @BookedSpaces = 
                        (
                            SELECT 
                                COUNT(*)
                            FROM 
                                dbo.Reserva AS booking
                            WHERE 
                                booking.SesionId = @SessionID
                        )                    
                    -- Calculates the available spaces based on the previuos sets
                    SET @AvailableSpaces = @TotalSpaces - @BookedSpaces
                    IF @AvailableSpaces > 0
                        INSERT INTO 
                            dbo.Reserva (FechaReserva, Activa, ClienteId, SesionId)
                        VALUES
                            (GETDATE(), 1, @ClientID, @SessionID)
                COMMIT
                IF @AvailableSpaces <= 0 RETURN @SessionOutOfSpacesErrorCode   
            END
        RETURN 1;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK
        RETURN @SPErrorCode
    END CATCH
END
GO

DECLARE @returnvalue int
EXEC @returnvalue = SP_BookSession '1100', '2021-05-19', '10:00:00', 1
SELECT @returnvalue AS errorCode


SELECT 
    [session].SessionID
FROM 
    dbo.CompleteSessions AS [session]
WHERE 
        [session].SessionDate   = CONVERT(DATE, '2021-05-19')
    AND [session].RoomId        = 1
    AND [session].StartTime     = CONVERT(TIME, '10:00:00')