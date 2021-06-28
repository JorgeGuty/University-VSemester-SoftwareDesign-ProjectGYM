USE PlusGymProject

INSERT INTO FormaDePago (Id, Nombre)
VALUES (1, 'Tarjeta');

INSERT INTO TipoUsuario (Id, Nombre)
VALUES (1, 'Administrador');
INSERT INTO TipoUsuario (Id, Nombre)
VALUES (2, 'Cliente');

INSERT INTO dbo.ConceptosDeCobroFijos (Id, Nombre, Monto) 
VALUES (1, 'Matrícula', 30000.0)

INSERT INTO dbo.TipoInstructor VALUES ('planta'),('temporal');

INSERT INTO TipoMovimiento (Id, Nombre, EsCredito)
VALUES 
    (1, 'Credito', 1),
    (2, 'CobroFijo', 0),
    (3, 'CobroPorReserva', 0);

INSERT INTO
    dbo.Sala (nombre,AforoMaximo, CostoMatricula)
VALUES
    ('PlusGym2', 30, 36000.00)

INSERT INTO dbo.DiaDeAtencion(SalaId,HoraApertura,HoraCierre,DiaSemana)
VALUES
    (1,'5:30', '9:30', 1),
    (1,'5:30', '9:30', 2),
    (1,'5:30', '9:30', 3),
    (1,'5:30', '9:30', 4),
    (1,'5:30', '9:30', 5),
    (1,'6:30', '9:30', 6),
    (1,'6:30', '8:30', 7);

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

INSERT INTO Notificaciones ([Message],[Date],[Time],ClienteId)
VALUES ('Prueba',CONVERT(DATE, '2021-08-19'),CONVERT(TIME, '8:00'),1)
INSERT INTO Notificaciones ([Message],[Date],[Time],ClienteId)
VALUES ('Prueba',CONVERT(DATE, '2021-08-19'),CONVERT(TIME, '8:00'),1)

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

INSERT INTO ServiciosFavoritos (ClienteId, EspecialidadId)
VALUES (1,1);

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


insert into 
    dbo.SesionPreliminar (Nombre, DiaSemana, Mes, Año, HoraInicio, DuracionMinutos, Cupo,EspecialidadId,SalaId, InstructorId) 
values 
    ('Sesion de Yoga',         1, 8, 2021, CONVERT(TIME, '8:00'),  120, 12, 1, 1, 1),
    ('Sesion de Funcional',    1, 8, 2021, CONVERT(TIME, '9:30'),  120, 12, 2, 1, 2),
    ('Sesion de Yoga',         2, 8, 2021, CONVERT(TIME, '14:30'), 120, 12, 1, 1, 1),
    ('Sesion de YogaMax',      3, 7, 2021, CONVERT(TIME, '10:00'), 120, 12, 1, 1, 2),
    ('Sesion de FuncionalMax', 4, 7, 2021, CONVERT(TIME, '9:30'),  120, 12, 2, 1, 1),
    ('Sesion de YogaPro',      4, 7, 2021, CONVERT(TIME, '14:30'), 120, 12, 1, 1, 2)

INSERT INTO 
    dbo.Sesion(Fecha,Costo,InstructorId,SessionPreliminarId)
VALUES
    (CONVERT(DATE, '2021-08-31'),10, 1, 1),
    (CONVERT(DATE, '2021-08-30'),10, 2, 2),
    (CONVERT(DATE, '2021-07-27'),10, 1, 3),
    (CONVERT(DATE, '2021-07-29'),10, 1, 4)

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

-- Reservas para probar el observer
INSERT INTO
    dbo.Reserva(FechaReserva,ClienteId,SesionId)
    values
        (GETDATE(),3,6),
        (GETDATE(),1,6),
        (GETDATE(),1,6),
        (GETDATE(),1,6),
        (GETDATE(),1,6),
        (GETDATE(),1,6),
        (GETDATE(),1,6),
        (GETDATE(),1,6),
        (GETDATE(),1,6),
        (GETDATE(),1,6),
        (GETDATE(),1,6),
        (GETDATE(),1,6)


-- Pruebas de Ale

-- INSERT INTO 
--     dbo.Sesion(Fecha,Costo,InstructorId,SessionPreliminarId)
-- VALUES
--     (CONVERT(DATE, '2021-04-20'),10, 1, 1),
--     (CONVERT(DATE, '2021-04-30'),10, 2, 2),
--     (CONVERT(DATE, '2021-04-27'),10, 1, 3),
--     (CONVERT(DATE, '2021-04-29'),10, 1, 4),
--     (CONVERT(DATE, '2021-03-20'),10, 1, 1),
--     (CONVERT(DATE, '2021-03-30'),10, 2, 2),
--     (CONVERT(DATE, '2021-03-27'),10, 1, 3),
--     (CONVERT(DATE, '2021-03-29'),10, 1, 4)

-- INSERT INTO
--     dbo.Reserva(FechaReserva,ClienteId,SesionId)
--     values
--         (GETDATE(),3,17),
--         (GETDATE(),1,17),
--         (GETDATE(),2,17),
--         (GETDATE(),3,10),
--         (GETDATE(),1,10),
--         (GETDATE(),2,10),
--         (GETDATE(),3,11),
--         (GETDATE(),1,12),
--         (GETDATE(),2,13),
--         (GETDATE(),3,11),
--         (GETDATE(),1,12),
--         (GETDATE(),2,13),
--         (GETDATE(),3,14),
--         (GETDATE(),1,15),
--         (GETDATE(),2,15),
--         (GETDATE(),3,15),
--         (GETDATE(),1,16),
--         (GETDATE(),3,16)