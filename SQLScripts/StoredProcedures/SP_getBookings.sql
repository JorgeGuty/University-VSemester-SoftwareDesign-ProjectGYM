-- =============================================
-- Author:		Eduardo Madrigal Marin
-- Description:	Retrieves the booked sessions for a given client
-- =============================================

CREATE OR ALTER PROCEDURE dbo.SP_getBookings
    @pClientIdentification  VARCHAR(50)
AS
    BEGIN
        DECLARE @StartDate Date;
        DECLARE @ClientId int;
        SET @StartDate = GETDATE();

        SELECT @ClientId = ClientId
            FROM dbo.CompleteClients cc
            WHERE cc.Identification = @pClientIdentification;

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
        INNER JOIN
            (
                SELECT SesionId
                    FROM dbo.Reserva
                    WHERE 
                        ClienteId = @ClientId
                        AND 
                        Activa = 1

            ) AS clientSessions
        ON clientSessions.SesionId = cs.SessionID
        INNER JOIN
            (
                SELECT SesionId, COUNT(SesionId) AS Bookings 
                    FROM dbo.Reserva
                    GROUP BY SesionId
            ) AS r
            ON r.SesionId = cs.SessionID
        WHERE 
        cs.SessionDate >= @StartDate 
    END
