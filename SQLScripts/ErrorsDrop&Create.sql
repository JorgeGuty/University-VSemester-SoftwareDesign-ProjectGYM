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
    ('AlreadyBookedError',-50003, 'The session is already booked by the user.')

INSERT INTO 
    dbo.Errors (ErrorName, Code, [Message]) 
VALUES
    ('NotBookedError',-50004, 'The session is not booked by the user.')

INSERT INTO 
    dbo.Errors (ErrorName, Code, [Message]) 
VALUES
    ('TimeUnavailableError',-50005, 'The time selected for the session is unavailable.')

INSERT INTO 
    dbo.Errors (ErrorName, Code, [Message]) 
VALUES
    ('PreliminaryNotFoundError',-50006, 'The preliminary session data does not correspond to an existing preliminary session.')

INSERT INTO 
    dbo.Errors (ErrorName, Code, [Message]) 
VALUES
    ('NoSessionsFoundError',-50007, 'No sessions were found with the given data.')

INSERT INTO dbo.Errors (ErrorName, Code, Message)
VALUES('InstructorNotFound',-50008,'Instructor information does not correspond to an existing instructor')

INSERT INTO 
    dbo.Errors (ErrorName, Code, [Message]) 
VALUES
    ('UsernameTakenError',-50009, 'The username entered already exist.')

INSERT INTO 
    dbo.Errors (ErrorName, Code, [Message]) 
VALUES
    ('UserNotFound',-50010, 'The username entered does not exist.')

INSERT INTO 
    dbo.Errors (ErrorName, Code, [Message]) 
VALUES
    ('UserAlreadyCreated',-50011, 'The user is already created for the client specified.')

INSERT INTO 
    dbo.Errors (ErrorName, Code, [Message]) 
VALUES
    ('ClientNotFound',-50012, 'The membership number specified does not exist.')

INSERT INTO 
    dbo.Errors (ErrorName, Code, [Message]) 
VALUES
    ('EmailUnavailable',-50013, 'The email entered is already taken.')

INSERT INTO 
    dbo.Errors (ErrorName, Code, [Message]) 
VALUES
    ('ServiceAlreadyExists',-50014, 'The Service name entered already exists')

INSERT INTO 
    dbo.Errors (ErrorName, Code, [Message]) 
VALUES
    ('InstructorAlreadyExists',-50015, 'The Instructor Identification entered already exists')

INSERT INTO 
    dbo.Errors (ErrorName, Code, [Message]) 
VALUES
    ('InstructorTypeNotDefined',-50016, 'The Instructor type entered is not defined')

INSERT INTO 
    dbo.Errors (ErrorName, Code, [Message]) 
VALUES
    ('CannotCancelSession',-50017, 'Cannot cancel session less than 8h before the start time.')

INSERT INTO 
    dbo.Errors (ErrorName, Code, [Message]) 
VALUES
    ('NoBookingsFound',-50018, 'No bookings found with the specified data.')

INSERT INTO 
    dbo.Errors (ErrorName, Code, [Message]) 
VALUES
    ('ServiceNotFound',-50019, 'No service found with the specified data.')

INSERT INTO 
    dbo.Errors (ErrorName, Code, [Message]) 
VALUES
    ('RoomNotFound',-50020, 'No room found with the specified data.')