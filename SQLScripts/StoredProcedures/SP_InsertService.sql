-- =============================================
-- Author:		Eduardo Madrigal Marin
-- Description:	Adds a new service
-- =============================================

ALTER PROCEDURE dbo.SP_InsertService
    @pServiceName        NVARCHAR(30),
    @pMaxSpaces          INT,
    @pCost               MONEY
AS
    BEGIN
        DECLARE @ServiceId    INT;
        DECLARE @InstructorId INT;

        DECLARE @SPErrorCode                 INT;
        DECLARE @ServiceAlreadyExist         INT;
        
        SET @SPErrorCode                 = -50001;
        SET @ServiceAlreadyExist         = -50014; 
           
        BEGIN TRY
            -- Sets session id based on the session info provided.
            SET @ServiceId = 
                (
                    SELECT 
                        Id
                    FROM 
                        dbo.Especialidades
                    WHERE
                        @pServiceName = Nombre
                )
            IF @ServiceId IS NOT NULL
                RETURN @ServiceAlreadyExist;

            INSERT INTO Especialidades (Nombre,Aforo,Costo)
            VALUES(@pServiceName,@pMaxSpaces,@pCost);
                 
        END TRY

        BEGIN CATCH
            RETURN @@Error;
        END CATCH

    END
GO

-- SP_InsertService 'Boxing', 30, 1000
-- SELECT * FROM Especialidades