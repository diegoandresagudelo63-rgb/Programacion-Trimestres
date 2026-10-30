CREATE DATABASE E_Commerce

USE E_Commerce

CREATE TABLE Categorias(
    CategoriaID INT IDENTITY(1,1) PRIMARY KEY NOT NULL ,
    Nombre VARCHAR(25) NOT NULL
)

CREATE TABLE Titulos_Cur(
    Titulo_CurID INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    Nombre VARCHAR(25) NOT NULL
)

CREATE TABLE Titulos_Mod(
    Titulo_ModID INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    Nombre VARCHAR(25) NOT NULL
)

CREATE TABLE Niveles(
    NivelID INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    Nombre VARCHAR(25) NOT NULL
)

CREATE TABLE Tipos(
    TipoID INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    Nombre VARCHAR(25) NOT NULL
)

CREATE TABLE Paises(
    PaisesID INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    Nombre VARCHAR(25) NOT NULL
)

CREATE TABLE Especialidades(
    EspecialidadID INT PRIMARY KEY NOT NULL,
    Nombre VARCHAR(25) NOT NULL
)

CREATE TABLE Estudiantes(
    EstudianteID INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    Nombre VARCHAR(25) NOT NULL,
    Correo VARCHAR(25),
    FechaInscripcion DATE NOT NULL
) 

CREATE TABLE Evaluaciones(
    EvaluacionID INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    Fecha DATE NOT NULL,
    PuntajeMax INT NOT NULL,
    TipoID INT FOREIGN KEY(TipoID) REFERENCES Tipos(TipoID),
    EstudianteID INT FOREIGN KEY(EstudianteID) REFERENCES Estudiantes(EstudianteID)
)

CREATE TABLE Cursos(
    CursoID INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    Duracion INT NOT NULL,
    Descripcion VARCHAR(50) NOT NULL,
    CategoriaID INT FOREIGN KEY (CategoriaID) REFERENCES Categorias(CategoriaID),
    TituloID INT FOREIGN KEY(TituloID) REFERENCES Titulos_Cur(Titulo_CurID),
    NivelID INT FOREIGN KEY(NivelID) REFERENCES Niveles(NivelID),
    EvaluacionID INT FOREIGN KEY (EvaluacionID) REFERENCES Evaluaciones(EvaluacionID),
)

CREATE TABLE Modulos(
    ModuloID INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    Orden INT NOT NULL,
    Contenido VARCHAR(50) NOT NULL,
    TituloID INT FOREIGN KEY (tituloID) REFERENCES Titulos_Mod(Titulo_ModID)
)

CREATE TABLE Cursos_Modulos(
    Cur_ModID INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    CursoID INT FOREIGN KEY (CursoID) REFERENCES Cursos(CursoID),
    ModuloID INT FOREIGN KEY (ModuloID) REFERENCES Modulos(ModuloID)
)

CREATE TABLE Instructores(
    InstructorID INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    Nombre VARCHAR(25) NOT NULL,
    Experiencia VARCHAR(15) NOT NULL,
    Correo VARCHAR(25),
    EspecialidadID INT FOREIGN KEY (EspecialidadID) REFERENCES Especialidades(EspecialidadID),
)

CREATE TABLE Cursos_Instructores(
    Cur_InstID INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    CursoID INT FOREIGN KEY (CursoID) REFERENCES Cursos(CursoID),
    InstructorID INT FOREIGN KEY (InstructorID) REFERENCES Instructores(InstructorID)
)

ALTER TABLE Estudiantes
ADD ModuloID INT FOREIGN KEY (ModuloID) REFERENCES Modulos(ModuloID)

CREATE TABLE Certificaciones(
    CertificacionID INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    FechaEval DATE NOT NULL
)

CREATE TABLE Certificacioes_Evaluaciones(
    Est_CertID INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    EvaluacionID INT FOREIGN KEY (EvaluacionID) REFERENCES Evaluaciones(EvaluacionID),
    CertificacionID INT FOREIGN KEY (CertificacionID) REFERENCES Certificaciones(CertificacionID)
)

CREATE TABLE Paises_Estudiantes(
    Pai_EstID INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    EstudianteID INT FOREIGN KEY (EstudianteID) REFERENCES Estudiantes(EstudianteID),
    PaisesID INT FOREIGN KEY (PaisesID) REFERENCES Paises(PaisesID)
)


-- INSERCION DE DATOS
INSERT INTO Categorias (Nombre) 
VALUES ('Desarrollo Web'), 
('Ciencia de Datos'), 
('Ciberseguridad');

INSERT INTO Titulos_Cur (Nombre) 
VALUES ('Master en Python'), 
('Fundamentos SQL'), 
('Hacking Ético');

INSERT INTO Titulos_Mod (Nombre) 
VALUES ('Sintaxis Básica'), 
('Estructuras Pro'), 
('Laboratorio Final');

INSERT INTO Niveles (Nombre) 
VALUES ('Principiante'), 
('Intermedio'), 
('Experto');

INSERT INTO Tipos (Nombre) 
VALUES ('Examen Escrito'), 
('Taller Práctico'), 
('Proyecto Integrador');

INSERT INTO Paises (Nombre) 
VALUES ('Colombia'), 
('México'), 
('España');

INSERT INTO Especialidades (EspecialidadID, Nombre) 
VALUES (1, 'Software'), 
(2, 'Análisis'), 
(3, 'Seguridad');

INSERT INTO Estudiantes (Nombre, Correo, FechaInscripcion) 
VALUES ('Julian Toro','julian@edu.com','2026-01-15'),
('Andrea Cano','andrea@edu.com','2026-02-05'),
('Jose Miguel','jose@edu.com','2026-02-20');

INSERT INTO Evaluaciones (Fecha, PuntajeMax, TipoID, EstudianteID) 
VALUES ('2026-02-25', 100, 1, 1), 
('2026-02-26', 85, 2, 2), 
('2026-02-27', 40, 3, 3);

INSERT INTO Cursos (Duracion, Descripcion, CategoriaID, TituloID, NivelID, EvaluacionID) 
VALUES (40,'Desarrollo de Aplicaciones Web',1,1,1,1),
(25,'Análisis de Datos con SQL',2,2,2,2),
(80,'Seguridad en Redes Corporativas',3,3,3,3);

INSERT INTO Modulos (Orden, Contenido, TituloID) 
VALUES (1,'Variables y Tipos', 1), 
(2,'Consultas Complejas', 2), 
(3,'Pentesting WiFi', 3);

UPDATE Estudiantes SET ModuloID = 1 
WHERE EstudianteID = 1;

UPDATE Estudiantes SET ModuloID = 2 
WHERE EstudianteID = 2;

UPDATE Estudiantes SET ModuloID = 3 
WHERE EstudianteID = 3;

INSERT INTO Instructores (Nombre, Experiencia, Correo, EspecialidadID) 
VALUES ('Jairo Ruiz','8 años','jairo@inst.com',1),
('Claudia Gil','4 años','claudia@inst.com',2),
('Mateo Lujan','12 años','mateo@inst.com',3);

INSERT INTO Paises_Estudiantes (EstudianteID, PaisesID) 
VALUES (1,1), (2,2), (3,3);


ALTER TABLE Estudiantes 
ALTER COLUMN Nombre VARCHAR(60) NOT NULL

ALTER TABLE Instructores 
ALTER COLUMN Experiencia VARCHAR(30)

ALTER TABLE Estudiantes 
ADD Celular_Acudiente VARCHAR(15)

SELECT * FROM Instructores

ALTER TABLE Niveles 
ADD Sigla_Nivel VARCHAR(5)

ALTER TABLE Estudiantes 
DROP COLUMN Celular_Acudiente

ALTER TABLE Niveles 
DROP COLUMN Sigla_Nivel

SELECT Nombre, Correo FROM Estudiantes

SELECT Descripcion, Duracion FROM Cursos

DROP TABLE Historial_Cambios

DROP TABLE Notas_Exposicion


-- DML - MANIPULACION DE REGISTROS
INSERT INTO Tipos (Nombre) 
VALUES ('Quiz Rápido')

INSERT INTO Paises (Nombre) 
VALUES ('Chile')

INSERT INTO Niveles 
VALUES ('Postgrado')

INSERT INTO Categorias 
VALUES ('Inteligencia Artificial')

INSERT INTO Estudiantes (Nombre, FechaInscripcion) 
VALUES ('Juanita Marín', '2026-03-05')

INSERT INTO Instructores (Nombre, Experiencia) 
VALUES ('Pedro Parra', '15 años')

UPDATE Estudiantes SET Correo = 'juanita@edu.com' 
WHERE Nombre = 'Juanita Marín'

UPDATE Cursos SET Duracion = 50 
WHERE CursoID = 1

DELETE FROM Estudiantes 
WHERE Nombre = 'Juanita Marín'

DELETE FROM Categorias 
WHERE Nombre = 'Inteligencia Artificial'

SELECT * FROM Estudiantes

-- FILTROS, CLAUSULAS Y OPERADORES
SELECT * FROM Evaluaciones 
WHERE PuntajeMax >= 50

SELECT * FROM Cursos 
WHERE Duracion < 60

SELECT * FROM Estudiantes 
WHERE FechaInscripcion > '2026-01-01'

SELECT * FROM Evaluaciones 
WHERE PuntajeMax = 40

SELECT * FROM Estudiantes 
WHERE Nombre = 'Julian Toro' AND EstudianteID = 1

SELECT * FROM Cursos 
WHERE CategoriaID = 2 AND Duracion = 25

SELECT * FROM Paises 
WHERE Nombre = 'Colombia' OR Nombre = 'México'

SELECT * FROM Tipos 
WHERE Nombre = 'Examen Escrito' OR Nombre = 'Proyecto Integrador'

SELECT * FROM Niveles 
WHERE Nombre IN ('Principiante', 'Intermedio')

SELECT * FROM Titulos_Cur 
WHERE Nombre IN ('Master en Python', 'Fundamentos SQL')

SELECT * FROM Paises 
WHERE Nombre NOT IN ('España', 'México')

SELECT * FROM Niveles 
WHERE Nombre NOT IN ('Experto')

SELECT * FROM Estudiantes 
WHERE Nombre LIKE 'J%'

SELECT * FROM Instructores 
WHERE Correo LIKE '%inst.com'

SELECT * FROM Evaluaciones 
WHERE PuntajeMax BETWEEN 40 AND 90

SELECT * FROM Cursos 
WHERE Duracion BETWEEN 30 AND 100

SELECT * FROM Estudiantes 
ORDER BY Nombre

SELECT * FROM Cursos 
ORDER BY Duracion

SELECT * FROM Categorias 
ORDER BY Nombre ASC

SELECT * FROM Paises 
ORDER BY Nombre ASC

SELECT * FROM Estudiantes
ORDER BY FechaInscripcion DESC

SELECT * FROM Evaluaciones 
ORDER BY PuntajeMax DESC

SELECT DISTINCT Nombre FROM Estudiantes

SELECT DISTINCT EspecialidadID FROM Instructores

SELECT TOP 2 * FROM Estudiantes

SELECT TOP 1 * FROM Instructores

SELECT TOP 2 * FROM Cursos 
ORDER BY Duracion DESC

SELECT TOP 1 * FROM Evaluaciones 
ORDER BY PuntajeMax ASC


-- AGREGACION Y AGRUPAMIENTO
SELECT SUM(Duracion) [Total Horas Cursos] FROM Cursos

SELECT SUM(PuntajeMax) AS [Suma Puntos] FROM Evaluaciones

SELECT AVG(PuntajeMax) [Promedio General] FROM Evaluaciones

SELECT AVG(Duracion) [Promedio Duracion] FROM Cursos

SELECT COUNT(*) [Total Estudiantes] FROM Estudiantes

SELECT COUNT(InstructorID) FROM Instructores

SELECT MIN(PuntajeMax) [Nota Mas Baja] FROM Evaluaciones

SELECT MIN(Duracion) FROM Cursos

SELECT MAX(Duracion) [Curso Mas Largo] FROM Cursos

SELECT MAX(PuntajeMax) FROM Evaluaciones

SELECT CategoriaID, SUM(Duracion) FROM Cursos 
GROUP BY CategoriaID

SELECT EspecialidadID, COUNT(*) FROM Instructores 
GROUP BY EspecialidadID

SELECT CategoriaID, AVG(Duracion) [Promedio Duracion]FROM Cursos 
GROUP BY CategoriaID HAVING AVG(Duracion) > 20 

SELECT EspecialidadID, COUNT(*) FROM Instructores 
GROUP BY EspecialidadID HAVING COUNT(*) >= 1


-- FUNCIONES DE TEXTO Y FECHA
SELECT LEN(Nombre) FROM Estudiantes

SELECT LEN(Contenido) FROM Modulos


SELECT UPPER(Nombre) FROM Instructores

SELECT UPPER(Nombre) FROM Paises

SELECT LOWER(Nombre) FROM Estudiantes

SELECT LOWER(Correo) FROM Instructores

SELECT CONCAT(Nombre, ' - ', Correo) FROM Estudiantes

SELECT CONCAT('Experto: ', Nombre) FROM Instructores

SELECT GETDATE() [Fecha Servidor]

SELECT GETDATE() AS [Control Tiempo]

SELECT DATEADD(DAY, 15, '2026-01-01')

SELECT DATEADD(MONTH, 2, GETDATE())

SELECT DATEDIFF(DAY, '2026-01-01', '2026-02-01')

SELECT DATEDIFF(YEAR, '2020-01-01', GETDATE())


-- IDENTITY, UNIQUE Y COLUMNAS CALCULADAS
CREATE TABLE Reg_Identity (ID INT IDENTITY(1,1), Valor VARCHAR(10))

CREATE TABLE Reg_Identity_2 (ID INT IDENTITY(5,5), Nom VARCHAR(10))

CREATE TABLE Restriccion_U1 (ID INT, Serial VARCHAR(10) UNIQUE)

CREATE TABLE Restriccion_U2 (ID INT, Nickname VARCHAR(25) UNIQUE)

CREATE TABLE Factura_Simulada (Base INT, Iva AS (Base * 0.19))

CREATE TABLE Prestamo (Monto MONEY, Interes AS (Monto * 0.05))


-- JOINS Y SUBCONSULTAS
SELECT * FROM Estudiantes 
CROSS JOIN Paises

SELECT * FROM Categorias 
CROSS JOIN Niveles

SELECT * FROM Estudiantes 
FULL OUTER JOIN Modulos 
ON Estudiantes.ModuloID = Modulos.ModuloID

SELECT * FROM Cursos 
FULL OUTER JOIN Evaluaciones 
ON Cursos.EvaluacionID = Evaluaciones.EvaluacionID

SELECT * FROM Estudiantes 
LEFT JOIN Paises_Estudiantes 
ON Estudiantes.EstudianteID = Paises_Estudiantes.EstudianteID

SELECT * FROM Cursos 
LEFT JOIN Cursos_Modulos 
ON Cursos.CursoID = Cursos_Modulos.CursoID

SELECT * FROM Instructores 
RIGHT JOIN Cursos_Instructores 
ON Instructores.InstructorID = Cursos_Instructores.InstructorID

SELECT * FROM Modulos 
RIGHT JOIN Cursos_Modulos 
ON Modulos.ModuloID = Cursos_Modulos.ModuloID

SELECT Estudiantes.Nombre, Evaluaciones.PuntajeMax FROM Estudiantes 
INNER JOIN Evaluaciones 
ON Estudiantes.EstudianteID = Evaluaciones.EstudianteID

SELECT Cursos.Descripcion, Categorias.Nombre FROM Cursos 
INNER JOIN Categorias 
ON Cursos.CategoriaID = Categorias.CategoriaID

SELECT Nombre FROM Estudiantes 
WHERE EstudianteID 
IN (SELECT EstudianteID FROM Evaluaciones 
WHERE PuntajeMax < 50)

SELECT Descripcion FROM Cursos 
WHERE CategoriaID = (SELECT CategoriaID FROM Categorias 
WHERE Nombre = 'Desarrollo Web')


-- VISTAS E INDICES
GO
CREATE VIEW v_Info_Estudiantes AS 
SELECT Nombre, Correo FROM Estudiantes
GO

CREATE VIEW v_Cursos_Expertos AS 
SELECT * FROM Cursos WHERE Duracion > 50
GO

CREATE INDEX IDX_Nom_Est 
ON Estudiantes(Nombre)

CREATE INDEX IDX_Dur_Cur 
ON Cursos(Duracion)


-- PROCEDIMIENTOS ALMACENADOS
GO
CREATE PROCEDURE sp_ListaInstructores 
AS
BEGIN 
SELECT * FROM Instructores END
GO

CREATE PROCEDURE sp_AddPais @NomP VARCHAR(25) 
AS 
BEGIN 
INSERT INTO Paises (Nombre) VALUES (@NomP) END
GO


-- FUNCIONES DEFINIDAS POR EL USUARIO
GO
CREATE FUNCTION dbo.fn_CalcularNeto (@Valor MONEY) 
RETURNS MONEY 
AS 
BEGIN 
RETURN @Valor * 0.80 END
GO

CREATE FUNCTION dbo.fn_ContarLetras (@Palabra VARCHAR(50)) 
RETURNS INT 
AS 
BEGIN 
RETURN LEN(@Palabra) END
GO


-- TRIGGERS
GO
CREATE TRIGGER trg_Aviso_Estudiante 
ON Estudiantes 
AFTER 
INSERT AS PRINT 'Log: Registro de estudiante exitante'
GO

CREATE TRIGGER trg_Aviso_Cursos 
ON Cursos 
AFTER 
UPDATE AS PRINT 'Log: Curso modificado'
GO