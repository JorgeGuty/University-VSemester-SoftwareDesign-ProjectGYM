USE PlusGymProject

INSERT INTO FormaDePago (Id, Nombre)
VALUES (1, 'Tarjeta');

INSERT INTO TipoUsuario (Id, Nombre)
VALUES (1, 'Administrador');
INSERT INTO TipoUsuario (Id, Nombre)
VALUES (2, 'Cliente');

INSERT INTO dbo.TipoInstructor VALUES ('planta'),('temporal');

INSERT INTO TipoMovimiento (Id, Nombre, EsCredito)
VALUES (1, 'Credito',1);

INSERT INTO Usuario (Username, [Password], TipoUsuario)
VALUES ('Admin1',1234,1);

INSERT INTO Usuario (Username, [Password], TipoUsuario)
VALUES ('Cliente1',1234,2);

INSERT INTO Usuario (Username, [Password], TipoUsuario)
VALUES ('Cliente2',1234,2);

INSERT INTO Administrador(Nombre)
VALUES ('Jorge El Curioso');

INSERT INTO UsuarioAdmin (Id, AdminId)
VALUES (1, 1);

INSERT INTO Cliente (Cedula,Nombre,Correo,Celular)
    VALUES 
    ('1100','Popeye','popeyeElMarino@gmail.com','60009999'),
    ('1111','Cliente','cliente@gmail.com','99999999'),
    ('118090772', 'Elclien T. Rodriguez', 'aaa@a.gmail', '+506 70560910');

INSERT INTO UsuarioCliente (Id, ClienteId)
VALUES (2, 1);

INSERT INTO dbo.UsuarioCliente (Id, ClienteId)
VALUES(3,2);

INSERT INTO Movimientos (Monto, Fecha, ClienteId,TipoMovimiento,Asunto)
VALUES (1000,GETDATE(),1,1, 'Mil colones de abono');
INSERT INTO Movimientos (Monto, Fecha, ClienteId,TipoMovimiento,Asunto)
VALUES (2000,GETDATE(),1,1, 'Abono antes de la quincena');

UPDATE Cliente
SET Saldo=3000
WHERE Id=1

INSERT INTO Credito (Id,FormaDePagoId)
VALUES (1,1);
INSERT INTO Credito (Id,FormaDePagoId)
VALUES (2,1);


insert into 
    dbo.Especialidades (Nombre, Aforo, Costo) 
values 
    ('Yoga', 15, 2000), 
    ('Funcional', 20, 2000)

insert into 
    dbo.Instructor (Nombre, Cedula, Correo, Tipo) 
values 
    ('instructor1', '1234567', 'a@a.com', 1), 
    ('instructor2', '762435', 'b@b.com', 1), 
    ('instructor3', '55555', 'c@c.com', 2)

INSERT INTO EspecialidadesDeInstructores (InstructorId,EspecialidadId)
VALUES(1,1);
INSERT INTO EspecialidadesDeInstructores (InstructorId,EspecialidadId)
VALUES(2,2);
INSERT INTO EspecialidadesDeInstructores (InstructorId,EspecialidadId)
VALUES(3,2);

insert INTO
    dbo.Sala (nombre,AforoMaximo, CostoMatricula)
VALUES
    ('PlusGym', 30, 36000.00)
insert into 
    dbo.SesionPreliminar (Nombre, DiaSemana, Mes, Año, HoraInicio, DuracionMinutos, Cupo,EspecialidadId,SalaId, InstructorId) 
values 
    ('Sesion de Yoga',         1, 5, 2021, CONVERT(TIME, '8:00'),  120, 12, 1, 1, 1),
    ('Sesion de Funcional',    1, 5, 2021, CONVERT(TIME, '9:30'),  120, 12, 2, 1, 2),
    ('Sesion de Yoga',         2, 5, 2021, CONVERT(TIME, '14:30'), 120, 12, 1, 1, 1),
    ('Sesion de YogaMax',      3, 5, 2021, CONVERT(TIME, '10:00'), 120, 12, 1, 1, 2),
    ('Sesion de FuncionalMax', 4, 5, 2021, CONVERT(TIME, '9:30'),  120, 12, 2, 1, 1),
    ('Sesion de YogaPro',      4, 5, 2021, CONVERT(TIME, '14:30'), 120, 12, 1, 1, 2)

INSERT INTO 
    dbo.Sesion(Fecha,Costo,InstructorId,SessionPreliminarId)
VALUES
    (CONVERT(DATE, '2021-05-31'),10, 1, 1),
    (CONVERT(DATE, '2021-05-30'),10, 2, 2),
    (CONVERT(DATE, '2021-05-27'),10, 1, 3),
    (CONVERT(DATE, '2021-05-29'),10, 1, 4)

UPDATE SesionPreliminar
SET Confirmada = 1
WHERE Id <= 4

INSERT INTO
    dbo.Reserva(FechaReserva,ClienteId,SesionId)
    values
        (GETDATE(),1,4),
        (GETDATE(),1,1),
        (GETDATE(),2,4)

UPDATE dbo.Reserva 
    SET Activa = 0 
    WHERE Id = 2;

