-- Create a new stored procedure called 'SP_InsertPreliminarySession' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_InsertPreliminarySession'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_InsertPreliminarySession
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_InsertPreliminarySession
    @pName          NVARCHAR(50),
    @pWeekDay       INT,
    @pMonth         INT,
    @pYear          INT,
    @pStartTimeStr  NVARCHAR(10),
    @pDuration      INT,
    @pServiceId     INT,
    @pInstructorId  INT,
    @pRoomId        INT

-- add more stored procedure parameters here
AS
BEGIN
    BEGIN TRY

        DECLARE @Spaces         INT
        DECLARE @StartTime      TIME
        DECLARE @RoomCapacity   INT
        DECLARE @FinishTime     TIME

        -- Sets service spaces based on the provided service's max spaces.
        SET @Spaces = 
            (
                SELECT 
                    [service].[Aforo] 
                FROM 
                    dbo.Especialidades AS [service]
                WHERE 
                    [service].Id = @pServiceId                 
            )

        -- Sets room capacity based on the provided room id.
        SET @RoomCapacity = 
            (
                SELECT 
                    [room].[AforoMaximo] 
                FROM 
                    dbo.Sala AS [room]
                WHERE 
                    [room].Id = @pRoomId                 
            )

        -- If the room capacity is lower than the service max spaces, then the available spaces will be the room capacity
        IF @RoomCapacity < @Spaces SET @Spaces = @RoomCapacity

        SET @StartTime = CONVERT(TIME, @pStartTimeStr)
        SET @FinishTime = DATEADD(MINUTE, @pDuration, @StartTime)
        
        -- Checks if client already booked that session.
        IF EXISTS 
            ( 
                SELECT  
                    *
                FROM
                    dbo.SesionPreliminar AS preliminary
                WHERE
                        preliminary.Año = @pYear
                    AND preliminary.Mes = @pMonth
                    AND preliminary.DiaSemana = @pWeekDay
                    AND preliminary.SalaId = @pRoomId
                    AND preliminary.Activa = 1
                    AND @FinishTime >= preliminary.HoraInicio --> If the begin hour of a session is lower than the finish time calculated.
                    AND @StartTime <= preliminary.HoraInicio
            )
            RAISERROR ('Time not available for the selected week day.', 11, 1);            
        ELSE
            BEGIN 
                SET TRANSACTION ISOLATION LEVEL REPEATABLE READ
                BEGIN TRANSACTION
                    INSERT INTO SesionPreliminar 
                        (
                            Nombre, 
                            DiaSemana, 
                            Mes, 
                            Año, 
                            HoraInicio, 
                            DuracionMinutos, 
                            Cupo, 
                            Activa, 
                            EspecialidadId, 
                            InstructorId, 
                            SalaId
                        )
                    VALUES
                        (
                            @pName, 
                            @pWeekDay, 
                            @pMonth, 
                            @pYear, 
                            @StartTime, 
                            @pDuration, 
                            @Spaces, 
                            1, 
                            @pServiceId, 
                            @pInstructorId, 
                            @pRoomId
                        )
                COMMIT
            END
        RETURN 1;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK
        SELECT ERROR_MESSAGE() AS ErrorMessage; 
        RETURN -1
    END CATCH
END
GO
-- example to execute the stored procedure we just created
EXECUTE dbo.SP_InsertPreliminarySession 'Yoga con Pedro', 1, 6, 2021, '8:00', 120, 1, 1, 1
GO

SELECT * FROM SesionPreliminar

/*

    @pName          NVARCHAR(50),
    @pWeekDay       INT,
    @pMonth         INT,
    @pYear          INT,
    @pStartTime     TIME,
    @pDuration      INT,
    @pServiceId     INT,
    @pInstructorId  INT,
    @pRoomId        INT
*/