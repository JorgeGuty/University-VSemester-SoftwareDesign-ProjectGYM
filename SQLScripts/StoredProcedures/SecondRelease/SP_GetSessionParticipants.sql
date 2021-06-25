-- Create a new stored procedure called 'SP_GetSessionParticipants' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_GetSessionParticipants'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_GetSessionParticipants
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_GetSessionParticipants
    @pDate                  NVARCHAR(50),
    @pStartTime             NVARCHAR(50),
    @pRoomId                INT
AS
BEGIN
    SELECT 
        client.Id       AS MembershipNumber,
        client.Nombre, 
        client.Correo,
        client.Celular,
        client.Cedula,
        client.Saldo,

        booking.Asistencia AS Attendance,
        booking.Id AS BookingId

    FROM 
        dbo.CompleteSessions AS [session]
    INNER JOIN 
        dbo.Reserva AS booking
        ON booking.SesionId = [session].[SessionID]
    INNER JOIN
        dbo.Cliente AS client
        ON client.Id = booking.ClienteId
    WHERE 
            [session].SessionDate   = CONVERT(DATE, @pDate)
        AND [session].RoomId        = @pRoomId
        AND [session].StartTime     = CONVERT(TIME, @pStartTime)
END
GO
-- example to execute the stored procedure we just created
EXECUTE dbo.SP_GetSessionParticipants '2021-05-31', '8:00:00', 1
GO

select * from CompleteSessions