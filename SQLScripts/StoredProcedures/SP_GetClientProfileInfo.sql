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
        client.Username         AS  [Username],
        client.MembershipNumber AS  [MembershipNumber],
        client.UserId           AS  [UserId],
        client.Name             AS  [Name],
        client.Email            AS  [Email],
        client.PhoneNumber      AS  [PhoneNumber],
        client.Identification   AS  [Identification],
        client.Balance          AS  [Balance]
    FROM 
        dbo.CompleteClients AS client
    WHERE
        client.MembershipNumber = @pMembershipNumber
END
GO
-- example to execute the stored procedure we just created
EXECUTE dbo.SP_GetClientProfileInfo 1
GO