USE PlusGymProject ;
GO  
ALTER VIEW dbo.CompleteUsers AS  
    SELECT 
        [user].Username     AS  [Username],
        [user].Id           AS  [UserId],
        [user].[Password]   AS  [Password],
        [user].[Activo]     AS  [Active],
        [type].[Id]         AS  [TypeID],
        [type].[Nombre]     AS  [Type],
        [client].Id         AS  [uniqueIdentifier],
        [client].Nombre     AS  [Name]
    FROM 
        dbo.Usuario AS [user]
    INNER JOIN 
        dbo.TipoUsuario AS [type]
        ON [type].Id = [user].TipoUsuario
    INNER JOIN 
        dbo.UsuarioCliente AS clientUser
        ON [user].Id = clientUser.Id
    INNER JOIN 
        dbo.Cliente AS client
        ON clientUser.ClienteId = client.Id
    UNION ALL
    SELECT 
        [user].Username     AS  [Username],
        [user].Id           AS  [UserId],
        [user].[Password]   AS  [Password],
        [user].[Activo]     AS  [Active],
        [type].[Id]         AS  [TypeID],
        [type].[Nombre]     AS  [Type],
        [admin].Id          AS  [uniqueIdentifier],
        [admin].Nombre      AS  [Name]
    FROM 
        dbo.Usuario AS [user]
    INNER JOIN 
        dbo.TipoUsuario AS [type]
        ON [type].Id = [user].TipoUsuario
    INNER JOIN 
        dbo.UsuarioAdmin AS adminUser
        ON [user].Id = adminUser.Id
    INNER JOIN 
        dbo.Administrador AS [admin]
        ON adminUser.Id = [admin].Id


GO
-- Query to test
SELECT *  
FROM dbo.CompleteUsers
