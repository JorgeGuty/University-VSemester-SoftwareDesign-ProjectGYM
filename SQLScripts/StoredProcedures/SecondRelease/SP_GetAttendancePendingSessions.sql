-- Create a new stored procedure called 'SP_GetAttendancePendingSessions' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_GetAttendancePendingSessions'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_GetAttendancePendingSessions
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_GetAttendancePendingSessions
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
            [session].AttendanceTaken = 0
        AND (       
                    (
                            [session].StartTime < CONVERT ( TIME , CURRENT_TIMESTAMP ) 
                        AND [session].[SessionDate] = CONVERT ( DATE , CURRENT_TIMESTAMP)
                    )
                OR  [session].[SessionDate] < CONVERT ( DATE , CURRENT_TIMESTAMP )
            )
END
GO
-- example to execute the stored procedure we just created
EXECUTE dbo.SP_GetAttendancePendingSessions
GO      