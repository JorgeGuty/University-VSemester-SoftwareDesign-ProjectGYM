-- Create a new stored procedure called 'SP_ChargeRegistration' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_ChargeRegistration'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_ChargeRegistration
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_ChargeRegistration
    @pMembershipNumber INT
-- add more stored procedure parameters here
AS
BEGIN
    BEGIN TRY
        DECLARE @Subject            NVARCHAR(50)    =   'Cobro de matrícula'
        DECLARE @MovementTypeID     INT             =   (
                                                        SELECT
                                                            movementType.Id
                                                        FROM
                                                            dbo.TipoMovimiento AS movementType
                                                        WHERE
                                                            movementType.Nombre = 'CobroFijo'
                                                        )                                                        
        DECLARE @Amount DECIMAL(19,4)
        DECLARE @ChargeConceptId INT                                          
        
        SELECT
            @Amount             = chargeConcept.Monto,
            @ChargeConceptId    = chargeConcept.Id
        FROM
            dbo.ConceptosDeCobroFijos AS chargeConcept
        WHERE
            chargeConcept.Nombre = 'Matrícula'
        
        DECLARE @MovementID INT
        EXEC @MovementID = dbo.SP_InsertMovement @pMembershipNumber, @Amount, @MovementTypeID, @Subject

        INSERT INTO 
            dbo.CobroFijo 
            (   
                Id, 
                IdConceptoDeCobro
            )
        VALUES
            (
                @MovementID,
                @ChargeConceptId
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
EXEC @returnvalue = dbo.SP_ChargeRegistration 1
SELECT @returnvalue AS returnValue

SELECT * FROM Movimientos --AS mov INNER JOIN CobroFijo AS c ON mov.Id = c.Id
SELECT * FROM Cliente