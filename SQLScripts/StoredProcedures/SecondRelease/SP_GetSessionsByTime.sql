-- Create a new stored procedure called 'SP_GetSessionsByTime' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_GetSessionsByTime'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_GetSessionsByTime
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_GetSessionsByTime
    @pStartTimeStr  NVARCHAR(10)
AS
BEGIN
    -- body of the stored procedure
    SELECT
        [session].SessionID,
        [session].Name                          AS SessionName,
        [session].SessionDate,
        [session].StartTime,
        [session].Duration,
        [session].AvailableSpaces,
        [session].Cost                          AS SessionCost,
        [session].IsCancelled,
        [session].InstructorName,
        [session].InstructorIdentification,
        [session].InstructorEmail,
        [session].InstructorType,
        [session].ServiceName,
        [session].Cost                          AS ServiceTypeCost,
        [session].ServiceMaxSpaces              AS ServiceMaxSpaces
    FROM 
        dbo.CompleteSessions  AS [session]
    WHERE   
        [session].StartTime = CAST(@pStartTimeStr AS Time)
END
GO
-- example to execute the stored procedure we just created
EXECUTE dbo.SP_GetSessionsByTime '8:00'
GO          