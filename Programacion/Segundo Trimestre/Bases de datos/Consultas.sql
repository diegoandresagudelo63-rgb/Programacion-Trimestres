
-- 1. Todos los estudiantes con su país y módulo actual
SELECT 
    e.EstudianteID,
    e.Nombre AS Estudiante,
    e.Correo,
    e.FechaInscripcion,
    p.Nombre AS Pais,
    m.Contenido AS ModuloActual
FROM dbo.Estudiantes e
INNER JOIN dbo.Paises_Estudiantes pe ON e.EstudianteID = pe.EstudianteID
INNER JOIN dbo.Paises p ON pe.PaisesID = p.PaisesID
INNER JOIN dbo.Modulos m ON e.ModuloID = m.ModuloID;
 
 

-- 2. Cursos con su categoría, nivel, título e instructor asignado

SELECT 
    c.CursoID,
    c.Descripcion AS Curso,
    c.Duracion,
    cat.Nombre AS Categoria,
    n.Nombre AS Nivel,
    tc.Nombre AS TituloCurso,
    i.Nombre AS Instructor
FROM dbo.Cursos c
INNER JOIN dbo.Categorias cat ON c.CategoriaID = cat.CategoriaID
INNER JOIN dbo.Niveles n ON c.NivelID = n.NivelID
INNER JOIN dbo.Titulos_Cur tc ON c.TituloID = tc.Titulo_CurID
INNER JOIN dbo.Cursos_Instructores ci ON c.CursoID = ci.CursoID
INNER JOIN dbo.Instructores i ON ci.InstructorID = i.InstructorID;
 
 

-- 3. Evaluaciones con el tipo, puntaje y estudiante que las realizó

SELECT 
    ev.EvaluacionID,
    ev.Fecha,
    ev.PuntajeMax,
    t.Nombre AS TipoEvaluacion,
    e.Nombre AS Estudiante
FROM dbo.Evaluaciones ev
INNER JOIN dbo.Tipos t ON ev.TipoID = t.TipoID
INNER JOIN dbo.Estudiantes e ON ev.EstudianteID = e.EstudianteID;
 
 

-- 4. Módulos de cada curso con su título de módulo

SELECT 
    c.Descripcion AS Curso,
    m.Orden,
    m.Contenido AS Modulo,
    tm.Nombre AS TituloModulo
FROM dbo.Cursos_Modulos cm
INNER JOIN dbo.Cursos c ON cm.CursoID = c.CursoID
INNER JOIN dbo.Modulos m ON cm.ModuloID = m.ModuloID
INNER JOIN dbo.Titulos_Mod tm ON m.TituloID = tm.Titulo_ModID
ORDER BY c.CursoID, m.Orden;
 
 

-- 5. Instructores con su especialidad y los cursos que dictan

SELECT 
    i.Nombre AS Instructor,
    i.Experiencia,
    i.Correo,
    esp.Nombre AS Especialidad,
    c.Descripcion AS CursoAsignado
FROM dbo.Instructores i
INNER JOIN dbo.Especialidades esp ON i.EspecialidadID = esp.EspecialidadID
INNER JOIN dbo.Cursos_Instructores ci ON i.InstructorID = ci.InstructorID
INNER JOIN dbo.Cursos c ON ci.CursoID = c.CursoID;
 
 

-- 6. Certificaciones con la evaluación y estudiante asociado

SELECT 
    cert.CertificacionID,
    cert.FechaEval AS FechaCertificacion,
    ev.Fecha AS FechaEvaluacion,
    ev.PuntajeMax,
    e.Nombre AS Estudiante
FROM dbo.Certificacioes_Evaluaciones ce
INNER JOIN dbo.Certificaciones cert ON ce.CertificacionID = cert.CertificacionID
INNER JOIN dbo.Evaluaciones ev ON ce.EvaluacionID = ev.EvaluacionID
INNER JOIN dbo.Estudiantes e ON ev.EstudianteID = e.EstudianteID;
 
 

--   SUBCONSULTAS
 

-- 7. Estudiantes que tienen un puntaje mayor al promedio de todas las evaluaciones

SELECT 
    e.Nombre AS Estudiante,
    ev.PuntajeMax,
    ev.Fecha
FROM dbo.Estudiantes e
INNER JOIN dbo.Evaluaciones ev ON e.EstudianteID = ev.EstudianteID
WHERE ev.PuntajeMax > (
    SELECT AVG(PuntajeMax) 
    FROM dbo.Evaluaciones
);
 
 
-- 8. Cursos cuya duración es mayor a la duración promedio de todos los cursos
SELECT 
    CursoID,
    Descripcion,
    Duracion
FROM dbo.Cursos
WHERE Duracion > (
    SELECT AVG(Duracion) 
    FROM dbo.Cursos
);
 
 

-- 9. Estudiantes inscritos en el módulo del curso más largo

SELECT 
    e.Nombre AS Estudiante,
    e.FechaInscripcion,
    m.Contenido AS Modulo
FROM dbo.Estudiantes e
INNER JOIN dbo.Modulos m ON e.ModuloID = m.ModuloID
WHERE e.ModuloID IN (
    SELECT cm.ModuloID
    FROM dbo.Cursos_Modulos cm
    INNER JOIN dbo.Cursos c ON cm.CursoID = c.CursoID
    WHERE c.Duracion = (
        SELECT MAX(Duracion) 
        FROM dbo.Cursos
    )
);
 
 

-- 10. Instructores que dictan cursos de nivel "Avanzado"

SELECT 
    i.Nombre AS Instructor,
    i.Experiencia,
    i.Correo
FROM dbo.Instructores i
WHERE i.InstructorID IN (
    SELECT ci.InstructorID
    FROM dbo.Cursos_Instructores ci
    INNER JOIN dbo.Cursos c ON ci.CursoID = c.CursoID
    WHERE c.NivelID = (
        SELECT NivelID 
        FROM dbo.Niveles 
        WHERE Nombre = 'Avanzado'
    )
);
 
 

-- 11. Estudiantes que ya obtuvieron una certificación

SELECT 
    e.Nombre AS Estudiante,
    e.Correo,
    e.FechaInscripcion
FROM dbo.Estudiantes e
WHERE e.EstudianteID IN (
    SELECT ev.EstudianteID
    FROM dbo.Evaluaciones ev
    WHERE ev.EvaluacionID IN (
        SELECT ce.EvaluacionID
        FROM dbo.Certificacioes_Evaluaciones ce
    )
);
 
 

-- 12. Cursos que pertenecen a la categoría con más cursos registrados

SELECT 
    c.Descripcion AS Curso,
    c.Duracion,
    cat.Nombre AS Categoria
FROM dbo.Cursos c
INNER JOIN dbo.Categorias cat ON c.CategoriaID = cat.CategoriaID
WHERE c.CategoriaID = (
    SELECT TOP 1 CategoriaID
    FROM dbo.Cursos
    GROUP BY CategoriaID
    ORDER BY COUNT(*) DESC
);
