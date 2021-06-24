-- =============================================
-- Author:		Eduardo Madrigal Marin
-- Description:	Sets max space of a room
-- =============================================

CREATE PROCEDURE dbo.SP_SetRoomMaxSpace
    @pRoomNumber INT,
    @pRoomMaxSpace INT
AS
BEGIN
    DECLARE @RoomNotFound    INT = -50020
    DECLARE @SPErrorCode        INT = -50001

    BEGIN TRY
        UPDATE Sala
        SET AforoMaximo = @pRoomMaxSpace
        WHERE @pRoomNumber = Id

        IF @@ROWCOUNT = 0
            RETURN @RoomNotFound
        ELSE
            RETURN 1;
    END TRY
    BEGIN CATCH
        RETURN @SPErrorCode;
    END CATCH

END
GO
-- example to execute the stored procedure we just created
EXECUTE dbo.SP_SetRoomMaxSpace 1,100

GO

-- SELECT * FROM Sala