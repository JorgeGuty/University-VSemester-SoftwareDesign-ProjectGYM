-- =============================================
-- Author:		Eduardo Madrigal Marin
-- Description:	Changes max space for services
-- =============================================

ALTER PROCEDURE dbo.SP_SetServiceMaxSpace
    @pServiceNumber INT,
    @pServiceMaxSpaces INT
AS
BEGIN
    DECLARE @ServiceNotFound    INT = -50001
    DECLARE @SPErrorCode        INT = -50019

    BEGIN TRY

        UPDATE Especialidades
        SET Aforo = @pServiceMaxSpaces
        WHERE 
            @pServiceNumber = Id
            AND 
            Activa = 1

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
EXECUTE dbo.SP_SetServiceMaxSpace 1, 60
GO

-- SELECT * FROM Especialidades