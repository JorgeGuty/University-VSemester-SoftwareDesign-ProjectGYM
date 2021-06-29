-- =============================================
-- Author:		Eduardo Madrigal Marin
-- Description:	Gets notifications of a given client
-- =============================================

CREATE PROCEDURE dbo.SP_GetNotifications
    @pMembershipNumber   INT
AS
    BEGIN
        DECLARE @ClientId                       INT;

        DECLARE @ClientNotFoundErrorCode        INT;
        SET @ClientNotFoundErrorCode            = -50012;
           
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

        SELECT
            Id,
            [Message],
            [Date],
            [TIME]
        FROM 
            dbo.Notificaciones
        WHERE
            ClienteId  = @ClientId
            AND
            Active = 1

        RETURN 1;

    END
GO

-- Tests
--dbo.SP_GetNotifications 1 