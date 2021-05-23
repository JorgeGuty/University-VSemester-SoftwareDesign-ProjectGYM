-- Create a new stored procedure called 'SP_RegisterClientUser' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_RegisterClientUser'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_RegisterClientUser
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_RegisterClientUser
    @pUserName              NVARCHAR(50),
    @pPassword              NVARCHAR(50),
    @pMembershipNumber      INT
AS
BEGIN
    BEGIN TRY

        DECLARE @UsernameTakenErrorCode         INT = (SELECT error.Code FROM dbo.Errors AS error WHERE error.ErrorName = 'UsernameTakenError')
        DECLARE @SPErrorCode                    INT = (SELECT error.Code FROM dbo.Errors AS error WHERE error.ErrorName = 'SPError')
        DECLARE @ClientNotFoundErrorCode        INT = (SELECT error.Code FROM dbo.Errors AS error WHERE error.ErrorName = 'ClientNotFound')
        DECLARE @UserAlreadyCreatedErrorCode    INT = (SELECT error.Code FROM dbo.Errors AS error WHERE error.ErrorName = 'UserAlreadyCreated')
        DECLARE @ClientUserTypeID               INT = 2
        DECLARE @NewUserID                      INT

        IF EXISTS 
            ( 
                SELECT  
                    *
                FROM
                    dbo.Usuario AS [user]
                WHERE
                        [user].Username         = @pUserName
                    AND [user].[TipoUsuario]    = @ClientUserTypeID
                    AND [user].[Activo]         = 1                    
            )
            RETURN @UsernameTakenErrorCode          
        ELSE IF EXISTS 
            (
                SELECT  
                    *
                FROM
                    dbo.UsuarioCliente AS [clientUser]
                WHERE
                    [clientUser].ClienteId = @pMembershipNumber                 
            )
            RETURN @UserAlreadyCreatedErrorCode
        ELSE IF NOT EXISTS 
            (
                SELECT  
                    *
                FROM
                    dbo.Cliente AS [cliente]
                WHERE
                        [cliente].Id = @pMembershipNumber                   
            )
            RETURN @ClientNotFoundErrorCode          
        ELSE
            BEGIN 
                SET TRANSACTION ISOLATION LEVEL REPEATABLE READ
                BEGIN TRANSACTION
                    INSERT INTO Usuario 
                        (
                            Username,
                            [Password],
                            TipoUsuario
                        )
                    VALUES
                        (
                            @pUserName,
                            @pPassword,
                            @ClientUserTypeID
                        )
                    SET @NewUserID = SCOPE_IDENTITY()
                    INSERT INTO UsuarioCliente 
                        (
                            Id,
                            ClienteId
                        )
                    VALUES
                        (
                           @NewUserID,
                           @pMembershipNumber
                        )                    
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

DECLARE @returnvalue int
EXEC @returnvalue = dbo.SP_RegisterClientUser 'NO SOY UN CLIENTE', '1010',3
SELECT @returnvalue AS returnValue
-- Select rows from a Table or View '[Usuario]' in schema '[dbo]'
SELECT * FROM [dbo].[Usuario]