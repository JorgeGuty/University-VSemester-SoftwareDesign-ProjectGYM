USE PlusGymProject ;
GO  
ALTER VIEW dbo.CompleteSessions AS  
    SELECT 
        [session].Id                            AS SessionID,
        [session].Fecha                         AS SessionDate,
        [session].Cancelada                     AS IsCancelled,
        
        [preliminarySession].Nombre             AS [Name],
        
        [preliminarySession].Cupo               AS Spaces,
        [preliminarySession].DuracionMinutos    AS Duration,
        [preliminarySession].HoraInicio         AS StartTime,
        
        [service].Id                            AS ServiceId,
        [service].Nombre                        AS ServiceName,
        [service].Aforo                         AS ServiceMaxSpaces,
        [service].Costo                         AS Cost,

        [instructor].Id                         AS InstructorId,
        [instructor].Nombre                     AS InstructorName,
        [instructor].Cedula                     AS InstructorIdentification,
        [instructor].Correo                     AS InstructorEmail,

        [instructorType].Id                     AS InstructorTypeId,
        [instructorType].Nombre                 AS InstructorType,

        [room].Id                               AS RoomId,
        [room].Nombre                           AS RoomName,

        ISNULL(([preliminarySession].Cupo - r.Bookings), [preliminarySession].Cupo) AS AvailableSpaces
    FROM 
        dbo.Sesion AS [session]
    INNER JOIN 
        dbo.SesionPreliminar AS preliminarySession
        ON [preliminarySession].Id = [session].SessionPreliminarId
    INNER JOIN 
        dbo.Especialidades AS [service]
        ON [service].Id = [preliminarySession].EspecialidadId
    INNER JOIN
        dbo.Instructor AS instructor
        ON instructor.Id = [session].InstructorId
    INNER JOIN
        dbo.TipoInstructor AS instructorType
        ON instructor.Tipo = instructorType.Id
    INNER JOIN 
        dbo.Sala AS room 
        ON room.Id = preliminarySession.SalaId
    LEFT JOIN
        (
            SELECT SesionId, COUNT(SesionId) AS Bookings 
                FROM dbo.Reserva
                GROUP BY SesionId
        ) AS r
        ON r.SesionId = [session].ID
    ;
GO
-- Query to test
SELECT *  
FROM dbo.CompleteSessions
