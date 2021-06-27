-- Create a new stored procedure called 'SP_MarkSessionAttendanceTaken' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_MarkSessionAttendanceTaken'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_MarkSessionAttendanceTaken
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_MarkSessionAttendanceTaken
    @pDate                  NVARCHAR(50),
    @pStartTime             NVARCHAR(50),
    @pRoomId                INT
AS
BEGIN
    DECLARE @SessionID  INT    

    -- Sets session id based on the session info provided.
    SET @SessionID = 
        (
            SELECT 
                [session].SessionID
            FROM 
                dbo.CompleteSessions AS [session]
            WHERE 
                    [session].SessionDate   = CONVERT(DATE, @pDate)
                AND [session].RoomId        = @pRoomId
                AND [session].StartTime     = CONVERT(TIME, @pStartTime)
        )
    UPDATE [dbo].[Sesion]
    SET
        AsistenciaTomada = 1
        -- Add more columns and values here
    WHERE 
        Id   = @SessionID

    RETURN 1
END
GO
-- example to execute the stored procedure we just created
EXECUTE dbo.SP_MarkSessionAttendanceTaken '2021-05-31', '8:00:00', 1
GO