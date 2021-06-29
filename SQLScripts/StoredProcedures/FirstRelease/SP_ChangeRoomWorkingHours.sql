-- =============================================
-- Author:		Eduardo Madrigal Marin
-- Description:	Inserts new working hours for a room at an specific day.
-- =============================================

ALTER PROCEDURE dbo.SP_ChangeRoomWorkingHours
    @pRoomNumber INT,
    @pWeekDay TINYINT,
    @pOpeningTime TIME,
    @pClosingTime TIME
AS
    BEGIN   
        DECLARE @RoomId            INT;
        DECLARE @SPErrorCode       INT = -50001;
        DECLARE @RoomNotFoundError INT = -50020;

        SELECT @RoomId = Id
            FROM dbo.Sala
            WHERE Id = @pRoomNumber;

        IF @RoomId IS NULL
            RETURN @RoomNotFoundError;

        BEGIN TRY

            BEGIN TRAN

                INSERT INTO dbo.DiaDeAtencion (SalaId, HoraApertura, HoraCierre, DiaSemana)
                VALUES (@RoomId, @pOpeningTime, @pClosingTime, @pWeekDay);

                UPDATE dbo.DiaDeAtencion
                SET Active = 0
                WHERE 
                    @RoomId = SalaId
                    AND
                    @pWeekDay = DiaSemana
                    AND Id != SCOPE_IDENTITY();

            COMMIT TRAN

            RETURN 1;

        END TRY
        BEGIN CATCH
            IF @@TRANCOUNT > 0
                ROLLBACK
            RETURN @SPErrorCode
        END CATCH
    END

-- SELECT * FROM DiaDeAtencion
-- dbo.SP_ChangeRoomWorkingHours 1, 1,'5:30', '9:30'