-- Create a new stored procedure called 'SP_GetPreliminarySchedule' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_GetPreliminarySchedule'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_GetPreliminarySchedule
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_GetPreliminarySchedule
(
    @pMonth INT,
    @pYear  INT
)
AS
BEGIN

    -- body of the stored procedure
    SELECT 
        preliminarySession.Id               AS PreliminarySessionID,
        preliminarySession.DiaSemana        AS [WeekDay],
       
        preliminarySession.Cupo             AS [Spaces],
        preliminarySession.HoraInicio       AS [StartTime],
        preliminarySession.Nombre           AS [Name],
        preliminarySession.DuracionMinutos  AS [DurationMinutes],

        [service].Id                        AS ServiceId,
        [service].Costo                     AS Cost,
        [service].Nombre                    AS ServiceName,
        [service].Aforo                     AS ServiceMaxSpaces,

        [instructor].Id                     AS InstructorId,
        [instructor].Nombre                 AS InstructorName,
        [instructor].Cedula                 AS InstructorIdentification,
        [instructor].Correo                 AS InstructorEmail,

        [instructorType].Nombre             AS InstructorType
    FROM
        dbo.SesionPreliminar AS preliminarySession
    INNER JOIN
        dbo.Instructor AS instructor
        ON preliminarySession.InstructorId = instructor.Id
    INNER JOIN 
        dbo.TipoInstructor AS instructorType
        ON instructorType.Id = instructor.Tipo
    INNER JOIN 
        dbo.Especialidades AS [service]
        ON [service].Id = preliminarySession.EspecialidadId
    WHERE 
        preliminarySession.Activa = 1 AND preliminarySession.Mes = @pMonth AND preliminarySession.Año = @pYear
        
END
GO
-- example to execute the stored procedure we just created
EXECUTE dbo.SP_GetPreliminarySchedule 5, 2021
GO