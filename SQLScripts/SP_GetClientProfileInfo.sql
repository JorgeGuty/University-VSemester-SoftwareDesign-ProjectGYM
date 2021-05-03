-- Create the stored procedure in the specified schema
CREATE OR ALTER PROCEDURE dbo.SP_GetClientProfileInfo
    @pUsername  NVARCHAR(50)
-- add more stored procedure parameters here
AS
BEGIN
    -- body of the stored procedure
    SELECT @param1, @param2
END
GO
-- example to execute the stored procedure we just created
EXECUTE dbo.StoredProcedureName 1 /*value_for_param1*/, 2 /*value_for_param2*/
GO