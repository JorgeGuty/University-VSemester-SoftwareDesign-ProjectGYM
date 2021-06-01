-- =============================================
-- Author:		Eduardo Madrigal Marin
-- Description:	Get instructor info
-- =============================================

ALTER PROCEDURE dbo.SP_GetInstructorInfo
    @pInstructorNumber  INT
AS
    BEGIN
        DECLARE @SPErrorCode                   INT
        DECLARE @InstructorNotFoundErrorCode   INT
        DECLARE @InstructorID                  INT
        
        BEGIN TRY
            SET @SPErrorCode                 = -50001;
            SET @InstructorNotFoundErrorCode = -50008;
            
            SELECT @InstructorID = Id 
            FROM Instructor
            WHERE 
                Id = @pInstructorNumber
                AND
                Activo = 1;
            
            IF @InstructorID IS NULL
                RETURN @InstructorNotFoundErrorCode;

            SELECT  InstructorID, 
                    InstructorName,
                    InstructorEmail,
                    InstructorIdentification,
                    [Type]
            FROM CompleteInstructors
            WHERE
                InstructorID = @pInstructorNumber;

            RETURN 1
        END TRY
        BEGIN CATCH
            RETURN -@@Error;
        END CATCH
    END