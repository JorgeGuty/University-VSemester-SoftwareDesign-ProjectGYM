-- =============================================
-- Author:		Eduardo Madrigal Marin
-- Description:	Gets favorite services of a given client
-- =============================================

ALTER PROCEDURE dbo.SP_GetFavoriteServices
    @pMembershipNumber   INT
AS
    BEGIN
        DECLARE @ClientId                       INT;

        DECLARE @ClientNotFoundErrorCode                 INT;
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
            services.Id,
            services.Nombre AS [Name],
            services.Aforo  AS MaxSpaces,
            services.Costo  AS Cost
        FROM 
            dbo.Especialidades services
                INNER JOIN 
                dbo.ServiciosFavoritos favs
                ON favs.EspecialidadId = services.Id
        WHERE
            services.Activa = 1
            AND 
            favs.Active     = 1;

        RETURN 1;

    END
GO

-- Tests
-- dbo.SP_GetFavoriteServices 1 