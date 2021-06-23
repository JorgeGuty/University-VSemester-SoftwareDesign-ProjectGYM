-- =============================================
-- Author:		Eduardo Madrigal Marin
-- Description:	Deletes a Service
-- =============================================

ALTER PROCEDURE dbo.SP_DeleteService
    @pServiceNumber INT
AS
BEGIN
    DECLARE @ServiceNotFound    INT = -50019
    DECLARE @SPErrorCode        INT = -50001

    BEGIN TRY
        UPDATE Especialidades
        SET Activa = 0
        WHERE @pServiceNumber = Id

        IF @@ROWCOUNT = 0
            RETURN @ServiceNotFound
        ELSE
            RETURN 1;
    END TRY
    BEGIN CATCH
        RETURN @SPErrorCode;
    END CATCH

END
GO
-- example to execute the stored procedure we just created
-- EXECUTE dbo.SP_DeleteService 1
-- GO

-- SELECT * FROM Especialidades

        -- UPDATE Especialidades
        -- SET Activa = 1
        -- WHERE 1 = Id