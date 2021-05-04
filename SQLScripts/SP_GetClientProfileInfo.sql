-- Create a new stored procedure called 'StoredProcedureName' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_GetClientProfileInfo'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_GetClientProfileInfo
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_GetClientProfileInfo
    @pUsername  NVARCHAR(50)
AS
BEGIN
    -- body of the stored procedure
    SELECT 
        [user].Username AS  [Username],
        [user].Id         AS  [UserId],
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
    WHERE 
        [user].Username = @pUsername
END
GO
-- example to execute the stored procedure we just created
EXECUTE dbo.SP_GetClientProfileInfo 'Cliente2'
GO