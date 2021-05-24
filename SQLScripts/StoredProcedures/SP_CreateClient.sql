-- Create a new stored procedure called 'SP_CreateClient    ' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_CreateClient   '
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_CreateClient  
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_CreateClient    
    @pIdentification    VARCHAR(50),
    @pName              VARCHAR(50),
    @pEmail             VARCHAR(50),
    @pPhone             VARCHAR(50)
-- add more stored procedure parameters here
AS
BEGIN
    BEGIN TRY

        DECLARE @EmailUnavailableErrorCode  INT = (SELECT error.Code FROM dbo.Errors AS error WHERE error.ErrorName = 'EmailUnavailable')
        DECLARE @SPErrorCode                INT = (SELECT error.Code FROM dbo.Errors AS error WHERE error.ErrorName = 'SPError')     

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
                    INSERT INTO 
                        dbo.Cliente 
                        (
                            Nombre,
                            Cedula,
                            Celular,
                            Correo
                        )
                    VALUES
                        (
                            @pName,
                            @pIdentification,
                            @pPhone,
                            @pEmail
                        )
                COMMIT
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
DECLARE @returnvalue int
EXEC @returnvalue = dbo.SP_CreateClient '118090772','Jorge Gutiérrez Cordero','jguty2001@gmail.com','70560910'
SELECT @returnvalue AS returnValue