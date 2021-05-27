-- Create a new stored procedure called 'SP_GetPaymentMethods' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_GetPaymentMethods'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_GetPaymentMethods
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_GetPaymentMethods
AS
BEGIN
    SELECT 
        paymentMethod.Id        AS ID,
        paymentMethod.Nombre    AS [Name]
    FROM 
        [dbo].[FormaDePago] AS paymentMethod
END
GO
-- example to execute the stored procedure we just created
EXECUTE dbo.SP_GetPaymentMethods 1 /*value_for_param1*/, 2 /*value_for_param2*/
GO