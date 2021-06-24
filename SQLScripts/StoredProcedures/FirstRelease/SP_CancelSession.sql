-- Create a new stored procedure called 'SP_CancelSession' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_CancelSession'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_CancelSession
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_CancelSession
    @pDate                  NVARCHAR(50),
    @pStartTime             NVARCHAR(50),
    @pRoomId                INT
AS
BEGIN
    BEGIN TRY

          
        DECLARE @SPErrorCode            INT = (SELECT error.Code FROM dbo.Errors AS error WHERE error.ErrorName = 'SPError')     
        DECLARE @NoSessionsFound        INT = (SELECT error.Code FROM dbo.Errors AS error WHERE error.ErrorName = 'NoSessionsFoundError')  
        DECLARE @CannotCancelErrorCode  INT = (SELECT error.Code FROM dbo.Errors AS error WHERE error.ErrorName = 'CannotCancelSession')  
        DECLARE @SessionID              INT    

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
        
        DECLARE @SessionDateTime DATETIME = CAST(@pDate as DATETIME) + CAST(@pStartTime as DATETIME)

        IF DATEDIFF(HOUR, GETDATE(), @SessionDateTime) < 12
            RETURN @CannotCancelErrorCode
        ELSE
            BEGIN
                UPDATE 
                    dbo.Sesion
                SET
                    Cancelada = 1
                WHERE 
                        Id          = @SessionID 
                    AND Cancelada   = 0                  
                IF @@ROWCOUNT = 0 RETURN @NoSessionsFound
            END
        RETURN 1
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
EXEC @returnvalue = dbo.SP_CancelSession '2021-05-16', '20:30', 1
SELECT @returnvalue AS returnValue

