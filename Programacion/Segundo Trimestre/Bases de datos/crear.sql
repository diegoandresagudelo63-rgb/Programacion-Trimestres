create database Icomers

use Icomers

CREATE TABLE Categorias(
    CategoriaID INT IDENTITY(1,1) PRIMARY KEY NOT NULL ,
    Nombre VARCHAR(25) NOT NULL
)

CREATE TABLE Titulos_Cur(
    Titulo_CurID INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    Nombre VARCHAR(25) NOT NULL
)

create table Titulos_Mod(
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
    TipoID INT foreign key(TipoID) references Tipos(TipoID),
    EstudianteID INT foreign key(EstudianteID) references Estudiantes(EstudianteID)
)

CREATE TABLE Cursos(
    CursoID INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    Duracion INT NOT NULL,
    Descripcion VARCHAR(50) NOT NULL,
    CategoriaID INT foreign key (CategoriaID) references Categorias(CategoriaID),
    TituloID INT foreign key(TituloID) references Titulos_Cur(Titulo_CurID),
    NivelID INT foreign key(NivelID) references Niveles(NivelID),
    EvaluacionID INT foreign key (EvaluacionID) references Evaluaciones(EvaluacionID),
)

CREATE TABLE Modulos(
    ModuloID INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    Orden INT NOT NULL,
    Contenido VARCHAR(50) NOT NULL,
    TituloID INT foreign key (tituloID) references Titulos_Mod(Titulo_ModID)
)

create table Cursos_Modulos(
    Cur_ModID INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    CursoID INT foreign key (CursoID) references Cursos(CursoID),
    ModuloID INT foreign key (ModuloID) references Modulos(ModuloID)
)

CREATE TABLE Instructores(
    InstructorID INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    Nombre VARCHAR(25) NOT NULL,
    Experiencia VARCHAR(15) NOT NULL,
    Correo VARCHAR(25),
    EspecialidadID INT foreign key (EspecialidadID) references Especialidades(EspecialidadID),
)

create table Cursos_Instructores(
    Cur_InstID INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    CursoID INT foreign key (CursoID) references Cursos(CursoID),
    InstructorID INT foreign key (InstructorID) references Instructores(InstructorID)
)

alter table Estudiantes
add ModuloID INT foreign key (ModuloID) references Modulos(ModuloID)

CREATE TABLE Certificaciones(
    CertificacionID INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    FechaEval DATE NOT NULL
)

create table Certificacioes_Evaluaciones(
    Est_CertID INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    EvaluacionID int foreign key (EvaluacionID) references Evaluaciones(EvaluacionID),
    CertificacionID INT foreign key (CertificacionID) references Certificaciones(CertificacionID)
)

create table Paises_Estudiantes(
    Pai_EstID INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    EstudianteID INT foreign key (EstudianteID) references Estudiantes(EstudianteID),
    PaisesID INT foreign key (PaisesID) references Paises(PaisesID)
)
INSERT INTO Categorias (Nombre) VALUES
('Programación'),
('Diseño'),
('Marketing');

INSERT INTO Titulos_Cur (Nombre) VALUES
('Curso Básico'),
('Curso Intermedio'),
('Curso Avanzado');

INSERT INTO Titulos_Mod (Nombre) VALUES
('Módulo Teórico'),
('Módulo Práctico'),
('Módulo Proyecto');

INSERT INTO Niveles (Nombre) VALUES
('Inicial'),
('Medio'),
('Avanzado');

INSERT INTO Tipos (Nombre) VALUES
('Examen'),
('Tarea'),
('Proyecto');

INSERT INTO Paises (Nombre) VALUES
('México'),
('España'),
('Argentina');

INSERT INTO Especialidades (EspecialidadID, Nombre) VALUES
(1, 'Programación'),
(2, 'Diseño'),
(3, 'Marketing');

INSERT INTO Estudiantes (Nombre, Correo, FechaInscripcion) VALUES
('Juan Pérez','juan@mail.com','2026-01-10'),
('Ana Gómez','ana@mail.com','2026-02-01'),
('Luis Martínez','luis@mail.com','2026-02-15');

INSERT INTO Evaluaciones (Fecha, PuntajeMax, TipoID, EstudianteID) VALUES
('2026-02-20', 100, 1, 1),
('2026-02-22', 50, 2, 2),
('2026-02-23', 75, 3, 3);

INSERT INTO Cursos (Duracion, Descripcion, CategoriaID, TituloID, NivelID, EvaluacionID) VALUES
(30,'Curso de Programación Básica',1,1,1,1),
(45,'Curso de Diseño Intermedio',2,2,2,2),
(60,'Curso de Marketing Avanzado',3,3,3,3);

INSERT INTO Modulos (Orden, Contenido, TituloID) VALUES
(1,'Introducción a la teoría',1),
(2,'Ejercicios prácticos',2),
(3,'Proyecto final',3);

INSERT INTO Cursos_Modulos (CursoID, ModuloID) VALUES
(1,1),
(2,2),
(3,3);

INSERT INTO Instructores (Nombre, Experiencia, Correo, EspecialidadID) VALUES
('Carlos López','5 años','carlos@mail.com',1),
('María Fernández','3 años','maria@mail.com',2),
('Pedro Sánchez','7 años','pedro@mail.com',3);

INSERT INTO Cursos_Instructores (CursoID, InstructorID) VALUES
(1,1),
(2,2),
(3,3);

UPDATE Estudiantes SET ModuloID = 1 WHERE EstudianteID = 1;
UPDATE Estudiantes SET ModuloID = 2 WHERE EstudianteID = 2;
UPDATE Estudiantes SET ModuloID = 3 WHERE EstudianteID = 3;

INSERT INTO Certificaciones (FechaEval) VALUES
('2026-02-21'),
('2026-02-23'),
('2026-02-24');


INSERT INTO Certificacioes_Evaluaciones (EvaluacionID, CertificacionID) VALUES
(1,1),
(2,2),
(3,3);

INSERT INTO Paises_Estudiantes (EstudianteID, PaisesID) VALUES
(1,1),
(2,2),
(3,3);