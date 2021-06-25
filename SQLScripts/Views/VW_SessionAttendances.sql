USE PlusGymProject ;
GO  
ALTER VIEW dbo.SessionAttendances AS  
    SELECT 
        booking.ClienteId   AS ClientId,
        DATEPART(YEAR, [session].SessionDate) AS [Year],
        DATEPART(MONTH, [session].SessionDate) AS [Month],
        CASE
                WHEN DATEPART(DAY, [session].SessionDate) <= 7 AND DATEPART(DAY, [session].SessionDate) > 1 THEN 1
                WHEN DATEPART(DAY, [session].SessionDate) <= 14 AND DATEPART(DAY, [session].SessionDate) > 7 THEN 2
                WHEN DATEPART(DAY, [session].SessionDate) <= 21 AND DATEPART(DAY, [session].SessionDate) > 14 THEN 3
                ELSE 4
        END AS [WeekOfMonth],
        [session].ServiceId AS ServiceId,
        [session].[SessionID] AS SessionId
    FROM 
        dbo.CompleteSessions AS [session]
    INNER JOIN
        dbo.Reserva AS booking
        ON booking.SesionId = [session].[SessionID]
    WHERE 
        booking.Asistencia = 1



GO
-- Query to test
SELECT *  
FROM dbo.SessionAttendances 