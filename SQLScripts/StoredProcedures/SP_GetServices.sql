-- Create a new stored procedure called 'SP_GetServices' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_GetServices'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_GetServices
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_GetServices
AS
BEGIN
    -- body of the stored procedure
    SELECT 
        [service].Id AS ID,
        [service].Nombre AS [Name],
        [service].Aforo AS MaxSpaces
    FROM
        dbo.Especialidades AS [service]
END
GO
-- example to execute the stored procedure we just created
EXECUTE dbo.SP_GetServices 
GO