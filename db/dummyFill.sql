USE PlusGymProject

INSERT INTO FormaDePago (Id, Nombre)
VALUES (1, 'Tarjeta');

INSERT INTO TipoUsuario (Id, Nombre)
VALUES (1, 'Administrador');
INSERT INTO TipoUsuario (Id, Nombre)
VALUES (2, 'Cliente');

INSERT INTO TipoMovimiento (Id, Nombre)
VALUES (1, 'Credito');

INSERT INTO Usuario (Username, [Password], IdTipoUsuario)
VALUES ('Admin1',1234,1);
INSERT INTO Usuario (Username, [Password], IdTipoUsuario)
VALUES ('Cliente1',1234,2);

INSERT INTO UsuarioAdmin (Id, Nombre)
VALUES (7, 'Jorge El Curioso');
-- Id varia segun tabla Usuario

INSERT INTO Cliente (Cedula,Nombre,Correo,Celular)
VALUES ('1100','Popeye','popeyeElMarino@gmail.com','60009999');

INSERT INTO UsuarioCliente (Id, IdCliente)
VALUES (8, 1);
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
