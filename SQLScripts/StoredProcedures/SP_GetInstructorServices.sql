-- =============================================
-- Author:		Eduardo Madrigal Marin
-- Description:	Get instructor services
-- =============================================

ALTER PROCEDURE dbo.SP_GetInstructorServices
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

            SELECT E.Id, E.Nombre,E.Aforo,E.Costo
            FROM
                Especialidades E
                INNER JOIN 
                EspecialidadesDeInstructores  EI
                ON E.Id = EI.EspecialidadId
            WHERE
                EI.InstructorId = @pInstructorNumber;

            RETURN 1
        END TRY
        BEGIN CATCH
            RETURN -@@Error;
        END CATCH
    END