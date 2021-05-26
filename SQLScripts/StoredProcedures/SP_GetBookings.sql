-- =============================================
-- Author:		Eduardo Madrigal Marin
-- Description:	Retrieves the booked sessions for a given client
-- =============================================

ALTER PROCEDURE dbo.SP_GetBookings
    @pMembershipNumber  INT
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
            cs.ServiceName,
            cs.Cost                                      AS ServiceTypeCost,
            cs.ServiceMaxSpaces
        FROM dbo.CompleteSessions cs
        INNER JOIN
            (
                SELECT SesionId
                    FROM dbo.Reserva
                    WHERE 
                        ClienteId = @pMembershipNumber
                        AND 
                        Activa = 1

            ) AS clientSessions
        ON clientSessions.SesionId = cs.SessionID
        INNER JOIN
            (
                SELECT SesionId, COUNT(SesionId) AS Bookings 
                    FROM dbo.Reserva
                    WHERE Activa = 1
                    GROUP BY SesionId
            ) AS r
            ON r.SesionId = cs.SessionID
        WHERE 
        cs.SessionDate >= @StartDate 
    END
GO

EXEC SP_GetBookings 1
