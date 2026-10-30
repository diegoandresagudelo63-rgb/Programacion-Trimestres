CREATE DATABASE Kinder1

USE Kinder1

CREATE TABLE Alumno(
	AlumnoID INT PRIMARY KEY NOT NULL,
	Nombre VARCHAR(25) NOT NULL,
	Apellido VARCHAR(25) NOT NULL,
	FechaNac DATE NOT NULL,
	Sexo VARCHAR(20)
)

CREATE TABLE Docente(
	MaestroID INT PRIMARY KEY IDENTITY (1,1),
	Nombre VARCHAR(25),
	Apellido VARCHAR(25),
	Correo VARCHAR(25),
	Direccion VARCHAR(50),
	FechaNac DATE,
	Sueldo MONEY,
	FechaIngreso DATE,
	Telefono VARCHAR(15)
)

ALTER TABLE Alumno ADD Direccion VARCHAR(50) NOT NULL
ALTER TABLE Alumno ADD Telefono VARCHAR(15) NOT NULL

ALTER TABLE Alumno DROP Column Sexo
ALTER TABLE Alumno DROP Column Telefono

SELECT * FROM Docente

SELECT AlumnoID, FechaNac FROM Alumno

DROP TABLE Docente

ALTER TABLE Alumno ADD Municipio_Alum VARCHAR(50) NOT NULL
ALTER TABLE Docente ADD Municipio_Doc VARCHAR(50) NOT NULL
ALTER TABLE Alumno ADD Sexo VARCHAR(10) NOT NULL

INSERT INTO Alumno
VALUES (1023456789, 'Juan', 'Martinez', '02-20-2026', 'Calle 37 #21-60', 'Medellin', 'Masculino')

INSERT INTO Alumno(Nombre,Apellido,FechaNac,Direccion,Municipio_Alum,Sexo)
VALUES 
( 'Maria', 'Gomez', '2024-02-13', 'Calle 45 #10-30', 'Bogota', 'Femenino')


insert into Alumno(AlumnoID, Nombre, Apellido, FechaNac, Direccion, Municipio_Alum, Sexo)
values ( 1,'Maria', 'Gomez', '2024-02-13', 'Calle 45 #10-30', 'Bogota', 'Femenino')

select * from Alumno