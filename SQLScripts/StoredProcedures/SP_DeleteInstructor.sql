-- =============================================
-- Author:		Eduardo Madrigal Marin
-- Description:	Delete instructor
-- =============================================

CREATE OR ALTER PROCEDURE dbo.SP_DeleteInstructor
    @pInstructorNumber  INT
AS
    BEGIN
        DECLARE @SPErrorCode                   INT
        DECLARE @InstructorNotFoundErrorCode   INT
        
        BEGIN TRY
            SET @SPErrorCode                 = -50001;
            SET @InstructorNotFoundErrorCode = -50008;

            UPDATE dbo.Instructor
            SET Activo = 0
            WHERE Id = @pInstructorNumber;

            IF @@ROWCOUNT = 0
                RETURN @InstructorNotFoundErrorCode
            ELSE
                RETURN 1;
        END TRY

        BEGIN CATCH
            RETURN -@@Error;
        END CATCH
    END