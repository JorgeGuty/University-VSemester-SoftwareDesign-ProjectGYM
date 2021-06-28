-- =============================================
-- Author:		Eduardo Madrigal Marin
-- Description:	Adds prize to a client
-- =============================================
CREATE PROCEDURE dbo.SP_InsertPrize
    @pMembershipNumber   INT,
    @pPrizeNumber        INT,
    @pMonth              INT,
    @pYear               INT
AS
    BEGIN
        DECLARE @SPErrorCode                    INT;
        DECLARE @ClientNotFoundErrorCode        INT;
        
        SET @SPErrorCode                   = -50001;
        SET @ClientNotFoundErrorCode       = -50012;

        DECLARE @ClientId                       INT;
        DECLARE @PrizeId                       INT;
           
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

            SET @PrizeId = 
                (
                    SELECT 
                        Id
                    FROM 
                        dbo.Premios
                    WHERE
                        @pPrizeNumber = Id
                )

            IF @PrizeId IS NULL
                RETURN -50001

            INSERT INTO PremiosPorCliente (ClienteId, PremioId, Mes, Año)
            VALUES (@ClientId, @PrizeId, @pMonth, @pYear)

            RETURN 1;
                 
        END TRY

        BEGIN CATCH
            RETURN @SPErrorCode;
        END CATCH

    END
GO

-- EXEC SP_InsertPrize 1, 1, 1, 2021
-- SELECT * FROM PremiosPorCliente

-- SELECT * FROM Premios