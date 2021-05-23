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
    @pMembershipNumber  INT
AS
BEGIN
    -- body of the stored procedure
    SELECT 
        client.Id       AS  [MembershipNumber],
        client.Nombre   AS  [Name],
        client.Correo   AS  [Email],
        client.Celular  AS  [PhoneNumber],
        client.Cedula   AS  [Identification],
        client.Saldo    AS  [Balance]
    FROM 
        dbo.Cliente AS client
    WHERE
        client.Id = @pMembershipNumber
END
GO
-- example to execute the stored procedure we just created
EXECUTE dbo.SP_GetClientProfileInfo 1
GO