-- =============================================
-- Author:		Eduardo Madrigal Marin
-- Description:	Retrieves the sesions of the current month
-- =============================================

ALTER PROCEDURE dbo.SP_GetCurrentCalendar
AS
    BEGIN
        DECLARE @StartDate Date;
        SET @StartDate = GETDATE();

        SELECT 
            cs.SessionID,
            cs.Name                                     AS SessionName,
            cs.SessionDate,
            cs.StartTime,
            cs.Duration,
            cs.AvailableSpaces,
            cs.Cost                                     AS SessionCost,
            cs.IsCancelled,
            cs.InstructorName,
            cs.InstructorIdentification,
            cs.InstructorEmail,
            cs.InstructorType,
            cs.ServiceName,
            cs.Cost                                     AS ServiceTypeCost,
            cs.ServiceMaxSpaces                         AS ServiceMaxSpaces
        FROM 
            dbo.CompleteSessions cs
        WHERE 
            cs.SessionDate >= @StartDate
    END

exec SP_GetCurrentCalendar