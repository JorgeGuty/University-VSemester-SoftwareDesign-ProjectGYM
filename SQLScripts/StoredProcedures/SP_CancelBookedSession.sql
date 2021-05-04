-- Create a new stored procedure called 'SP_CancelBookedSession' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_CancelBookedSession'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_CancelBookedSession
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_CancelBookedSession
    @pUsername  VARCHAR(50),
    @pSessionID INT

AS
BEGIN
    BEGIN TRY

        DECLARE @ClientID           INT
        DECLARE @ReturnCode         INT

        -- Gets client id from the username
        SET @ClientID = 
            (
                SELECT 
                    client.ClientId
                FROM
                    dbo.CompleteClients AS client
                WHERE
                    client.Username = @pUsername               
            )

        -- Checks if client has not booked that session
        IF @ClientID NOT IN ( SELECT booking.ClienteId FROM dbo.Reserva AS booking WHERE booking.SesionId = @pSessionID AND booking.Activa = 1)
            RAISERROR (N'Session not booked by user %s', 11, 1, @pUsername);  
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
                        ClienteId = @ClientID             
                COMMIT
            END
        RETURN 1;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK
        SELECT ERROR_MESSAGE() AS ErrorMessage; 
        RETURN -1
    END CATCH
END
GO
-- example to execute the stored procedure we just created
EXECUTE dbo.SP_CancelBookedSession 1 /*value_for_param1*/, 2 /*value_for_param2*/
GO