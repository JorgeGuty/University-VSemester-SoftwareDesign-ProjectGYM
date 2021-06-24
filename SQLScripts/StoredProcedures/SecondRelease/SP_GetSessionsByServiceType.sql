-- Create a new stored procedure called 'SP_GetSessionsByServiceType' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_GetSessionsByServiceType'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_GetSessionsByServiceType
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_GetSessionsByServiceType
    @pServiceType   NVARCHAR(50)
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
    INNER JOIN
        dbo.Especialidades AS [service]
        ON [service].Id = [session].[ServiceId]        
    WHERE   
        [service].Nombre = @pServiceType
END
GO
-- example to execute the stored procedure we just created
EXECUTE dbo.SP_GetSessionsByServiceType 'Yoga'
GO      