-- =============================================
-- Author:		Eduardo Madrigal Marin
-- Description:	Swaps Instructors in a Session
-- =============================================

ALTER PROCEDURE dbo.SP_ChangeSessionInstructor
    @pNewInstructorNumber  INT,
    @pSessionDate          NVARCHAR(50),
    @pSessionTime          NVARCHAR(50),
    @pSessionRoom          INT
AS
    BEGIN
        DECLARE @SessionId    INT;
        DECLARE @InstructorId INT;

        DECLARE @SPErrorCode                 INT;
        DECLARE @NoSessionsFoundErrorCode    INT;
        DECLARE @InstructorNotFoundErrorCode INT;
        
        SET @SPErrorCode                 = -50001;
        SET @InstructorNotFoundErrorCode = -50008;
        SET @NoSessionsFoundErrorCode    = -50007;   
           
        BEGIN TRY
            -- Sets session id based on the session info provided.
            SET @SessionId = 
                (
                    SELECT 
                        [session].SessionID
                    FROM 
                        dbo.CompleteSessions AS [session]
                    WHERE 
                            [session].SessionDate   = CONVERT(DATE, @pSessionDate)
                        AND [session].RoomId        = @pSessionRoom
                        AND [session].StartTime     = CONVERT(TIME, @pSessionTime)
                )

            SET @InstructorId =
                (
                    SELECT 
                        Id
                    FROM 
                        dbo.Instructor
                    WHERE
                        Id = @pNewInstructorNumber
                )

            IF @InstructorId IS NULL
                RETURN @InstructorNotFoundErrorCode

            UPDATE dbo.Sesion
            SET InstructorId = @pNewInstructorNumber
            WHERE 
                Id = @SessionId;
            
            IF @@ROWCOUNT = 0
                RETURN @NoSessionsFoundErrorCode
            ELSE
                RETURN 1;        
        END TRY

        BEGIN CATCH
            RETURN @@Error;
        END CATCH

    END
GO

--SP_ChangeSessionInstructor 1, '2021-05-31', '8:00', 1
--SELECT * FROM CompleteSessions