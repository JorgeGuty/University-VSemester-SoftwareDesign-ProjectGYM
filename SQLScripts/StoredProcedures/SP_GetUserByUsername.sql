SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      Jorge Gutiérrez Cordero
-- Create Date: 4/21/2021
-- Description: Gets a user by its username
-- =============================================
ALTER PROCEDURE [dbo].[SP_GetUserByUsername]
(
    -- Add the parameters for the stored procedure here
    @pUsername	nchar(20)
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
    SELECT 
		[user].Id				AS	id,
		[user].Username			AS	username,
		[user].[Password]		AS	[password],		
		[user].TipoUsuario		AS	userType
	FROM
		dbo.Usuario AS [user]
	WHERE 
		[user].Username = @pUsername AND [user].Activo = 1
END
GO
