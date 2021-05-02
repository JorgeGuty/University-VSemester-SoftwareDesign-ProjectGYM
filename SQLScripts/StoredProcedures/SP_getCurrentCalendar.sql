-- =============================================
-- Author:		Eduardo Madrigal Marin
-- Description:	Retrieves the sesions of the current month
-- =============================================

CREATE OR ALTER PROCEDURE dbo.SP_getCurrentCalendar
AS
    BEGIN
        DECLARE @StartDate Date;
        SET @StartDate = GETDATE();

        SELECT 
            s.Id, 
            s.Nombre AS name,
            s.Fecha                              AS [date],
            s.HoraInicio                         AS startTime,
            s.DuracionMinutos                    AS duration,
            ISNULL((s.Cupo - r.Reservas),s.Cupo) AS availableSpaces,
            s.Costo                              AS cost,
            s.Cancelada                          AS isCanceled,
            i.Nombre                             AS instructor, 
            es.Nombre                            AS Service
        FROM dbo.Sesion s
        INNER JOIN dbo.Especialidades es
            ON es.Id = s.EspecialidadId
        INNER JOIN dbo.Instructor i 
            ON i.Id = s.InstructorId
        LEFT JOIN
            (
                SELECT SesionId, COUNT(SesionId) AS Reservas 
                    FROM dbo.Reserva
                    GROUP BY SesionId
            ) AS r
            ON r.SesionId = s.Id
        WHERE Fecha >= @StartDate
    END