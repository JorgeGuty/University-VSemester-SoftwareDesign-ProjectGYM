-- Create a new stored procedure called 'SP_CreateClient    ' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_CreateClient   '
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_CreateClient  
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_CreateClient    
    @param1 /*parameter name*/ int /*datatype_for_param1*/ = 0, /*default_value_for_param1*/
    @param2 /*parameter name*/ int /*datatype_for_param1*/ = 0 /*default_value_for_param2*/
-- add more stored procedure parameters here
AS
BEGIN
    -- body of the stored procedure
    SELECT @param1, @param2
END
GO
-- example to execute the stored procedure we just created
EXECUTE dbo.SP_CreateClient  1 /*value_for_param1*/, 2 /*value_for_param2*/
GO