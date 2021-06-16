-- =============================================
-- Author:		Eduardo Madrigal Marin
-- Description:	Fetches and filters clients
-- =============================================

ALTER PROCEDURE dbo.SP_GetClients
    @pDebtorsFilter           BIT = 0
AS
BEGIN
    SELECT

        Id          AS MembershipNumber,
        Nombre, 
        Correo,
        Celular,
        Cedula,
        Saldo

    FROM Cliente
    WHERE 
        Active = 1
        AND
        (
            @pDebtorsFilter = 0
            OR 
                @pDebtorsFilter = 1
                AND 
                Saldo < 0
        )
END
GO
-- example to execute the stored procedure we just created
EXECUTE dbo.SP_GetClients 1
GO