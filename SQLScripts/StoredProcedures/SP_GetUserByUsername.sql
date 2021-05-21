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
		[user].[uniqueIdentifier]	AS	[uniqueIdentifier],
		[user].Username				AS	username,
		[user].[Password]			AS	[password],		
		[user].[TypeID]				AS	userType
	FROM
		dbo.CompleteUsers AS [user]
	WHERE 
			[user].Username = @pUsername 
		AND [user].Active = 1
END
GO

DECLARE @resultStatus INT
exec @resultStatus = SP_GetUserByUsername 'Cliente1'
