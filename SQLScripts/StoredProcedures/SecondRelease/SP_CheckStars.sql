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
                WHEN @Day <= 7 AND @Day > 1 THEN 1
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
                    AND stars.ClienteId = @pMembershipNumber
            ) 
        INSERT INTO 
            dbo.EstrellasMensuales (ClienteId, Año, Mes)
        VALUES
            (@pMembershipNumber, @Year, @Month)
        
        DECLARE @StarsId INT =  (
                                    SELECT 
                                        stars.Id
                                    FROM
                                        dbo.EstrellasMensuales AS stars
                                    WHERE 
                                            stars.Mes = @Month
                                        AND stars.Año = @Year
                                        AND stars.ClienteId = @pMembershipNumber                                    
                                )
        
        DECLARE @LastUpdatedWeek INT =  (
                                            SELECT 
                                                stars.SemanaUltimaActualizacion
                                            FROM
                                                dbo.EstrellasMensuales AS stars
                                            WHERE 
                                                stars.Id = @StarsId
                                        )    

        DECLARE @NewStarQuantity INT = 0
        DECLARE @NewLastUpdatedWeek INT = @LastUpdatedWeek

        IF @WeekOfMonth - @LastUpdatedWeek <= 1
        BEGIN
            SET @NewLastUpdatedWeek = @WeekOfMonth
            
            DECLARE @PreviousStarQuantity INT = (
                                                    SELECT 
                                                        stars.Cantidad
                                                    FROM
                                                        dbo.EstrellasMensuales AS stars
                                                    WHERE 
                                                        stars.Id = @StarsId
                                                )  

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
                AND attendance.ClientId =@pMembershipNumber

            IF @WeeklyAttendances = 3 SET @NewStarQuantity = 1
            ELSE IF @WeeklyAttendances = 4 SET @NewStarQuantity = 2
            ELSE IF @WeeklyAttendances >= 5 SET @NewStarQuantity = 3

            IF @PreviousStarQuantity < @NewStarQuantity SET @NewStarQuantity = @PreviousStarQuantity
        END
        
        UPDATE 
            dbo.EstrellasMensuales
        SET
            Cantidad = @NewStarQuantity,
            SemanaUltimaActualizacion = @NewLastUpdatedWeek
        WHERE
            Id = @StarsId

        RETURN 1
    END
    RETURN 0
END
GO
-- example to execute the stored procedure we just created
EXECUTE dbo.SP_CheckStars '2021-05-29', 1, 1
GO
select * from dbo.EstrellasMensuales 
