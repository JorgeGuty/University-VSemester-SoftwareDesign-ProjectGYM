BEGIN TRANSACTION
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
COMMIT TRANSACTION
-- DROPS
BEGIN TRANSACTION
GO

DROP TABLE IF EXISTS dbo.UsuarioCliente;
DROP TABLE IF EXISTS dbo.UsuarioAdmin;
DROP TABLE IF EXISTS dbo.Usuario;
DROP TABLE IF EXISTS dbo.TipoUsuario;
DROP TABLE IF EXISTS dbo.Administrador;

DROP TABLE IF EXISTS dbo.Credito;
DROP TABLE IF EXISTS dbo.CobroFijo;
DROP TABLE IF EXISTS dbo.CobroPorReserva;
DROP TABLE IF EXISTS dbo.Movimientos;
DROP TABLE IF EXISTS dbo.TipoMovimiento;
DROP TABLE IF EXISTS dbo.FormaDePago;
DROP TABLE IF EXISTS dbo.ConceptosDeCobroFijos;

DROP TABLE IF EXISTS dbo.Reserva;
DROP TABLE IF EXISTS dbo.Cliente;
DROP TABLE IF EXISTS dbo.Sesion;
DROP TABLE IF EXISTS dbo.SesionPreliminar


DROP TABLE IF EXISTS dbo.DiaDeAtencion;
DROP TABLE IF EXISTS dbo.HorarioDeSala;
DROP TABLE IF EXISTS dbo.Sala;
DROP TABLE IF EXISTS dbo.DiaSemana;

DROP TABLE IF EXISTS dbo.EspecialidadesDeInstructores;
DROP TABLE IF EXISTS dbo.Especialidades;
DROP TABLE IF EXISTS dbo.Instructor;
DROP TABLE IF EXISTS dbo.TipoInstructor;

COMMIT TRANSACTION
GO

SET DATEFIRST 1

-- CREATE
BEGIN TRANSACTION
GO

-- Catalog

CREATE TABLE [dbo].[TipoUsuario](
	[Id] [int] NOT NULL,
	[Nombre] [nvarchar](50) NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[TipoUsuario] ADD  CONSTRAINT [PK_TipoUsuario] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO

CREATE TABLE [dbo].[TipoMovimiento](
	[Id] [int] NOT NULL,
	[Nombre] [nvarchar](50) NOT NULL,
	EsCredito BIT NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[TipoMovimiento] ADD  CONSTRAINT [PK_TipoMovimiento] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO

CREATE TABLE [dbo].[FormaDePago](
	[Id] [int] NOT NULL,
	[Nombre] [nvarchar](50) NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[FormaDePago] ADD  CONSTRAINT [PK_FormaDePago] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO

CREATE TABLE dbo.DiaSemana
	(
	Id int NOT NULL IDENTITY (1, 1),
	Nombre nvarchar(50) NOT NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.DiaSemana ADD CONSTRAINT
	PK_DiaSemana PRIMARY KEY CLUSTERED 
	(
	Id
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO

CREATE TABLE dbo.TipoInstructor
	(
	Id int NOT NULL IDENTITY (1, 1),
	Nombre nvarchar(50) NOT NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.TipoInstructor ADD CONSTRAINT
	PK_TipoInstructor PRIMARY KEY CLUSTERED 
	(
	Id
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO

CREATE TABLE dbo.ConceptosDeCobroFijos
	(
	Id int NOT NULL,
	Nombre nvarchar(50) NOT NULL,
	Monto decimal(19, 4) NOT NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.ConceptosDeCobroFijos ADD CONSTRAINT
	PK_ConceptosDeCobroFijos PRIMARY KEY CLUSTERED 
	(
	Id
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO


-- Entidades
-----------------------------------------------------------------
-- Cliente
-----------------------------------------------------------------
CREATE TABLE [dbo].[Cliente](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Cedula] [nvarchar](50) NOT NULL,
	[Nombre] [nvarchar](50) NOT NULL,
	[Correo] [nvarchar](50) NOT NULL,
	[Celular] [nvarchar](50) NOT NULL,
	[Saldo] [decimal](19, 4) NOT NULL DEFAULT 0.0,
	[Active] [bit] NOT NULL DEFAULT 1
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[Cliente] ADD  CONSTRAINT [PK_Cliente] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
-----------------------------------------------------------------
-- Instructor
-----------------------------------------------------------------
CREATE TABLE dbo.Instructor
	(
	Id int NOT NULL IDENTITY (1, 1),
	Nombre nvarchar(50) NOT NULL,
	Cedula nvarchar(50) NOT NULL UNIQUE,
	Correo nvarchar(50) NOT NULL,
	Tipo int NOT NULL,
	Activo BIT NOT NULL DEFAULT 1
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.Instructor ADD CONSTRAINT
	PK_Instructor PRIMARY KEY CLUSTERED 
	(
	Id
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE dbo.Instructor ADD CONSTRAINT
	FK_Instructor_TipoInstructor FOREIGN KEY
	(
	Tipo
	) REFERENCES dbo.TipoInstructor
	(
	Id
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
GO
-----------------------------------------------------------------
-- Admin
-----------------------------------------------------------------
CREATE TABLE dbo.Administrador
	(
	Id int NOT NULL IDENTITY (1, 1),
	Nombre nvarchar(50) NOT NULL
	)  ON [PRIMARY]
GO

ALTER TABLE dbo.Administrador ADD CONSTRAINT
	PK_Administrador PRIMARY KEY CLUSTERED 
	(
	Id
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
-----------------------------------------------------------------
-- Usuario
-----------------------------------------------------------------
CREATE TABLE [dbo].[Usuario](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Username] [nvarchar](50) NOT NULL,
	[Password] [nvarchar](50) NOT NULL,
	[TipoUsuario] [int] NOT NULL,
	[Activo] [bit] NOT NULL DEFAULT 1
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Usuario] ADD  CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Usuario]  WITH CHECK ADD  CONSTRAINT [FK_Usuario_TipoUsuario] FOREIGN KEY([TipoUsuario])
REFERENCES [dbo].[TipoUsuario] ([Id])
GO
ALTER TABLE [dbo].[Usuario] CHECK CONSTRAINT [FK_Usuario_TipoUsuario]
GO
-----------------------------------------------------------------
-- Usuario Cliente
-----------------------------------------------------------------
CREATE TABLE [dbo].[UsuarioCliente](
	[Id] [int]  NOT NULL,
	[ClienteId] [int] NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[UsuarioCliente] ADD  CONSTRAINT [PK_UsuarioCliente] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[UsuarioCliente]  WITH CHECK ADD  CONSTRAINT [FK_UsuarioCliente_Cliente] FOREIGN KEY([ClienteId])
REFERENCES [dbo].[Cliente] ([Id])
GO
ALTER TABLE [dbo].[UsuarioCliente] CHECK CONSTRAINT [FK_UsuarioCliente_Cliente]
GO
ALTER TABLE [dbo].[UsuarioCliente]  WITH CHECK ADD  CONSTRAINT [FK_UsuarioCliente_Usuario] FOREIGN KEY([Id])
REFERENCES [dbo].[Usuario] ([Id])
GO
ALTER TABLE [dbo].[UsuarioCliente] CHECK CONSTRAINT [FK_UsuarioCliente_Usuario]
GO
-----------------------------------------------------------------
-- Usuario Admin
-----------------------------------------------------------------
CREATE TABLE [dbo].[UsuarioAdmin](
	[Id] [int] NOT NULL,
	[AdminId] INT NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[UsuarioAdmin] ADD  CONSTRAINT [PK_UsuarioAdmin] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[UsuarioAdmin]  WITH CHECK ADD  CONSTRAINT [FK_UsuarioAdmin_Usuario] FOREIGN KEY([Id])
REFERENCES [dbo].[Usuario] ([Id])
GO
ALTER TABLE [dbo].[UsuarioAdmin] CHECK CONSTRAINT [FK_UsuarioAdmin_Usuario]
GO

ALTER TABLE [dbo].[UsuarioAdmin]  WITH CHECK ADD  CONSTRAINT [FK_UsuarioAdmin_Administrador] FOREIGN KEY([AdminId])
REFERENCES [dbo].[Administrador] ([Id])
GO
ALTER TABLE [dbo].[UsuarioAdmin] CHECK CONSTRAINT [FK_UsuarioAdmin_Administrador]
GO





CREATE TABLE dbo.Especialidades
	(
	Id int NOT NULL IDENTITY (1, 1),
	Nombre nvarchar(50) NOT NULL,
	Costo decimal(19, 4) NOT NULL,
	Aforo int NOT NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.Especialidades ADD CONSTRAINT
	PK_Especialidades PRIMARY KEY CLUSTERED 
	(
	Id
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO

CREATE TABLE dbo.EspecialidadesDeInstructores
	(
	Id int NOT NULL IDENTITY (1, 1),
	InstructorId int NOT NULL,
	EspecialidadId int NOT NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.EspecialidadesDeInstructores ADD CONSTRAINT
	PK_EspecialidadesDeInstructores PRIMARY KEY CLUSTERED 
	(
	Id
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.EspecialidadesDeInstructores ADD CONSTRAINT
	FK_EspecialidadesDeInstructores_Especialidades FOREIGN KEY
	(
	EspecialidadId
	) REFERENCES dbo.Especialidades
	(
	Id
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
ALTER TABLE dbo.EspecialidadesDeInstructores ADD CONSTRAINT
	FK_EspecialidadesDeInstructores_Instructor FOREIGN KEY
	(
	InstructorId
	) REFERENCES dbo.Instructor
	(
	Id
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
GO

CREATE TABLE dbo.Sala
	(
	Id int NOT NULL IDENTITY (1, 1),
	Nombre nvarchar(50) NOT NULL,
	AforoMaximo int NOT NULL,
	CostoMatricula decimal(18, 0) NOT NULL,
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.Sala ADD CONSTRAINT
	PK_Sala PRIMARY KEY CLUSTERED 
	(
	Id
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO

CREATE TABLE dbo.HorarioDeSala
	(
	Id int NOT NULL IDENTITY (1, 1),
	SalaId int NOT NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.HorarioDeSala ADD CONSTRAINT
	PK_HorarioDeSala PRIMARY KEY CLUSTERED 
	(
	Id
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.HorarioDeSala ADD CONSTRAINT
	FK_HorarioDeSala_Sala FOREIGN KEY
	(
	SalaId
	) REFERENCES dbo.Sala
	(
	Id
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 

CREATE TABLE dbo.DiaDeAtencion
	(
	Id int NOT NULL IDENTITY (1, 1),
	DiaSemanaId int NOT NULL,
	HoraApertura int NOT NULL,
	HoraCierre int NOT NULL,
	HorarioId int NOT NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.DiaDeAtencion ADD CONSTRAINT
	PK_DiaDeAtencion PRIMARY KEY CLUSTERED 
	(
	Id
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.DiaDeAtencion ADD CONSTRAINT
	FK_DiaDeAtencion_HorarioDeSala FOREIGN KEY
	(
	HorarioId
	) REFERENCES dbo.HorarioDeSala
	(
	Id
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
ALTER TABLE dbo.DiaDeAtencion ADD CONSTRAINT
	FK_DiaDeAtencion_DiaSemana FOREIGN KEY
	(
	DiaSemanaId
	) REFERENCES dbo.DiaSemana
	(
	Id
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO

CREATE TABLE dbo.SesionPreliminar
	(
	Id int NOT NULL IDENTITY (1, 1),
	Nombre nvarchar(50) NOT NULL,
	DiaSemana int NOT NULL,
	Mes int NOT NULL,
	Año int NOT NULL,
	HoraInicio time NOT NULL,
	DuracionMinutos int NOT NULL,
	Cupo int NOT NULL,
	Activa bit NOT NULL DEFAULT 1,
	Confirmada bit NOT NULL DEFAULT 0,
	EspecialidadId int NOT NULL,
	InstructorId int NOT NULL,
	SalaId int NOT NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.SesionPreliminar ADD CONSTRAINT
	PK_SesionPreliminar PRIMARY KEY CLUSTERED 
	(
	Id
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.SesionPreliminar ADD CONSTRAINT
	FK_SesionPreliminarn_Especialidades FOREIGN KEY
	(
	EspecialidadId
	) REFERENCES dbo.Especialidades
	(
	Id
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
ALTER TABLE dbo.SesionPreliminar ADD CONSTRAINT
	FK_SesionPreliminar_Sala FOREIGN KEY
	(
	SalaId
	) REFERENCES dbo.Sala
	(
	Id
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
GO
ALTER TABLE dbo.SesionPreliminar ADD CONSTRAINT
	FK_SesionPreliminar_Instructor FOREIGN KEY
	(
	InstructorId
	) REFERENCES dbo.Instructor
	(
	Id
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
GO

CREATE TABLE dbo.Sesion
	(
	Id int NOT NULL IDENTITY (1, 1),
	Fecha date NOT NULL,
	Cancelada bit NOT NULL DEFAULT 0,
	Costo MONEY NOT NULL,
	InstructorId int NOT NULL,
	SessionPreliminarId int NOT NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.Sesion ADD CONSTRAINT
	PK_Sesion PRIMARY KEY CLUSTERED 
	(
	Id
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.Sesion ADD CONSTRAINT
	FK_Sesion_Instructor FOREIGN KEY
	(
	InstructorId
	) REFERENCES dbo.Instructor
	(
	Id
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
GO

CREATE INDEX SesionDateIndex
ON dbo.Sesion (Fecha);

CREATE TABLE dbo.Reserva
	(
	Id int NOT NULL IDENTITY (1, 1),
	FechaReserva datetime NOT NULL,
	Activa bit NOT NULL DEFAULT 1,
	ClienteId int NOT NULL,
	SesionId int NOT NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.Reserva ADD CONSTRAINT
	PK_Reserva PRIMARY KEY CLUSTERED 
	(
	Id
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.Reserva ADD CONSTRAINT
	FK_Reserva_Cliente FOREIGN KEY
	(
	ClienteId
	) REFERENCES dbo.Cliente
	(
	Id
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
ALTER TABLE dbo.Reserva ADD CONSTRAINT
	FK_Reserva_Sesion FOREIGN KEY
	(
	SesionId
	) REFERENCES dbo.Sesion
	(
	Id
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO

-----------------------------------------------------------------
-- Movimientos
-----------------------------------------------------------------
CREATE TABLE [dbo].[Movimientos](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Monto] [decimal](19, 4) NOT NULL,
	[Fecha] [datetime] NOT NULL,
	[ClienteId] [int] NOT NULL,
	[TipoMovimiento] [int] NOT NULL,
	[Asunto] [nvarchar](100) NOT NULL

) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Movimientos] ADD  CONSTRAINT [PK_Movimientos] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Movimientos]  WITH CHECK ADD  CONSTRAINT [FK_Movimientos_Cliente] FOREIGN KEY([ClienteId])
REFERENCES [dbo].[Cliente] ([Id])
GO
ALTER TABLE [dbo].[Movimientos] CHECK CONSTRAINT [FK_Movimientos_Cliente]
GO
ALTER TABLE [dbo].[Movimientos]  WITH CHECK ADD  CONSTRAINT [FK_Movimientos_TipoMovimiento] FOREIGN KEY([TipoMovimiento])
REFERENCES [dbo].[TipoMovimiento] ([Id])
GO
ALTER TABLE [dbo].[Movimientos] CHECK CONSTRAINT [FK_Movimientos_TipoMovimiento]
GO

CREATE TABLE [dbo].[Credito](
	[Id] [int] NOT NULL,
	[FormaDePagoId] [int] NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Credito] ADD  CONSTRAINT [PK_Credito] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Credito]  WITH CHECK ADD  CONSTRAINT [FK_Credito_FormaDePago] FOREIGN KEY([FormaDePagoId])
REFERENCES [dbo].[FormaDePago] ([Id])
GO
ALTER TABLE [dbo].[Credito] CHECK CONSTRAINT [FK_Credito_FormaDePago]
GO
ALTER TABLE [dbo].[Credito]  WITH CHECK ADD  CONSTRAINT [FK_Credito_Movimientos] FOREIGN KEY([Id])
REFERENCES [dbo].[Movimientos] ([Id])
GO
ALTER TABLE [dbo].[Credito] CHECK CONSTRAINT [FK_Credito_Movimientos]
GO

CREATE TABLE dbo.CobroFijo
	(
	Id int NOT NULL,
	IdConceptoDeCobro int NOT NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.CobroFijo ADD CONSTRAINT
	PK_CobroFijo PRIMARY KEY CLUSTERED 
	(
	Id
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.CobroFijo ADD CONSTRAINT
	FK_CobroFijo_ConceptosDeCobroFijos FOREIGN KEY
	(
	IdConceptoDeCobro
	) REFERENCES dbo.ConceptosDeCobroFijos
	(
	Id
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
ALTER TABLE dbo.CobroFijo ADD CONSTRAINT
	FK_CobroFijo_Movimientos FOREIGN KEY
	(
	Id
	) REFERENCES dbo.Movimientos
	(
	Id
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO

CREATE TABLE dbo.CobroPorReserva
	(
	Id int NOT NULL,
	IdReserva int NOT NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.CobroPorReserva ADD CONSTRAINT
	PK_CobroPorReserva PRIMARY KEY CLUSTERED 
	(
	Id
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.CobroPorReserva ADD CONSTRAINT
	FK_CobroPorReserva_Movimientos FOREIGN KEY
	(
	Id
	) REFERENCES dbo.Movimientos
	(
	Id
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
ALTER TABLE dbo.CobroPorReserva ADD CONSTRAINT
	FK_CobroPorReserva_Reserva FOREIGN KEY
	(
	IdReserva
	) REFERENCES dbo.Reserva
	(
	Id
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO

COMMIT TRANSACTION
GO

----------------------
