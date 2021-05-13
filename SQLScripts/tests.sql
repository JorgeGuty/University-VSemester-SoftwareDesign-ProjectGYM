SELECT * FROM SesionPreliminar
SELECT * FROM Sesion

EXEC SP_ConfirmPreliminarySchedule  5, 2021;
GO

SELECT * FROM SesionPreliminar
SELECT * FROM Sesion ORDER BY SessionPreliminarId
