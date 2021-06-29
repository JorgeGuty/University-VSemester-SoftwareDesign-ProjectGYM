-- Create a new stored procedure called 'SP_UpdateUserDetails' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_UpdateUserDetails'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_UpdateUserDetails
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_UpdateUserDetails
    @pCurrentUsername   NVARCHAR(50),
    @pUsername          NVARCHAR(50),
    @pUserTypeID        INT
AS
BEGIN
    BEGIN TRY

        DECLARE @UsernameTakenErrorCode INT = (SELECT error.Code FROM dbo.Errors AS error WHERE error.ErrorName = 'UsernameTakenError')
        DECLARE @UserNotFoundErrorCode  INT = (SELECT error.Code FROM dbo.Errors AS error WHERE error.ErrorName = 'UserNotFound')
        DECLARE @SPErrorCode            INT = (SELECT error.Code FROM dbo.Errors AS error WHERE error.ErrorName = 'SPError')     
        DECLARE @AffectedRowsCount      INT
        IF EXISTS 
            ( 
                SELECT  
                *
                FROM
                    dbo.Usuario AS [user]
                WHERE
                        [user].Username         = @pUsername
                    AND [user].[TipoUsuario]    = @pUserTypeID
                    AND [user].[Activo]         = 1
            )
            RETURN @UsernameTakenErrorCode          
        ELSE
            BEGIN 
                SET TRANSACTION ISOLATION LEVEL REPEATABLE READ
                BEGIN TRANSACTION
                    -- Update rows in table '[Usuario]' in schema '[dbo]'
                    UPDATE [dbo].[Usuario]
                    SET
                        [Username] = @pUsername
                    WHERE /* add search conditions here */
                        [Username]  = @pCurrentUsername
                    AND [Activo]    = 1
                            
                SET @AffectedRowsCount = @@ROWCOUNT 
                COMMIT
            END
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
EXEC @returnvalue = dbo.SP_UpdateUserDetails 'ÇlienteA','ÇlienteA',1
SELECT @returnvalue AS returnValue
-- Select rows from a Table or View '[Usuario]' in schema '[dbo]'
SELECT * FROM [dbo].[Usuario]
select * from Usuario