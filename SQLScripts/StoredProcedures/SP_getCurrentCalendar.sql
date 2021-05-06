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
            cs.SessionID,
            cs.Name                                    AS SessionName,
            cs.SessionDate,
            cs.StartTime,
            cs.Duration,
            ISNULL((cs.Spaces - r.Bookings), cs.Spaces) AS AvailableSpaces,
            cs.Cost,
            cs.IsCancelled,
            cs.InstructorName,
            cs.InstructorIdentification,
            cs.InstructorEmail,
            cs.InstructorType,
            cs.ServiceName
        FROM dbo.CompleteSessions cs
        LEFT JOIN
            (
                SELECT SesionId, COUNT(SesionId) AS Bookings 
                    FROM dbo.Reserva
                    GROUP BY SesionId
            ) AS r
            ON r.SesionId = cs.SessionID
        WHERE cs.SessionDate >= @StartDate
    END