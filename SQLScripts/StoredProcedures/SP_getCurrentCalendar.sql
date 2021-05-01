-- =============================================
-- Author:		Eduardo Madrigal Marin
-- Description:	Retrieves the sesions of the current month
-- =============================================

CREATE OR ALTER PROCEDURE dbo.SP_getCurrentCalendar
AS
    BEGIN
        DECLARE @StartDate Date;
        DECLARE @EndDate Date;

        SET @EndDate = EOMONTH(GETDATE());
        SET @StartDate = DATEADD(DAY,1,EOMONTH(@EndDate,-1));

        SELECT Id, Nombre, Fecha, HoraInicio, DuracionMinutos, Costo, Cancelada
        FROM 
            dbo.Sesion 
            WHERE 
                Fecha >= @StartDate 
                AND
                Fecha <= @EndDate;
    END