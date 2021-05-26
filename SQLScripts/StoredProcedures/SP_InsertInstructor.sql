-- =============================================
-- Author:		Eduardo Madrigal Marin
-- Description:	Adds a new instructor
-- =============================================

ALTER PROCEDURE dbo.SP_InsertInstructor
    @pName                NVARCHAR(50),
    @pIdentification      VARCHAR(50),
    @pEmail               VARCHAR(30),
    @pType                VARCHAR(30)
AS
    BEGIN
        DECLARE @InstructorId                   INT;
        DECLARE @InstructorTypeId               INT;

        DECLARE @SPErrorCode                    INT;
        DECLARE @InstructorAlreadyExist         INT;
        DECLARE @InstructorTypeNotDefined         INT;
        
        SET @SPErrorCode                 = -50001;
        SET @InstructorAlreadyExist      = -50015; 
        SET @InstructorTypeNotDefined    = -50016;
           
        BEGIN TRY
            -- Sets session id based on the session info provided.
            SET @InstructorId = 
                (
                    SELECT 
                        Id
                    FROM 
                        dbo.Instructor
                    WHERE
                        @pIdentification = Cedula
                )
            IF @InstructorId IS NOT NULL
                RETURN @InstructorAlreadyExist;

            SET @InstructorTypeId = 
                (
                    SELECT 
                        Id
                    FROM 
                        dbo.TipoInstructor
                    WHERE
                        @pType = Nombre
                )
            IF @InstructorTypeId IS NOT NULL
                RETURN @InstructorTypeNotDefined;

            INSERT INTO Instructor (Nombre,Cedula,Correo,Tipo)
            VALUES(@pName,@pIdentification,@pEmail,@InstructorTypeId);

            RETURN 1;
                 
        END TRY

        BEGIN CATCH
            RETURN -@@Error;
        END CATCH

    END
GO

-- SP_InsertService 'KickBoxing', 30, '1000'
-- SELECT * FROM Especialidades