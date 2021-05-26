-- Create a new stored procedure called 'SP_InsertCreditMovement' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_InsertCreditMovement'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_InsertCreditMovement
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_InsertCreditMovement
    @pMembershipNumber  INT,
    @pAmount            DECIMAL(19,4),
    @pSubject           NVARCHAR(50),
    @pPaymentMethodID   INT
-- add more stored procedure parameters here
AS
BEGIN
    BEGIN TRY
        
        DECLARE @MovementTypeID     INT             =   (
                                                        SELECT
                                                            movementType.Id
                                                        FROM
                                                            dbo.TipoMovimiento AS movementType
                                                        WHERE
                                                            movementType.Nombre = 'Credito'
                                                        )                                                                                    
        
        DECLARE @MovementID INT
        EXEC @MovementID = dbo.SP_InsertMovement @pMembershipNumber, @pAmount, @MovementTypeID, @pSubject

        INSERT INTO 
            dbo.Credito
            (   
                Id, 
                FormaDePagoId
            )
        VALUES
            (
                @MovementID,
                @pPaymentMethodID
            )
        IF @@ROWCOUNT > 0 RETURN 1
        ELSE RETURN -1 
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK
        RETURN -1
    END CATCH
END
GO

DECLARE @returnvalue int
EXEC @returnvalue = dbo.SP_InsertCreditMovement 1, 60030, 'mentira si te perdono :)', 1
SELECT @returnvalue AS returnValue

SELECT * FROM TipoMovimiento

SELECT * FROM Movimientos --AS mov INNER JOIN CobroFijo AS c ON mov.Id = c.Id
SELECT * FROM Cliente                                      