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
    @pMembershipNumber      INT,
    @pDate                  NVARCHAR(50),
    @pStartTime             NVARCHAR(50),
    @pRoomId                INT
AS
BEGIN
    BEGIN TRY

        DECLARE @BookedSpaces                   INT
        DECLARE @TotalSpaces                    INT
        DECLARE @AvailableSpaces                INT
        DECLARE @SessionID                      INT

        DECLARE @ClientNotFoundErrorCode        INT = (SELECT error.Code FROM dbo.Errors AS error WHERE error.ErrorName = 'ClientNotFound')
        DECLARE @AlreadyBookedErrorCode         INT = (SELECT error.Code FROM dbo.Errors AS error WHERE error.ErrorName = 'AlreadyBookedError')
        DECLARE @SessionOutOfSpacesErrorCode    INT = (SELECT error.Code FROM dbo.Errors AS error WHERE error.ErrorName = 'SessionOutOfSpacesError')
        DECLARE @SPErrorCode                    INT = (SELECT error.Code FROM dbo.Errors AS error WHERE error.ErrorName = 'SPError')
        DECLARE @DebtorClientErrorCode          INT = (SELECT error.Code FROM dbo.Errors AS error WHERE error.ErrorName = 'DebtorClient')
        DECLARE @SessionNotFoundErrorCode       INT = (SELECT error.Code FROM dbo.Errors AS error WHERE error.ErrorName = 'NoSessionsFoundError')

    
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

        IF @SessionID IS NULL RETURN @SessionNotFoundErrorCode

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
            
        -- Checks if client membership number exists
        IF @pMembershipNumber NOT IN 
            ( 
                SELECT 
                    client.Id 
                FROM 
                    dbo.Cliente AS client
                WHERE                     
                    client.Active = 1                     
            )
            RETURN @ClientNotFoundErrorCode
        -- Checks if clients balance is above 0.
        IF  ( 
                SELECT 
                    client.Saldo
                FROM 
                    dbo.Cliente AS client
                WHERE 
                        client.Id = @pMembershipNumber 
                    AND client.Active = 1 
            ) < 0
            RETURN @DebtorClientErrorCode     
        -- Checks if client hasn't booked that session already.
        IF @pMembershipNumber IN 
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
                                    booking.SesionId    =   @SessionID
                                AND booking.Activa      =   1
                        )                    
                    -- Calculates the available spaces based on the previuos sets
                    SET @AvailableSpaces = @TotalSpaces - @BookedSpaces
                    IF @AvailableSpaces > 0
                        INSERT INTO 
                            dbo.Reserva (FechaReserva, ClienteId, SesionId)
                        VALUES
                            (GETDATE(), @pMembershipNumber, @SessionID)
                COMMIT
                IF @AvailableSpaces <= 0 RETURN @SessionOutOfSpacesErrorCode   
                RETURN 1;
            END        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK
        RETURN @SPErrorCode
    END CATCH
END
GO

DECLARE @returnvalue int
EXEC @returnvalue = SP_BookSession 1, '2021-05-31', '08:00:00', 1
SELECT @returnvalue AS errorCode

SELECT * FROM CompleteSessions