-- Create a new stored procedure called 'SP_CancelBooking' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_CancelBooking'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_CancelBooking
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_CancelBooking
    @pClientIdentification  NVARCHAR(50),
    @pDate                  NVARCHAR(50),
    @pStartTime             NVARCHAR(50),
    @pRoomId                INT

AS
BEGIN
    BEGIN TRY

        DECLARE @ClientID           INT 
        DECLARE @SessionID          INT              
        DECLARE @NotBookedErrorCode INT
        DECLARE @SPErrorCode        INT     

        -- SETS ERROR CODES SET TO BE RETURNED IN CASE OF ERROR
        SET @NotBookedErrorCode = 
            (
                SELECT
                    [error].Code
                FROM
                    dbo.Errors AS [error]
                WHERE
                    [error].[ErrorName] = 'NotBookedError'
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

        -- Checks if client has not booked that session
        IF @ClientID NOT IN 
            ( 
                SELECT 
                    booking.ClienteId 
                FROM 
                    dbo.Reserva AS booking 
                WHERE 
                        booking.SesionId = @SessionID 
                    AND booking.Activa = 1
            )
            RETURN @NotBookedErrorCode 
        ELSE
            BEGIN 
                SET TRANSACTION ISOLATION LEVEL REPEATABLE READ
                BEGIN TRANSACTION
                    -- Updates booking active attribute to 0, it means its no longer an active booking.
                    UPDATE 
                        dbo.Reserva
                    SET
                        Activa = 0
                    WHERE 
                            ClienteId   = @ClientID 
                        AND Activa      = 1            
                COMMIT
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
-- example to execute the stored procedure we just created
DECLARE @returnvalue int
EXEC @returnvalue = SP_CancelBooking '1100', '2021-05-19', '10:00:00', 1
SELECT @returnvalue AS returnValue