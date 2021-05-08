DROP TABLE IF EXISTS [dbo].[Errors];
CREATE TABLE [dbo].[Errors](
	[Id]        [int] NOT NULL IDENTITY(1,1),
	[ErrorName] [nvarchar](50) NOT NULL UNIQUE,
    [Code]      [int] NOT NULL UNIQUE,
    [Message]   [nvarchar](100) NOT NULL,
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Errors] ADD  CONSTRAINT [PK_Errors] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO

INSERT INTO 
    dbo.Errors (ErrorName, Code, [Message]) 
VALUES
    ('SPError',-50001, 'Error excecuting the stored procedure. Internal Error.')

INSERT INTO 
    dbo.Errors (ErrorName, Code, [Message]) 
VALUES
    ('SessionOutOfSpacesError',-50002, 'The session is out of booking spaces.')

INSERT INTO 
    dbo.Errors (ErrorName, Code, [Message]) 
VALUES
    ('SessionOutOfSpacesErrorCode',-50003, 'The session is already booked by the user.')

INSERT INTO 
    dbo.Errors (ErrorName, Code, [Message]) 
VALUES
    ('NotBookedErrorCode',-50004, 'The session is not booked by the user.')

INSERT INTO 
    dbo.Errors (ErrorName, Code, [Message]) 
VALUES
    ('TimeUnavailableError',-50005, 'The time selected for the session is unavailable.')