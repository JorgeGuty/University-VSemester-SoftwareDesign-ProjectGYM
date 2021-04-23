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

insert into 
    dbo.Sesion (Nombre, Fecha, DuracionMinutos, Cupos, Costo, Estado, InstructorId, EspecialidadId, SalaId) 
values 
    (Nombre, Fecha, DuracionMinutos, Cupos, Costo, Estado, InstructorId, EspecialidadId, SalaId),
    (Nombre, Fecha, DuracionMinutos, Cupos, Costo, Estado, InstructorId, EspecialidadId, SalaId),
    (Nombre, Fecha, DuracionMinutos, Cupos, Costo, Estado, InstructorId, EspecialidadId, SalaId)
