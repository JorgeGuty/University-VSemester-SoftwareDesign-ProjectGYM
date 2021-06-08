-- Create a new stored procedure called 'SP_InsertMovement' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_InsertMovement'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_InsertMovement
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_InsertMovement
    @pMembershipNumber  INT,
    @pAmount            DECIMAL(19,4),
    @pMovementTypeId    INT,
    @pSubject           NVARCHAR(100)
-- add more stored procedure parameters here
AS
BEGIN
    BEGIN TRY
        DECLARE @SPErrorCode                INT = (SELECT error.Code FROM dbo.Errors AS error WHERE error.ErrorName = 'SPError')  
        DECLARE @ClientNotFoundErrorCode        INT = (SELECT error.Code FROM dbo.Errors AS error WHERE error.ErrorName = 'ClientNotFound')

        IF @pMembershipNumber NOT IN 
            ( 
                SELECT 
                    client.Id 
                FROM 
                    dbo.Cliente AS client
            )
            RETURN @ClientNotFoundErrorCode

        DECLARE @IsCredit       BIT             =   (
                                                    SELECT
                                                        movementType.EsCredito
                                                    FROM
                                                        dbo.TipoMovimiento AS movementType
                                                    WHERE 
                                                        movementType.Id = @pMovementTypeId
                                                    )
        DECLARE @CurrentBalance DECIMAL(19,4)   =   (
                                                    SELECT
                                                        client.Saldo
                                                    FROM 
                                                        dbo.Cliente AS client
                                                    WHERE
                                                        client.Id = @pMembershipNumber                                                        
                                                    );
        DECLARE @InsertedAt     DATETIME        =   GETDATE();
        DECLARE @MovAmount      MONEY           =   @pAmount;
        DECLARE @newBalance     DECIMAL(19,4);
        DECLARE @IdMovement     INT;

        IF @IsCredit = 0 
            SET @MovAmount = @MovAmount * -1

        SET @newBalance = @CurrentBalance + @MovAmount;        

        SET TRANSACTION ISOLATION LEVEL READ COMMITTED
        BEGIN TRANSACTION
            
            UPDATE -- Update del saldo, plazos restantes y el campo de UpdatedAt de la tabla de AP.
                dbo.Cliente
            SET
                Saldo = @newBalance
            WHERE
                Id = @pMembershipNumber;

            INSERT INTO 
                dbo.Movimientos
                (
                    Monto,
                    Fecha,
                    ClienteId,
                    TipoMovimiento,
                    Asunto
                )
            VALUES
                (
                    @pAmount,
                    @InsertedAt,
                    @pMembershipNumber,
                    @pMovementTypeId,
                    @pSubject
                )
            
            SET @IdMovement = SCOPE_IDENTITY();                    
        COMMIT
        RETURN @IdMovement;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK
        RETURN @SPErrorCode
    END CATCH
END
GO

DECLARE @returnvalue int
EXEC @returnvalue = dbo.SP_InsertMovement 1, 3000, 3, 'n0'
SELECT @returnvalue AS returnValue

SELECT * FROM Cliente

SELECT * FROM Movimientos