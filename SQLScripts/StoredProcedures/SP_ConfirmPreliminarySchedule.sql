-- Create a new stored procedure called 'SP_ConfirmPreliminarySchedule' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_ConfirmPreliminarySchedule'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_ConfirmPreliminarySchedule
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_ConfirmPreliminarySchedule
    @pMonthToConfirm        INT,
    @pYearOfMonthToConfirm  INT
AS
BEGIN
    BEGIN TRY

        -- DECLARATIONS

        -- VARIABLES

        DECLARE @MonthsDate DATE

        -- TABLE VARIABLES
        DECLARE @MonthsPreliminarySessions TABLE
            (
                ID              INT, 
                [WeekDay]       INT, 
                InstructorId    INT
            )
        DECLARE @ConfirmedSessions TABLE
            (
                 
                [Date]                  DATE, 
                Cancelled               BIT,
                InstructorId            INT,
                PreliminarySessionId    INT
            )


        -- ERRORS
        DECLARE @NoSessionsInMonthErrorCode INT
        DECLARE @SPErrorCode                INT     


        -- ERROR CODE SETS
        SET @SPErrorCode = 
            (
                SELECT
                    [error].Code
                FROM
                    dbo.Errors AS [error]
                WHERE
                    [error].[ErrorName] = 'SPError'
            )  

        SET @NoSessionsInMonthErrorCode = 
            (
                SELECT
                    [error].Code
                FROM
                    dbo.Errors AS [error]
                WHERE
                    [error].[ErrorName] = 'NoSessionsFoundError'
            )

        -- SELECTION OF THE PRELIMINARY SESSIONS THAT MATCH THE MONTH AND YEAR GIVEN

        INSERT INTO
            @MonthsPreliminarySessions  ([ID], [WeekDay], InstructorId)
        SELECT
            preliminarySession.Id,
            preliminarySession.DiaSemana,
            preliminarySession.InstructorId
        FROM 
            dbo.SesionPreliminar AS preliminarySession
        WHERE 
                preliminarySession.Mes = @pMonthToConfirm
            AND preliminarySession.Año = @pYearOfMonthToConfirm
            AND preliminarySession.Activa = 1
            AND preliminarySession.Confirmada = 0

        IF NOT EXISTS (SELECT * FROM @MonthsPreliminarySessions) RETURN @NoSessionsInMonthErrorCode
        
        -- SETS THE MONTH'S INITIAL DATE BASED ON THE MONTH AND YEAR PROVIDED

        SET @MonthsDate = DATEFROMPARTS(@pYearOfMonthToConfirm, @pMonthToConfirm, 1)

        -- CREATES THE CONFIRMED SESSIONS FROM THE PRELIMINARY SESSIONS (IMPORTANT PART OF THE ALGORITHM)

        WHILE DATEPART(MONTH, @MonthsDate) = @pMonthToConfirm
        BEGIN
            INSERT INTO
                @ConfirmedSessions ([Date], Cancelled, InstructorId, PreliminarySessionId)
            SELECT                
                @MonthsDate                     AS SessionDate,
                0                               AS Cancelled,
                preliminarySession.InstructorId AS InstructorId,
                preliminarySession.ID           AS PreliminarySessionId                
            FROM 
                @MonthsPreliminarySessions AS preliminarySession
            WHERE
                preliminarySession.WeekDay = DATEPART(WEEKDAY, @MonthsDate)
            
            SET @MonthsDate = DATEADD(DAY, 1, @MonthsDate)
        END

        SET TRANSACTION ISOLATION LEVEL REPEATABLE READ
        BEGIN TRANSACTION

            UPDATE
                dbo.SesionPreliminar
            SET 
                Confirmada = 1
            WHERE
                Id IN   (
                            SELECT 
                                [sessions].ID
                            FROM
                                @MonthsPreliminarySessions AS [sessions]
                        )

            INSERT INTO
                dbo.Sesion (Fecha, Cancelada, InstructorId, SessionPreliminarId)
            SELECT
                [session].[Date],
                [session].[Cancelled],
                [session].[InstructorId],
                [session].[PreliminarySessionId]             
            FROM
                @ConfirmedSessions AS [session]

        COMMIT

        RETURN 1;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK
        RETURN @SPErrorCode
    END CATCH
END
GO

DECLARE @returnvalue int
EXEC @returnvalue = SP_ConfirmPreliminarySchedule  5, 2021;
SELECT @returnvalue AS errorCode
GO

