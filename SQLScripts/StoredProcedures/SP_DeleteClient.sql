-- Create a new stored procedure called 'SP_DeleteClient' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_DeleteClient'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_DeleteClient
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_DeleteClient
    @pMembershipNumber INT
-- add more stored procedure parameters here
AS
BEGIN        
    BEGIN TRY

        DECLARE @ClientNotFoundErrorCode    INT = (SELECT error.Code FROM dbo.Errors AS error WHERE error.ErrorName = 'ClientNotFound')
        DECLARE @SPErrorCode                INT = (SELECT error.Code FROM dbo.Errors AS error WHERE error.ErrorName = 'SPError')     
        DECLARE @AffectedRowsCount          INT

        SET TRANSACTION ISOLATION LEVEL REPEATABLE READ
        BEGIN TRANSACTION
            -- Update rows in table '[Usuario]' in schema '[dbo]'
            UPDATE [dbo].[Cliente]
            SET
                [Active] = 0
            WHERE /* add search conditions here */
                [Id]        = @pMembershipNumber
            AND [Active]    = 1
                    
            SET @AffectedRowsCount = @@ROWCOUNT 

            -- Update rows in table '[Reserva]' in schema '[dbo]'
            UPDATE [dbo].[Reserva]
            SET
                [Activa] = 0
            WHERE /* add search conditions here */
                [Id]        = @pMembershipNumber
            AND [Activa]    = 1

        COMMIT
        IF @AffectedRowsCount = 0 RETURN @ClientNotFoundErrorCode
        ELSE RETURN 1
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK
        RETURN @SPErrorCode
    END CATCH
END
GO
DECLARE @returnvalue int
EXEC @returnvalue = dbo.SP_DeleteClient 3
SELECT @returnvalue AS returnValue