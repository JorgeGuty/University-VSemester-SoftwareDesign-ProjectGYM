USE PlusGymProject

INSERT INTO FormaDePago (Id, Nombre)
VALUES (1, 'Tarjeta');

INSERT INTO TipoUsuario (Id, Nombre)
VALUES (1, 'Administrador');
INSERT INTO TipoUsuario (Id, Nombre)
VALUES (2, 'Cliente');

INSERT INTO dbo.TipoInstructor VALUES ('planta'),('temporal');

INSERT INTO TipoMovimiento (Id, Nombre)
VALUES (1, 'Credito');

INSERT INTO Usuario (Username, [Password], IdTipoUsuario)
VALUES ('Admin1',1234,1);
INSERT INTO Usuario (Username, [Password], IdTipoUsuario)
VALUES ('Cliente1',1234,2);

INSERT INTO UsuarioAdmin (Id, Nombre)
VALUES (1, 'Jorge El Curioso');
-- Id varia segun tabla Usuario

INSERT INTO Cliente (Cedula,Nombre,Correo,Celular)
VALUES ('1100','Popeye','popeyeElMarino@gmail.com','60009999');

insert into
    dbo.Cliente (Cedula, Nombre, Correo, Celular, Saldo, Estado)
VALUES
    ('118090772', 'Elclien T. Rodriguez', 'aaa@a.gmail', '+506 70560910', 0.0, 1)

INSERT INTO UsuarioCliente (Id, IdCliente)
VALUES (2, 1);

INSERT INTO dbo.UsuarioCliente (Id, IdCliente)
VALUES(3,2);
-- Id varia segun tabla Usuario

INSERT INTO Movimiento (Monto, Fecha, IdCliente,IdTipoMovimiento)
VALUES (1000,GETDATE(),1,1);
INSERT INTO Movimiento (Monto, Fecha, IdCliente,IdTipoMovimiento)
VALUES (2000,GETDATE(),1,1);

UPDATE Cliente
SET Saldo=3000
WHERE Id=1

INSERT INTO Credito (Id,IdFormaDePago)
VALUES (1,1);
INSERT INTO Credito (Id,IdFormaDePago)
VALUES (2,1);


insert into 
    dbo.Especialidades (Nombre, Aforo) 
values 
    ('Yoga', 15), 
    ('Funcional', 20)

insert into 
    dbo.Instructor (Nombre, Cedula, Correo, Tipo) 
values 
    ('instructor1', '1234567', 'a@a.com', 1), 
    ('instructor2', '762435', 'b@b.com', 1), 
    ('instructor3', '55555', 'c@c.com', 2)

insert INTO
    dbo.Sala (NumeroSala, AforoMaximo, CostoMatricula, Nombre)
VALUES
    (13, 30, 36000.00, 'PlusGym')

insert into 
    dbo.Sesion (Nombre, Fecha, DuracionMinutos, Cupos, Costo, Estado, InstructorId, EspecialidadId, SalaId) 
values 
    ('Sesion de Yoga', CONVERT(DATETIME, '2021-04-25 12:00:00'), 120, 12, 5000.00, 1, 1, 1, 1),
    ('Sesion de Yoga', CONVERT(DATETIME, '2021-04-25 14:00:00'), 120, 12, 5000.00, 1, 2, 2, 1),
    ('Sesion de Yoga', CONVERT(DATETIME, '2021-04-26 16:00:00'), 120, 12, 5000.00, 1, 3, 1, 1)

