-- Create a new stored procedure called 'SP_DeactivateAccount' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_DeactivateAccount'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_DeactivateAccount
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_DeactivateAccount
    @pUsername      NVARCHAR(50),
    @pUserTypeID    INT
-- add more stored procedure parameters here
AS
BEGIN
    BEGIN TRY

        DECLARE @UserNotFoundErrorCode  INT = (SELECT error.Code FROM dbo.Errors AS error WHERE error.ErrorName = 'UserNotFound')
        DECLARE @SPErrorCode            INT = (SELECT error.Code FROM dbo.Errors AS error WHERE error.ErrorName = 'SPError')     
        DECLARE @AffectedRowsCount      INT

        SET TRANSACTION ISOLATION LEVEL REPEATABLE READ
        BEGIN TRANSACTION
            UPDATE 
                dbo.Usuario
            SET
                Activo = 0
            WHERE 
                    Username    = @pUsername 
                AND TipoUsuario = @pUserTypeID
                AND [Activo]    = 1                    
                            
            SET @AffectedRowsCount = @@ROWCOUNT 
        COMMIT
        IF @AffectedRowsCount = 0 RETURN @UserNotFoundErrorCode
        ELSE RETURN 1
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
EXEC @returnvalue = dbo.SP_DeactivateAccount 'Cliente2', 2
SELECT @returnvalue AS returnValue
-- Select rows from a Table or View '[Usuario]' in schema '[dbo]'
SELECT * FROM [dbo].[Usuario]
