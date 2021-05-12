-- Create a new stored procedure called 'SP_DeletePreliminarySession' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_DeletePreliminarySession'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_DeletePreliminarySession
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_DeletePreliminarySession
    @pYear      INT,
    @pMonth     INT,
    @pWeekDay   INT,
    @pRoomId    INT,
    @pHour      NVARCHAR(10)
AS
BEGIN
    -- body of the stored procedure
        BEGIN TRY

        DECLARE @PreliminaryNotFoundErrorCode   INT
        DECLARE @SPErrorCode                    INT
        DECLARE @AffectedRowsCount              INT     

        -- SETS ERROR CODES SET TO BE RETURNED IN CASE OF ERROR
        SET @PreliminaryNotFoundErrorCode = 
            (
                SELECT
                    [error].Code
                FROM
                    dbo.Errors AS [error]
                WHERE
                    [error].[ErrorName] = 'PreliminaryNotFoundError'
            )   
        SET @SPErrorCode = 
            (
                SELECT
                    [error].Code
                FROM
                    dbo.Errors AS [error]
                WHERE
                    [error].[ErrorName] = 'SPError'
            )

        SET TRANSACTION ISOLATION LEVEL REPEATABLE READ
        BEGIN TRANSACTION
            -- Updates booking active attribute to 0, it means its no longer an active booking.
            UPDATE 
                dbo.SesionPreliminar
            SET
                Activa = 0
            WHERE 
                    Año         = @pYear
                AND Mes         = @pMonth
                AND DiaSemana   = @pWeekDay
                AND Activa      = 1
                AND SalaId      = @pRoomId
                AND HoraInicio  = CONVERT(TIME,@pHour)  
            SET @AffectedRowsCount = @@ROWCOUNT         
        COMMIT

        IF @AffectedRowsCount = 0 RETURN @PreliminaryNotFoundErrorCode
        ELSE RETURN 1
        ;

    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK
        RETURN @SPErrorCode 
    END CATCH
END
GO
-- example to execute the stored procedure we just created

DECLARE @returnvalue int
EXEC @returnvalue = dbo.SP_DeletePreliminarySession 2021,5,4,1,"16:00:00"
SELECT @returnvalue AS returnValue

SELECT * FROM DBO.SesionPreliminar 

/*
    @pYear      INT,
    @pMonth     INT,
    @pWeekDay   INT,
    @pRoomId    INT,
    @pHour      NVARCHAR(10)

*/