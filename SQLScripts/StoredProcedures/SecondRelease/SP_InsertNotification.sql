-- =============================================
-- Author:		Eduardo Madrigal Marin
-- Description:	Adds a favorite service to a client
-- =============================================
ALTER PROCEDURE dbo.SP_InsertNotification
    @pMembershipNumber   INT,
    @pMessage            VARCHAR(100)
AS
    BEGIN
        DECLARE @SPErrorCode                    INT;
        DECLARE @ClientNotFoundErrorCode        INT;
        
        SET @SPErrorCode                   = -50001;
        SET @ClientNotFoundErrorCode       = -50012;

        DECLARE @ClientId                       INT;
           
        BEGIN TRY
            
            SET @ClientId = 
                (
                    SELECT 
                        Id
                    FROM 
                        dbo.Cliente
                    WHERE
                        @pMembershipNumber = Id
                        AND
                        Active = 1
                )

            IF @ClientId IS NULL
                RETURN @ClientNotFoundErrorCode

            INSERT INTO Notificaciones ([Message],[Date],[Time],ClienteId)
            VALUES (@pMessage,GETDATE(),CONVERT(TIME,GETDATE()),@ClientId)

            RETURN 1;
                 
        END TRY

        BEGIN CATCH
            RETURN @SPErrorCode;
        END CATCH

    END
GO

-- EXEC SP_InsertNotification 1, 'SP Test'
-- EXEC SP_GetNotifications 1 