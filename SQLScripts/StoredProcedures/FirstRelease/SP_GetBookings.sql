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
            CS.AvailableSpaces,
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
            dbo.Reserva AS bookings
            ON  bookings.SesionId = cs.SessionID
        WHERE 
                cs.SessionDate >= @StartDate
            AND bookings.Activa = 1 
            AND bookings.ClienteId = @pMembershipNumber	
    END
GO
 SELECT * FROM Reserva
 SELECT * FROM CompleteSessions
EXEC SP_GetBookings 1
