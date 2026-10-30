-- ============================================================
--  E_Commerce 
-- ============================================================

CREATE DATABASE IF NOT EXISTS E_Commerce;

USE E_Commerce;

-- ============================================================
-- CREACION DE TABLAS
-- ============================================================

CREATE TABLE Categorias (
    CategoriaID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    Nombre      VARCHAR(25) NOT NULL
);

CREATE TABLE Titulos_Cur (
    Titulo_CurID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    Nombre       VARCHAR(25) NOT NULL
);

CREATE TABLE Titulos_Mod (
    Titulo_ModID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    Nombre       VARCHAR(25) NOT NULL
);

CREATE TABLE Niveles (
    NivelID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    Nombre  VARCHAR(25) NOT NULL
);

CREATE TABLE Tipos (
    TipoID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    Nombre VARCHAR(25) NOT NULL
);

CREATE TABLE Paises (
    PaisesID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    Nombre   VARCHAR(25) NOT NULL
);

CREATE TABLE Especialidades (
    EspecialidadID INT PRIMARY KEY NOT NULL,
    Nombre         VARCHAR(25) NOT NULL
);

CREATE TABLE Estudiantes (
    EstudianteID     INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    Nombre           VARCHAR(25) NOT NULL,
    Correo           VARCHAR(25),
    FechaInscripcion DATE NOT NULL
);

CREATE TABLE Evaluaciones (
    EvaluacionID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    Fecha        DATE NOT NULL,
    PuntajeMax   INT  NOT NULL,
    TipoID       INT,
    EstudianteID INT,
    CONSTRAINT fk_eval_tipo       FOREIGN KEY (TipoID)       REFERENCES Tipos(TipoID),
    CONSTRAINT fk_eval_estudiante FOREIGN KEY (EstudianteID) REFERENCES Estudiantes(EstudianteID)
);

CREATE TABLE Cursos (
    CursoID      INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    Duracion     INT         NOT NULL,
    Descripcion  VARCHAR(50) NOT NULL,
    CategoriaID  INT,
    TituloID     INT,
    NivelID      INT,
    EvaluacionID INT,
    CONSTRAINT fk_cur_categoria  FOREIGN KEY (CategoriaID)  REFERENCES Categorias(CategoriaID),
    CONSTRAINT fk_cur_titulo     FOREIGN KEY (TituloID)     REFERENCES Titulos_Cur(Titulo_CurID),
    CONSTRAINT fk_cur_nivel      FOREIGN KEY (NivelID)      REFERENCES Niveles(NivelID),
    CONSTRAINT fk_cur_evaluacion FOREIGN KEY (EvaluacionID) REFERENCES Evaluaciones(EvaluacionID)
);

CREATE TABLE Modulos (
    ModuloID  INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    Orden     INT         NOT NULL,
    Contenido VARCHAR(50) NOT NULL,
    TituloID  INT,
    CONSTRAINT fk_mod_titulo FOREIGN KEY (TituloID) REFERENCES Titulos_Mod(Titulo_ModID)
);

CREATE TABLE Cursos_Modulos (
    Cur_ModID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    CursoID   INT,
    ModuloID  INT,
    CONSTRAINT fk_cm_curso  FOREIGN KEY (CursoID)  REFERENCES Cursos(CursoID),
    CONSTRAINT fk_cm_modulo FOREIGN KEY (ModuloID) REFERENCES Modulos(ModuloID)
);

CREATE TABLE Instructores (
    InstructorID   INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    Nombre         VARCHAR(25) NOT NULL,
    Experiencia    VARCHAR(15) NOT NULL,
    Correo         VARCHAR(25),
    EspecialidadID INT,
    CONSTRAINT fk_inst_especialidad FOREIGN KEY (EspecialidadID) REFERENCES Especialidades(EspecialidadID)
);

CREATE TABLE Cursos_Instructores (
    Cur_InstID   INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    CursoID      INT,
    InstructorID INT,
    CONSTRAINT fk_ci_curso      FOREIGN KEY (CursoID)      REFERENCES Cursos(CursoID),
    CONSTRAINT fk_ci_instructor FOREIGN KEY (InstructorID) REFERENCES Instructores(InstructorID)
);

-- Agregar columna ModuloID a Estudiantes 
ALTER TABLE Estudiantes
    ADD COLUMN ModuloID INT,
    ADD CONSTRAINT fk_est_modulo FOREIGN KEY (ModuloID) REFERENCES Modulos(ModuloID);

CREATE TABLE Certificaciones (
    CertificacionID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    FechaEval       DATE NOT NULL
);


CREATE TABLE Certificaciones_Evaluaciones (
    Est_CertID      INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    EvaluacionID    INT,
    CertificacionID INT,
    CONSTRAINT fk_ce_evaluacion    FOREIGN KEY (EvaluacionID)    REFERENCES Evaluaciones(EvaluacionID),
    CONSTRAINT fk_ce_certificacion FOREIGN KEY (CertificacionID) REFERENCES Certificaciones(CertificacionID)
);

CREATE TABLE Paises_Estudiantes (
    Pai_EstID    INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    EstudianteID INT,
    PaisesID     INT,
    CONSTRAINT fk_pe_estudiante FOREIGN KEY (EstudianteID) REFERENCES Estudiantes(EstudianteID),
    CONSTRAINT fk_pe_pais       FOREIGN KEY (PaisesID)     REFERENCES Paises(PaisesID)
);


-- ============================================================
-- INSERCION DE DATOS
-- ============================================================

INSERT INTO Categorias (Nombre) VALUES
    ('Desarrollo Web'),
    ('Ciencia de Datos'),
    ('Ciberseguridad');

INSERT INTO Titulos_Cur (Nombre) VALUES
    ('Master en Python'),
    ('Fundamentos SQL'),
    ('Hacking Ético');

INSERT INTO Titulos_Mod (Nombre) VALUES
    ('Sintaxis Básica'),
    ('Estructuras Pro'),
    ('Laboratorio Final');

INSERT INTO Niveles (Nombre) VALUES
    ('Principiante'),
    ('Intermedio'),
    ('Experto');

INSERT INTO Tipos (Nombre) VALUES
    ('Examen Escrito'),
    ('Taller Práctico'),
    ('Proyecto Integrador');

INSERT INTO Paises (Nombre) VALUES
    ('Colombia'),
    ('México'),
    ('España');

INSERT INTO Especialidades (EspecialidadID, Nombre) VALUES
    (1, 'Software'),
    (2, 'Análisis'),
    (3, 'Seguridad');

INSERT INTO Estudiantes (Nombre, Correo, FechaInscripcion) VALUES
    ('Julian Toro',  'julian@edu.com', '2026-01-15'),
    ('Andrea Cano',  'andrea@edu.com', '2026-02-05'),
    ('Jose Miguel',  'jose@edu.com',   '2026-02-20');

INSERT INTO Evaluaciones (Fecha, PuntajeMax, TipoID, EstudianteID) VALUES
    ('2026-02-25', 100, 1, 1),
    ('2026-02-26',  85, 2, 2),
    ('2026-02-27',  40, 3, 3);

INSERT INTO Cursos (Duracion, Descripcion, CategoriaID, TituloID, NivelID, EvaluacionID) VALUES
    (40, 'Desarrollo de Aplicaciones Web',   1, 1, 1, 1),
    (25, 'Análisis de Datos con SQL',        2, 2, 2, 2),
    (80, 'Seguridad en Redes Corporativas',  3, 3, 3, 3);

INSERT INTO Modulos (Orden, Contenido, TituloID) VALUES
    (1, 'Variables y Tipos',   1),
    (2, 'Consultas Complejas', 2),
    (3, 'Pentesting WiFi',     3);

UPDATE Estudiantes SET ModuloID = 1 WHERE EstudianteID = 1;
UPDATE Estudiantes SET ModuloID = 2 WHERE EstudianteID = 2;
UPDATE Estudiantes SET ModuloID = 3 WHERE EstudianteID = 3;

INSERT INTO Instructores (Nombre, Experiencia, Correo, EspecialidadID) VALUES
    ('Jairo Ruiz',  '8 años',  'jairo@inst.com',   1),
    ('Claudia Gil', '4 años',  'claudia@inst.com',  2),
    ('Mateo Lujan', '12 años', 'mateo@inst.com',    3);

INSERT INTO Paises_Estudiantes (EstudianteID, PaisesID) VALUES
    (1, 1), (2, 2), (3, 3);


-- ============================================================
-- ALTER TABLE - MODIFICACIONES DE ESTRUCTURA
-- ============================================================

ALTER TABLE Estudiantes
    MODIFY COLUMN Nombre VARCHAR(60) NOT NULL;

ALTER TABLE Instructores
    MODIFY COLUMN Experiencia VARCHAR(30);

ALTER TABLE Estudiantes
    ADD COLUMN Celular_Acudiente VARCHAR(15);

ALTER TABLE Niveles
    ADD COLUMN Sigla_Nivel VARCHAR(5);

ALTER TABLE Estudiantes
    DROP COLUMN Celular_Acudiente;

ALTER TABLE Niveles
    DROP COLUMN Sigla_Nivel;


-- ============================================================
-- CONSULTAS BASICAS
-- ============================================================

SELECT Nombre, Correo FROM Estudiantes;

SELECT Descripcion, Duracion FROM Cursos;


-- ============================================================
-- DML - MANIPULACION DE REGISTROS
-- ============================================================

INSERT INTO Tipos   (Nombre) VALUES ('Quiz Rápido');
INSERT INTO Paises  (Nombre) VALUES ('Chile');
INSERT INTO Niveles (Nombre) VALUES ('Postgrado');
INSERT INTO Categorias (Nombre) VALUES ('Inteligencia Artificial');

INSERT INTO Estudiantes (Nombre, FechaInscripcion)
    VALUES ('Juanita Marín', '2026-03-05');

INSERT INTO Instructores (Nombre, Experiencia)
    VALUES ('Pedro Parra', '15 años');

UPDATE Estudiantes SET Correo = 'juanita@edu.com'
    WHERE Nombre = 'Juanita Marín';

UPDATE Cursos SET Duracion = 50
    WHERE CursoID = 1;

DELETE FROM Estudiantes
    WHERE Nombre = 'Juanita Marín';

DELETE FROM Categorias
    WHERE Nombre = 'Inteligencia Artificial';


-- ============================================================
-- FILTROS, CLAUSULAS Y OPERADORES
-- ============================================================

SELECT * FROM Evaluaciones WHERE PuntajeMax >= 50;
SELECT * FROM Cursos       WHERE Duracion < 60;
SELECT * FROM Estudiantes  WHERE FechaInscripcion > '2026-01-01';
SELECT * FROM Evaluaciones WHERE PuntajeMax = 40;

SELECT * FROM Estudiantes  WHERE Nombre = 'Julian Toro' AND EstudianteID = 1;
SELECT * FROM Cursos       WHERE CategoriaID = 2 AND Duracion = 25;

SELECT * FROM Paises WHERE Nombre = 'Colombia' OR Nombre = 'México';
SELECT * FROM Tipos  WHERE Nombre = 'Examen Escrito' OR Nombre = 'Proyecto Integrador';

SELECT * FROM Niveles    WHERE Nombre IN ('Principiante', 'Intermedio');
SELECT * FROM Titulos_Cur WHERE Nombre IN ('Master en Python', 'Fundamentos SQL');

SELECT * FROM Paises  WHERE Nombre NOT IN ('España', 'México');
SELECT * FROM Niveles WHERE Nombre NOT IN ('Experto');

SELECT * FROM Estudiantes  WHERE Nombre LIKE 'J%';
SELECT * FROM Instructores WHERE Correo LIKE '%inst.com';

SELECT * FROM Evaluaciones WHERE PuntajeMax BETWEEN 40 AND 90;
SELECT * FROM Cursos       WHERE Duracion   BETWEEN 30 AND 100;

SELECT * FROM Estudiantes  ORDER BY Nombre;
SELECT * FROM Cursos       ORDER BY Duracion;
SELECT * FROM Categorias   ORDER BY Nombre ASC;
SELECT * FROM Paises       ORDER BY Nombre ASC;
SELECT * FROM Estudiantes  ORDER BY FechaInscripcion DESC;
SELECT * FROM Evaluaciones ORDER BY PuntajeMax DESC;

SELECT DISTINCT CategoriaID  FROM Cursos;
SELECT DISTINCT EspecialidadID FROM Instructores;

-- TOP N  →  en MySQL se usa LIMIT
SELECT * FROM Estudiantes  LIMIT 2;
SELECT * FROM Instructores LIMIT 1;
SELECT * FROM Cursos       ORDER BY Duracion DESC LIMIT 2;
SELECT * FROM Evaluaciones ORDER BY PuntajeMax ASC LIMIT 1;


-- ============================================================
-- AGREGACION Y AGRUPAMIENTO
-- ============================================================

SELECT SUM(Duracion)   AS `Total Horas Cursos` FROM Cursos;
SELECT SUM(PuntajeMax) AS `Suma Puntos`        FROM Evaluaciones;
SELECT AVG(PuntajeMax) AS `Promedio General`   FROM Evaluaciones;
SELECT AVG(Duracion)   AS `Promedio Duracion`  FROM Cursos;
SELECT COUNT(*)        AS `Total Estudiantes`  FROM Estudiantes;
SELECT COUNT(InstructorID)                     FROM Instructores;
SELECT MIN(PuntajeMax) AS `Nota Mas Baja`      FROM Evaluaciones;
SELECT MIN(Duracion)                           FROM Cursos;
SELECT MAX(Duracion)   AS `Curso Mas Largo`    FROM Cursos;
SELECT MAX(PuntajeMax)                         FROM Evaluaciones;

SELECT CategoriaID,  SUM(Duracion) FROM Cursos      GROUP BY CategoriaID;
SELECT EspecialidadID, COUNT(*)    FROM Instructores GROUP BY EspecialidadID;

SELECT CategoriaID,   AVG(Duracion) FROM Cursos
    GROUP BY CategoriaID   HAVING AVG(Duracion) > 20;

SELECT EspecialidadID, COUNT(*) FROM Instructores
    GROUP BY EspecialidadID HAVING COUNT(*) >= 1;


-- ============================================================
-- FUNCIONES DE TEXTO Y FECHA
-- ============================================================

-- LEN() → LENGTH() 
SELECT LENGTH(Nombre)   FROM Estudiantes;
SELECT LENGTH(Contenido) FROM Modulos;

SELECT UPPER(Nombre) FROM Instructores;
SELECT UPPER(Nombre) FROM Paises;
SELECT LOWER(Nombre) FROM Estudiantes;
SELECT LOWER(Correo) FROM Instructores;

SELECT CONCAT(Nombre, ' - ', Correo) FROM Estudiantes;
SELECT CONCAT('Experto: ', Nombre)   FROM Instructores;

-- GETDATE() → NOW() 
SELECT NOW() AS `Fecha Servidor`;
SELECT NOW() AS `Control Tiempo`;

-- DATEADD() → DATE_ADD() 
SELECT DATE_ADD('2026-01-01', INTERVAL 15 DAY);
SELECT DATE_ADD(NOW(),        INTERVAL  2 MONTH);

-- DATEDIFF() → en MySQL el orden de parámetros es (fecha_fin, fecha_ini) y siempre retorna días
SELECT DATEDIFF('2026-02-01', '2026-01-01');

-- Para diferencia en años se usa TIMESTAMPDIFF
SELECT TIMESTAMPDIFF(YEAR, '2020-01-01', NOW());


-- ============================================================
-- AUTO_INCREMENT, UNIQUE Y COLUMNAS CALCULADAS
-- ============================================================

-- IDENTITY(1,1) → AUTO_INCREMENT (con AUTO_INCREMENT_INCREMENT si se necesita paso distinto)
CREATE TABLE Reg_Identity   (ID INT AUTO_INCREMENT PRIMARY KEY, Valor VARCHAR(10));

CREATE TABLE Restriccion_U1 (ID INT, Serial   VARCHAR(10) UNIQUE);
CREATE TABLE Restriccion_U2 (ID INT, Nickname VARCHAR(25) UNIQUE);

-- Columnas calculadas: en MySQL se usa GENERATED ALWAYS AS (expresión) VIRTUAL/STORED
CREATE TABLE Factura_Simulada (
    Base INT,
    Iva  DECIMAL(10,2) GENERATED ALWAYS AS (Base * 0.19) VIRTUAL
);

CREATE TABLE Prestamo (
    Monto    DECIMAL(15,2),
    Interes  DECIMAL(15,2) GENERATED ALWAYS AS (Monto * 0.05) VIRTUAL
);


-- ============================================================
-- JOINS Y SUBCONSULTAS
-- ============================================================

SELECT * FROM Estudiantes CROSS JOIN Paises;
SELECT * FROM Categorias  CROSS JOIN Niveles;

SELECT * FROM Estudiantes
    LEFT JOIN Modulos ON Estudiantes.ModuloID = Modulos.ModuloID
UNION
SELECT * FROM Estudiantes
    RIGHT JOIN Modulos ON Estudiantes.ModuloID = Modulos.ModuloID;
-- Nota: MySQL no tiene FULL OUTER JOIN nativo; se simula con UNION de LEFT y RIGHT JOIN.

SELECT * FROM Cursos
    LEFT JOIN Evaluaciones ON Cursos.EvaluacionID = Evaluaciones.EvaluacionID
UNION
SELECT * FROM Cursos
    RIGHT JOIN Evaluaciones ON Cursos.EvaluacionID = Evaluaciones.EvaluacionID;

SELECT * FROM Estudiantes
    LEFT JOIN Paises_Estudiantes ON Estudiantes.EstudianteID = Paises_Estudiantes.EstudianteID;

SELECT * FROM Cursos
    LEFT JOIN Cursos_Modulos ON Cursos.CursoID = Cursos_Modulos.CursoID;

SELECT * FROM Instructores
    RIGHT JOIN Cursos_Instructores ON Instructores.InstructorID = Cursos_Instructores.InstructorID;

SELECT * FROM Modulos
    RIGHT JOIN Cursos_Modulos ON Modulos.ModuloID = Cursos_Modulos.ModuloID;

SELECT Estudiantes.Nombre, Evaluaciones.PuntajeMax
    FROM Estudiantes
    INNER JOIN Evaluaciones ON Estudiantes.EstudianteID = Evaluaciones.EstudianteID;

SELECT Cursos.Descripcion, Categorias.Nombre
    FROM Cursos
    INNER JOIN Categorias ON Cursos.CategoriaID = Categorias.CategoriaID;

SELECT Nombre FROM Estudiantes
    WHERE EstudianteID IN (
        SELECT EstudianteID FROM Evaluaciones WHERE PuntajeMax < 50
    );

SELECT Descripcion FROM Cursos
    WHERE CategoriaID = (
        SELECT CategoriaID FROM Categorias WHERE Nombre = 'Desarrollo Web'
    );


-- ============================================================
-- VISTAS E INDICES
-- ============================================================

CREATE OR REPLACE VIEW v_Info_Estudiantes AS
    SELECT Nombre, Correo FROM Estudiantes;

CREATE OR REPLACE VIEW v_Cursos_Expertos AS
    SELECT * FROM Cursos WHERE Duracion > 50;

CREATE INDEX IDX_Nom_Est ON Estudiantes(Nombre);
CREATE INDEX IDX_Dur_Cur ON Cursos(Duracion);


-- ============================================================
-- PROCEDIMIENTOS ALMACENADOS
-- ============================================================

DELIMITER $$

CREATE PROCEDURE sp_ListaInstructores()
BEGIN
    SELECT * FROM Instructores;
END$$

CREATE PROCEDURE sp_AddPais(IN NomP VARCHAR(25))
BEGIN
    INSERT INTO Paises (Nombre) VALUES (NomP);
END$$

DELIMITER ;


-- ============================================================
-- FUNCIONES DEFINIDAS POR EL USUARIO
-- ============================================================

DELIMITER $$

CREATE FUNCTION fn_CalcularNeto(Valor DECIMAL(15,2))
RETURNS DECIMAL(15,2)
DETERMINISTIC
BEGIN
    RETURN Valor * 0.80;
END$$

CREATE FUNCTION fn_ContarLetras(Palabra VARCHAR(50))
RETURNS INT
DETERMINISTIC
BEGIN
    RETURN LENGTH(Palabra);
END$$

DELIMITER ;


-- ============================================================
-- TRIGGERS
-- ============================================================

DELIMITER $$

CREATE TRIGGER trg_Aviso_Estudiante
AFTER INSERT ON Estudiantes
FOR EACH ROW
BEGIN
    -- En MySQL no existe PRINT; se puede insertar en una tabla de log o usar SIGNAL
    SIGNAL SQLSTATE '01000' SET MESSAGE_TEXT = 'Log: Registro de estudiante exitoso';
END$$

CREATE TRIGGER trg_Aviso_Cursos
AFTER UPDATE ON Cursos
FOR EACH ROW
BEGIN
    SIGNAL SQLSTATE '01000' SET MESSAGE_TEXT = 'Log: Curso modificado';
END$$

DELIMITER ;
