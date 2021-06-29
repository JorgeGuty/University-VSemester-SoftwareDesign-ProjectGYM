-- =============================================
-- Author:		Eduardo Madrigal Marin
-- Description:	Adds a service to a instructor
-- =============================================

ALTER PROCEDURE dbo.SP_AddServiceToInstructor
    @pInstructorNumber   INT,
    @pServiceNumber      INT
AS
    BEGIN
        DECLARE @InstructorId                   INT;
        DECLARE @ServiceId                      INT;
        DECLARE @InstructorServiceId            INT;

        DECLARE @SPErrorCode                    INT;
        DECLARE @InstructorNotFoundErrorCode    INT;
        DECLARE @ServiceNotFound                INT;
        DECLARE @ServiceAlreadyOffered          INT;  
        
        SET @SPErrorCode                 = -50001;
        SET @InstructorNotFoundErrorCode = -50008;
        SET @ServiceNotFound             = -50019;
        SET @ServiceAlreadyOffered       = -50021;
           
        BEGIN TRY
            -- Sets session id based on the session info provided.
            SET @InstructorId = 
                (
                    SELECT 
                        Id
                    FROM 
                        dbo.Instructor
                    WHERE
                        @pInstructorNumber = Id
                        AND
                        Activo = 1
                )
            IF @InstructorId IS NULL
                RETURN @InstructorNotFoundErrorCode;

            SET @ServiceId = 
                (
                    SELECT 
                        Id
                    FROM 
                        dbo.Especialidades
                    WHERE
                        @pServiceNumber = Id
                        AND 
                        Activa = 1
                )
            IF @ServiceId IS NULL
                RETURN @ServiceNotFound;
            
            SET @InstructorServiceId = 
                (
                    SELECT 
                        Id
                    FROM 
                        dbo.EspecialidadesDeInstructores
                    WHERE
                        @pServiceNumber = EspecialidadId
                        AND 
                        @pInstructorNumber = InstructorId
                )
            IF @InstructorServiceId IS NOT NULL
                RETURN @ServiceAlreadyOffered;

            INSERT INTO EspecialidadesDeInstructores (InstructorId,EspecialidadId)
            VALUES(@pInstructorNumber, @pServiceNumber);

            RETURN 1;
                 
        END TRY

        BEGIN CATCH
            RETURN @SPErrorCode;
        END CATCH

    END
GO
-- SELECT * FROM CompleteInstructors
-- SELECT * FROM EspecialidadesDeInstructores
-- DECLARE @Res INT;
-- EXEC @RES = SP_AddServiceToInstructor 1, 2
-- PRINT @RES