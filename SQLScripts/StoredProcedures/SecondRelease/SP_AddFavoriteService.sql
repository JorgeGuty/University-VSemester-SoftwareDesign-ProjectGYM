-- =============================================
-- Author:		Eduardo Madrigal Marin
-- Description:	Adds a favorite service to a client
-- =============================================
ALTER PROCEDURE dbo.SP_AddFavoriteService
    @pMembershipNumber   INT,
    @pServiceNumber      INT
AS
    BEGIN
        DECLARE @SPErrorCode                    INT;
        DECLARE @ClientNotFoundErrorCode        INT;
        DECLARE @ServiceNotFound                INT;
        DECLARE @ServiceAlreadyFavorite         INT;  
        
        SET @SPErrorCode                   = -50001;
        SET @ClientNotFoundErrorCode       = -50012;
        SET @ServiceNotFound               = -50019;
        SET @ServiceAlreadyFavorite        = -50023;

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
            IF @FavoriteServiceId IS NOT NULL
                RETURN @ServiceAlreadyFavorite;

            INSERT INTO ServiciosFavoritos (ClienteId, EspecialidadId)
            VALUES(@pMembershipNumber, @pServiceNumber);

            RETURN 1;
                 
        END TRY

        BEGIN CATCH
            RETURN @SPErrorCode;
        END CATCH

    END
GO
-- SELECT * FROM ServiciosFavoritos
-- DECLARE @Res INT;
-- EXEC @RES = SP_AddFavoriteService 1, 2
-- PRINT @RES