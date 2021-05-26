-- =============================================
-- Author:		Eduardo Madrigal Marin
-- Description:	Adds a new service
-- =============================================

ALTER PROCEDURE dbo.SP_InsertService
    @pServiceName        NVARCHAR(30),
    @pMaxSpaces          INT,
    @pCost               VARCHAR(30)
AS
    BEGIN
        DECLARE @ServiceId    INT;
        DECLARE @InstructorId INT;
        DECLARE @Cost         MONEY;

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

            SET @Cost = TRY_CONVERT(MONEY,@pCost);
            IF @Cost IS NULL
                RETURN @SPErrorCode;

            INSERT INTO Especialidades (Nombre,Aforo,Costo)
            VALUES(@pServiceName,@pMaxSpaces,@pCost);

            RETURN 1;
                 
        END TRY

        BEGIN CATCH
            RETURN -@@Error;
        END CATCH

    END
GO

-- SP_InsertService 'KickBoxing', 30, '1000'
-- SELECT * FROM Especialidades