-- =============================================
-- Author:		Eduardo Madrigal Marin
-- Description:	Adds a favorite service to a client
-- =============================================
CREATE PROCEDURE dbo.SP_RemoveFavoriteService
    @pMembershipNumber   INT,
    @pServiceNumber      INT
AS
    BEGIN
        DECLARE @SPErrorCode                    INT;
        DECLARE @ClientNotFoundErrorCode        INT;
        DECLARE @ServiceNotFound                INT;
        DECLARE @ServiceNotFavorite         INT;  
        
        SET @SPErrorCode                   = -50001;
        SET @ClientNotFoundErrorCode       = -50012;
        SET @ServiceNotFound               = -50019;
        SET @ServiceNotFavorite            = -50024;

        DECLARE @ClientId                       INT;
        DECLARE @ServiceId                      INT;
        DECLARE @FavoriteServiceId              INT;
           
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

            SET @ServiceId = 
                (
                    SELECT 
                        Id
                    FROM 
                        dbo.Especialidades
                    WHERE
                        @pServiceNumber = Id
                        AND 
                        Activa = 1
                )
            IF @ServiceId IS NULL
                RETURN @ServiceNotFound;
            
            SET @FavoriteServiceId = 
                (
                    SELECT 
                        Id
                    FROM 
                        dbo.ServiciosFavoritos
                    WHERE
                        @pServiceNumber = EspecialidadId
                        AND 
                        @pMembershipNumber = ClienteId
                        AND 
                        Active = 1
                )
            IF @FavoriteServiceId IS NULL
                RETURN @ServiceNotFavorite;

            UPDATE ServiciosFavoritos
            SET Active = 0
            WHERE Id = @FavoriteServiceId;

            RETURN 1;
                 
        END TRY

        BEGIN CATCH
            RETURN @SPErrorCode;
        END CATCH

    END
GO
SELECT * FROM ServiciosFavoritos
DECLARE @Res INT;
EXEC @RES = SP_RemoveFavoriteService 1, 2
PRINT @RES