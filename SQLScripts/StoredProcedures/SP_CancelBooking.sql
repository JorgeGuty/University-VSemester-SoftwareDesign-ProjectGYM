-- Create a new stored procedure called 'SP_CancelBooking' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_CancelBooking'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_CancelBooking
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_CancelBooking
    @pMembershipNumber      INT,
    @pDate                  NVARCHAR(50),
    @pStartTime             NVARCHAR(50),
    @pRoomId                INT

AS
BEGIN
    BEGIN TRY

        DECLARE @SessionID          INT
        DECLARE @BookingId          INT    
        DECLARE @SessionDateTime    DATETIME   


        DECLARE @NotBookedErrorCode         INT = (SELECT error.Code FROM dbo.Errors AS error WHERE error.ErrorName = 'NotBookedError')  
        DECLARE @SPErrorCode                INT = (SELECT error.Code FROM dbo.Errors AS error WHERE error.ErrorName = 'SPError')  
        DECLARE @NoBookingsFoundErrorCode   INT = (SELECT error.Code FROM dbo.Errors AS error WHERE error.ErrorName = 'NoBookingsFound')
        DECLARE @NoSessionsFoundErrorCode   INT = (SELECT error.Code FROM dbo.Errors AS error WHERE error.ErrorName = 'NoSessionsFoundError')
        DECLARE @ClientNotFoundErrorCode        INT = (SELECT error.Code FROM dbo.Errors AS error WHERE error.ErrorName = 'ClientNotFound')

        
        IF @pMembershipNumber NOT IN 
            ( 
                SELECT 
                    client.Id 
                FROM 
                    dbo.Cliente AS client
            )
            RETURN @ClientNotFoundErrorCode
        
        -- Sets session id based on the session info provided.
        SET @SessionID = 
            (
                SELECT 
                    [session].SessionID
                FROM 
                    dbo.CompleteSessions AS [session]
                WHERE 
                        [session].SessionDate   = CONVERT(DATE, @pDate)
                    AND [session].RoomId        = @pRoomId
                    AND [session].StartTime     = CONVERT(TIME, @pStartTime)
            )
        IF @SessionID IS NULL RETURN @NoSessionsFoundErrorCode

        SET @SessionDateTime = 
            (
                SELECT 
                    CAST([session].SessionDate AS DATETIME) + CAST([session].StartTime AS DATETIME)
                FROM 
                    dbo.CompleteSessions AS [session]
                WHERE 
                    [session].SessionID = @SessionID               
            )

        SET @BookingId = 
            (
                SELECT 
                    [booking].Id
                FROM 
                    dbo.Reserva AS [booking]
                WHERE 
                        [booking].ClienteId = @pMembershipNumber
                    AND [booking].SesionId  = @SessionID
            )            
        IF @BookingId IS NULL RETURN @NoBookingsFoundErrorCode

        -- Checks if client has not booked that session
        IF @pMembershipNumber NOT IN 
            ( 
                SELECT 
                    booking.ClienteId 
                FROM 
                    dbo.Reserva AS booking 
                WHERE 
                        booking.SesionId = @SessionID 
                    AND booking.Activa = 1
            )
            RETURN @NotBookedErrorCode 
        ELSE
            BEGIN 

                -- Updates booking active attribute to 0, it means its no longer an active booking.
                UPDATE 
                    dbo.Reserva
                SET
                    Activa = 0
                WHERE 
                        Id          = @BookingId 
                    AND Activa      = 1
                                                
                IF DATEDIFF(HOUR, @SessionDateTime, GETDATE()) < 8
                BEGIN
                    EXEC SP_ChargeBooking @BookingId
                END
            END
        RETURN 1;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK
        RETURN @SPErrorCode 
    END CATCH
END
GO
-- example to execute the stored procedure we just created
DECLARE @returnvalue int
EXEC @returnvalue = SP_CancelBooking 1, '2021-05-26', '09:30:00', 1
SELECT @returnvalue AS returnValue
SELECT * from Reserva
SELECT * from Cliente
select * from CompleteSessions