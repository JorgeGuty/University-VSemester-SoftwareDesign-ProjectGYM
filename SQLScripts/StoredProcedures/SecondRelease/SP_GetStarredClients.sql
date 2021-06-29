-- =============================================
-- Author:		Eduardo Madrigal Marin
-- Description:	Gets clients with stars and the number of stars
-- =============================================

CREATE PROCEDURE dbo.SP_GetStarredClients
    @pYear   INT,
    @pMonth   INT
AS
    BEGIN
        DECLARE @NumberOfWeeks INT = 4;

        SELECT 
            MembershipNumber,
            Stars
        FROM
            (
                SELECT 
                    ClienteId           AS MembershipNumber,
                    COUNT(SemanaDelMes) AS StarredWeeks, 
                    MIN(Cantidad)       AS Stars
                FROM
                    EstrellasMensuales stars
                WHERE
                    Año = @pYear
                    AND
                    Mes = @pMonth
                GROUP BY
                    ClienteId
            ) AS ClientStars
        WHERE 
            StarredWeeks = @NumberOfWeeks

        RETURN 1;

    END
GO

-- Tests
--dbo.SP_GetStarredClients 2021 6