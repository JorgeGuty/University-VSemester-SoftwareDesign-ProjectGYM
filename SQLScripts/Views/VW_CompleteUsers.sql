USE PlusGymProject ;
GO  
ALTER VIEW dbo.CompleteUsers AS  
    SELECT 
        [user].Username     AS  [Username],
        [user].Id           AS  [UserId],
        [user].[Password]   AS [Password],

        [type].[Id]         AS [TypeID],
        [type].[Nombre]     AS [Type]
    FROM 
        dbo.Usuario AS [user]
    INNER JOIN 
        dbo.TipoUsuario AS [type]
        ON [type].Id = [user].TipoUsuario
    ;
GO
-- Query to test
SELECT *  
FROM dbo.CompleteUsers
