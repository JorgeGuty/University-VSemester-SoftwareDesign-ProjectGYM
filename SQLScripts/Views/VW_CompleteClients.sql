USE PlusGymProject ;
GO  
CREATE VIEW dbo.CompleteClients AS  
    SELECT 
        [user].Username AS  [Username],
        [user].Id       AS  [UserId],
        client.Id       AS  [ClientId],
        client.Nombre   AS  [Name],
        client.Correo   AS  [Email],
        client.Celular  AS  [PhoneNumber],
        client.Cedula   AS  [Identification],
        client.Saldo    AS  [Balance]
    FROM 
        dbo.Usuario AS [user]
    INNER JOIN 
        dbo.UsuarioCliente AS clientUser
        ON [user].Id = clientUser.Id
    INNER JOIN 
        dbo.Cliente AS client
        ON clientUser.ClienteId = client.Id
    ;
GO
-- Query to test
SELECT *  
FROM dbo.CompleteClients
ORDER BY Email


