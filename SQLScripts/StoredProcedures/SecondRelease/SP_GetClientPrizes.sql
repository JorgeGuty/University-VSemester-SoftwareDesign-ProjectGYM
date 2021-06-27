-- Create a new stored procedure called 'SP_GetClientPrizes' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_GetClientPrizes'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_GetClientPrizes
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_GetClientPrizes
    @pMonth INT,
    @pYear  INT    
-- add more stored procedure parameters here
AS
BEGIN
    -- body of the stored procedure
    SELECT 
    	prize.Nombre                AS  Prize,
        prize.EstrellasNecesarias   AS  NeededStars,
        client.Nombre               AS  Client,
        client.Id                   AS  MembershipId
    FROM
        dbo.Premios AS prize
    INNER JOIN 
        dbo.PremiosPorCliente AS clientPrize
        ON prize.Id = clientPrize.PremioId
    INNER JOIN 
        dbo.Cliente AS client
        ON client.Id = clientPrize.ClienteId
    WHERE 
            clientPrize.Mes = @pMonth
        AND clientPrize.Año = @pYear

END
GO


insert into dbo.Premios (Nombre, EstrellasNecesarias) values ('un abrazo', 1), ('un paño de billete de 1000', 2), ('un vale por un gatorade light', 3)
insert into dbo.PremiosPorCliente (ClienteId, PremioId, Mes, Año) values (1, 1, 6, 2021), (1, 2, 6, 2021),(1, 3, 6, 2021), (1, 2, 6, 2021), (2, 2, 6, 2021), (2, 3, 6, 2021) 
insert into dbo.PremiosPorCliente (ClienteId, PremioId, Mes, Año) values (2, 3, 6, 2021) 
-- example to execute the stored procedure we just created
EXECUTE dbo.SP_GetClientPrizes 6,  2021
GO