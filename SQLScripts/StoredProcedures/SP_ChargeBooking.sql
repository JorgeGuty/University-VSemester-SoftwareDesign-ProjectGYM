-- Create a new stored procedure called 'SP_ChargeBooking' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_ChargeBooking'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_ChargeBooking
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_ChargeBooking
    @pBookingId INT
-- add more stored procedure parameters here
AS
BEGIN
    BEGIN TRY
        DECLARE @Subject            NVARCHAR(50)    =   'Cobro de reservación para sesión'
        DECLARE @MembershipNumber   INT             =   (
                                                        SELECT
                                                            booking.ClienteId
                                                        FROM
                                                            dbo.Reserva AS booking
                                                        WHERE
                                                            booking.Id = @pBookingId
                                                        )
        DECLARE @MovementTypeID     INT             =   (
                                                        SELECT
                                                            movementType.Id
                                                        FROM
                                                            dbo.TipoMovimiento AS movementType
                                                        WHERE
                                                            movementType.Nombre = 'CobroPorReserva'
                                                        )                                                        
        DECLARE @Amount             DECIMAL(19,4)   =   (
                                                        SELECT
                                                            [session].Costo
                                                        FROM
                                                            dbo.Reserva AS booking
                                                        INNER JOIN
                                                            dbo.Sesion AS [session]
                                                            ON [session].Id = booking.SesionId
                                                        WHERE
                                                            booking.Id = @pBookingId
                                                        )                                                   
        DECLARE @MovementID INT
        EXEC @MovementID = dbo.SP_InsertMovement @MembershipNumber, @Amount, @MovementTypeID, @Subject

        INSERT INTO 
            dbo.CobroPorReserva 
            (   
                Id, 
                IdReserva
            )
        VALUES
            (
                @MovementID,
                @pBookingId
            )

        RETURN 1
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK
        RETURN -1
    END CATCH
END
GO

DECLARE @returnvalue int
EXEC @returnvalue = dbo.SP_ChargeBooking 1
SELECT @returnvalue AS returnValue

SELECT * FROM Movimientos AS mov INNER JOIN CobroPorReserva AS c ON mov.Id = c.Id
SELECT * FROM Cliente