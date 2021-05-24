-- Create a new stored procedure called 'SP_UpdateClientDetails' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_UpdateClientDetails'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_UpdateClientDetails
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_UpdateClientDetails
    @pMembershipNumber  INT,
    @pIdentification    NVARCHAR(50),
    @pName              NVARCHAR(50),
    @pEmail             NVARCHAR(50),
    @pPhone             NVARCHAR(50)
-- add more stored procedure parameters here
AS
BEGIN
    BEGIN TRY

        DECLARE @ClientNotFoundErrorCode    INT = (SELECT error.Code FROM dbo.Errors AS error WHERE error.ErrorName = 'ClientNotFound')
        DECLARE @EmailUnavailableErrorCode  INT = (SELECT error.Code FROM dbo.Errors AS error WHERE error.ErrorName = 'EmailUnavailable')
        DECLARE @SPErrorCode                INT = (SELECT error.Code FROM dbo.Errors AS error WHERE error.ErrorName = 'SPError')     
        DECLARE @AffectedRowsCount          INT

        IF EXISTS 
            (
                SELECT  
                    *
                FROM    
                    dbo.Cliente AS client
                WHERE
                        client.Correo = @pEmail
                    AND client.Active = 1
            )
            RETURN @EmailUnavailableErrorCode
        ELSE
            BEGIN 
                SET TRANSACTION ISOLATION LEVEL REPEATABLE READ
                BEGIN TRANSACTION
                    -- Update rows in table '[Usuario]' in schema '[dbo]'
                    UPDATE [dbo].[Cliente]
                    SET
                        [Nombre]    = @pName,
                        [Correo]    = @pEmail,
                        [Celular]   = @pPhone,
                        [Cedula]    = @pIdentification
                    WHERE /* add search conditions here */
                        [Id]        = @pMembershipNumber
                    AND [Active]    = 1
                            
                SET @AffectedRowsCount = @@ROWCOUNT 
                COMMIT
            END
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
-- example to execute the stored procedure we just created
DECLARE @returnvalue int
EXEC @returnvalue = dbo.SP_UpdateClientDetails 1,'123123', 'CambioDeUsername','aaa@a.gmail','70704284'
SELECT @returnvalue AS returnValue

select * from Cliente