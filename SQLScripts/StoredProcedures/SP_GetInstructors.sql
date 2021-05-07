-- Create a new stored procedure called 'SP_GetInstructors' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_GetInstructors'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_GetInstructors
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_GetInstructors
    @pFilterByType      BIT = 0,
    @pType              NVARCHAR(50) = '',
    @pFilterByService   BIT = 0,
    @pService           NVARCHAR(50) = ''
-- add more stored procedure parameters here
AS
BEGIN
    -- body of the stored procedure
    SELECT 
        instructor.InstructorID AS InstructorID,
        instructor.InstructorName AS InstructorName,
        instructor.InstructorEmail AS InstructorEmail,
        instructor.InstructorIdentification AS InstructorIdentification,
        instructor.[Type] AS [Type]
    FROM
        dbo.CompleteInstructors AS instructor
    WHERE 
        (
            @pFilterByType = 0 OR 
            (
                @pFilterByType = 1 
                AND instructor.Type = @pType
            )
        )
    AND
        (
            @pFilterByService = 0 OR 
            (
                @pFilterByService = 1 
                AND instructor.InstructorID IN 
                (
                    SELECT 
                        serviceXinstructor.InstructorId
                    FROM
                        dbo.EspecialidadesDeInstructores AS serviceXinstructor
                    INNER JOIN
                        dbo.Especialidades AS [service]
                        ON [service].[Id] = serviceXinstructor.EspecialidadId
                    WHERE 
                        [service].Nombre = @pService
                )
            )
        )
END
GO
-- example to execute the stored procedure we just created
EXECUTE dbo.SP_GetInstructors 1,'temporal',1,'Funcional'
GO