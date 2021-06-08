-- Create a new stored procedure called 'SP_GetErrorByCode' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_GetErrorByCode'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_GetErrorByCode
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_GetErrorByCode
    @pErrorCode INT
-- add more stored procedure parameters here
AS
BEGIN
    -- body of the stored procedure
    SELECT 
        [error].ErrorName   AS ErrorName,
        [error].Code        AS ErrorCode,
        [error].[Message]   AS ErrorName
    FROM
        dbo.Errors AS [error]
    WHERE
        [error].Code = @pErrorCode
END
GO
-- example to execute the stored procedure we just created
EXECUTE dbo.SP_GetErrorByCode -50005
GO