-- Create a new stored procedure called 'SP_ChargeDaysBookings' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_ChargeDaysBookings'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_ChargeDaysBookings
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_ChargeDaysBookings
AS
BEGIN
    BEGIN TRY
        
        DECLARE @BookingId INT
        DECLARE @TodaysDate DATE = GETDATE()

        DECLARE todaysBookingsIds CURSOR LOCAL FAST_FORWARD FOR
            SELECT
                booking.Id
            FROM
                dbo.Reserva AS booking
            INNER JOIN
                dbo.Sesion AS [session]
                ON [session].[Id] = booking.SesionId
            WHERE
                    [session].[Fecha] = @TodaysDate
                AND booking.Activa = 1

        OPEN todaysBookingsIds

        FETCH NEXT FROM todaysBookingsIds INTO @BookingId

        WHILE @@FETCH_STATUS = 0 BEGIN
            EXEC SP_ChargeBooking  @BookingId
            FETCH NEXT FROM todaysBookingsIds INTO @BookingId
        END

        CLOSE todaysBookingsIds
        DEALLOCATE todaysBookingsIds

        RETURN 1;
    END TRY
    BEGIN CATCH
        RETURN @@Error * -1
    END CATCH
END
GO

DECLARE @returnvalue int
EXEC @returnvalue = SP_ChargeDaysBookings
SELECT @returnvalue AS errorCode
select * from Cliente