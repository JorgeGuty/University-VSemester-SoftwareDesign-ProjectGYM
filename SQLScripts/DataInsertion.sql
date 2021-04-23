
insert into dbo.TipoUsuario VALUES ('administrador'),('cliente')
insert into dbo.TipoInstructor VALUES ('planta'),('temporal')


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


insert into
    dbo.Usuario (Username, [Password], TipoUsuario, Estado)
VALUES
    ('Cliente1', '1234', 2, 1),
    ('Admin1', '1234', 1, 1)

insert into
    dbo.UsuarioAdmin (Nombre)
VALUES
    (42312)    

insert into
    dbo.Cliente (Cedula, Nombre, Correo, Celular, Saldo, Estado)
VALUES
    ('118090772', 'Elclien T. Rodriguez', 'aaa@a.gmail', '+506 70560910', 0.0, 1)
       

insert into
    dbo.UsuarioCliente (ClientId)
VALUES
    (1)    


EXEC SP_GetUserByUsername 'Cliente1'
