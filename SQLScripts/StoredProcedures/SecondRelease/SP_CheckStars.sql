-- Create a new stored procedure called 'SP_CheckStars' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_CheckStars'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_CheckStars
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_CheckStars
    @pDate              NVARCHAR(50),
    @pMembershipNumber  INT,
    @pServiceId         INT
AS
BEGIN
    IF @pServiceId IN (
        SELECT 
            clientFavs.EspecialidadId
        FROM
            dbo.ServiciosFavoritos AS clientFavs
        WHERE 
            clientFavs.ClienteId = @pMembershipNumber
    )     
    BEGIN
        DECLARE @Year   INT = DATEPART(YEAR, @pDate)
        DECLARE @Month  INT = DATEPART(MONTH, @pDate)
        DECLARE @Day    INT = DATEPART(DAY, @pDate)
        
        DECLARE @WeekOfMonth INT =  (
            CASE
                WHEN @Day <= 7 AND @Day >= 1 THEN 1
                WHEN @Day <= 14 AND @Day > 7 THEN 2
                WHEN @Day <= 21 AND @Day > 14 THEN 3
                ELSE 4
            END
        )
        
        IF NOT EXISTS 
            (
                SELECT *
                FROM 
                    dbo.EstrellasMensuales  AS stars
                WHERE
                        stars.Mes = @Month
                    AND stars.Año = @Year
                    AND stars.SemanaDelMes = @WeekOfMonth                    
                    AND stars.ClienteId = @pMembershipNumber
            ) 
        INSERT INTO 
            dbo.EstrellasMensuales (ClienteId, Año, Mes, SemanaDelMes)
        VALUES
            (@pMembershipNumber, @Year, @Month, @WeekOfMonth)
        
        DECLARE @StarsId INT =  (
                                    SELECT 
                                        stars.Id
                                    FROM
                                        dbo.EstrellasMensuales AS stars
                                    WHERE 
                                            stars.Mes = @Month
                                        AND stars.Año = @Year
                                        AND stars.SemanaDelMes = @WeekOfMonth                                        
                                        AND stars.ClienteId = @pMembershipNumber                                    
                                )

        DECLARE @NewStarQuantity INT = 0
                  
        DECLARE @WeeklyAttendances INT
        SELECT 
            @WeeklyAttendances = COUNT(*)
        FROM 
            dbo.SessionAttendances AS attendance
        INNER JOIN 
            dbo.ServiciosFavoritos AS favService
            ON favService.EspecialidadId = [attendance].[ServiceId]
        WHERE 
                favService.ClienteId = @pMembershipNumber
            AND attendance.WeekOfMonth = @WeekOfMonth
            AND attendance.[Month] = @Month
            AND attendance.[Year] = @Year
            AND attendance.ClientId = @pMembershipNumber

        IF @WeeklyAttendances = 3 SET @NewStarQuantity = 1
        ELSE IF @WeeklyAttendances = 4 SET @NewStarQuantity = 2
        ELSE IF @WeeklyAttendances >= 5 SET @NewStarQuantity = 3

        UPDATE 
            dbo.EstrellasMensuales
        SET
            Cantidad = @NewStarQuantity
        WHERE
            Id = @StarsId

        RETURN 1
    END
    RETURN 0
END
GO
-- example to execute the stored procedure we just created
EXECUTE dbo.SP_CheckStars '2021-12-13', 1, 1
GO
update Reserva set Asistencia = 0
select * from dbo.EstrellasMensuales 
select * FROM SessionAttendances
SELECT * from CompleteSessions