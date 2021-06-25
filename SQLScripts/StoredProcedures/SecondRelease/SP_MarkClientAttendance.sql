-- Create a new stored procedure called 'SP_MarkClientAttendance' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_MarkClientAttendance'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_MarkClientAttendance
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_MarkClientAttendance
    @pDate                  NVARCHAR(50),
    @pStartTime             NVARCHAR(50),
    @pRoomId                INT,

    @pMembershipNumber      INT
AS
BEGIN
    DECLARE @SessionID  INT    
    DECLARE @ServiceID  INT


    SELECT 
        @SessionID = [session].SessionID,
        @ServiceID = [session].ServiceId
    FROM 
        dbo.CompleteSessions AS [session]
    WHERE 
            [session].SessionDate   = CONVERT(DATE, @pDate)
        AND [session].RoomId        = @pRoomId
        AND [session].StartTime     = CONVERT(TIME, @pStartTime)

    UPDATE 
        dbo.Reserva
    SET
        Asistencia = 1
    WHERE   
            SesionId = @SessionID
        AND ClienteId = @pMembershipNumber

    
    EXEC dbo.SP_CheckStars @pDate, @pMembershipNumber, @ServiceID

END
GO
-- example to execute the stored procedure we just created
EXECUTE dbo.SP_MarkClientAttendance '2021-05-29', '10:00:00', 1, 1
GO  

EXECUTE dbo.SP_GetSessionParticipants '2021-05-29', '10:00:00', 1
GO

select * from dbo.EstrellasMensuales 
