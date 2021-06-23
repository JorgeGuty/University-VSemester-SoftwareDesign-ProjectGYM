-- Create a new stored procedure called 'SP_GetSessionsByInstructor' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_GetSessionsByInstructor'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_GetSessionsByInstructor
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_GetSessionsByInstructor
    @pInstructorName    NVARCHAR(50)
AS
BEGIN
    DECLARE @prefixMark NVARCHAR(50) = '%%%'

    DECLARE @nameToFind NVARCHAR(100) = CONCAT(@prefixMark, @pInstructorName)

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
        dbo.Instructor AS [instructor]
        ON [instructor].Id = [session].[InstructorId]
    WHERE 
        CHARINDEX(@nameToFind, CONCAT(@prefixMark, [instructor].Nombre)) > 0
END
GO
-- example to execute the stored procedure we just created
EXECUTE dbo.SP_GetSessionsByInstructor 'Juan'
GO      