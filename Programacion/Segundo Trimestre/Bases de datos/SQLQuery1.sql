

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