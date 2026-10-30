// Importar módulos
const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')

// Librerías externas
const { formidable } = require('formidable')
const mysql = require('mysql2')


// CONEXIÓN MYSQL


// Conexión a la base de datos
const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'archivosdb'
})

// Verificar conexión
conexion.connect(error => {

  if (error) {
    console.log('Error MySQL:', error)
  } else {
    console.log('Conectado a MySQL')
  }
})


// TIPOS MIME


// Tipos de archivos permitidos
const mime = {

  html: 'text/html',
  css: 'text/css',

  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',

  pdf: 'application/pdf',

  mp3: 'audio/mpeg',
  mp4: 'video/mp4',

  ico: 'image/x-icon'

}


// SERVIDOR

// Crear servidor
const servidor = http.createServer((pedido, respuesta) => {

  // Obtener URL
  const url = new URL(
    'http://localhost:8888' + pedido.url
  )

  // Ruta del archivo
  let camino = 'public' + url.pathname

  // Página principal
  if (camino === 'public/') {
    camino = 'public/index.html'
  }

  console.log('Ruta:', camino)

  // Enviar a función principal
  encaminar(pedido, respuesta, camino)

})

// Iniciar servidor
servidor.listen(8888, () => {
  console.log('Servidor iniciado en puerto 8888')
})

/*
ENCAMINAR PETICIONES
*/

function encaminar(pedido, respuesta, camino) {

  switch (camino) {

    // Subir productos
    case 'public/subir': {
      subir(pedido, respuesta)
      break
    }

    // Mostrar productos
    case 'public/listado': {
      listar(respuesta)
      break
    }

    // Archivos estáticos
    default: {

      fs.stat(camino, error => {

        // Si existe el archivo
        if (!error) {
          fs.readFile(camino, (error, contenido) => {

            if (error) {

              respuesta.writeHead(500, {
                'Content-Type': 'text/plain'
              })

              respuesta.write('Error interno')
              respuesta.end()

            } else {

              // Obtener extensión
              const extension =
                path.extname(camino)
                  .substring(1)
                  .toLowerCase()

              // Obtener tipo MIME
              const tipo =
                mime[extension] || 'appli ation/octet-stream'

              // Respuesta correcta
              respuesta.writeHead(200, {
                'Content-Type': tipo
              })

              respuesta.write(contenido)
              respuesta.end()

            }

          })

        } else {

          // Error 404
          respuesta.writeHead(404, {
            'Content-Type': 'text/html'
          })

          respuesta.write(`
            <h1>404 - Archivo no encontrado</h1>
          `)

          respuesta.end()

        }

      })

    }

  }

}

/*
SUBIR PRODUCTO
*/

function subir(pedido, respuesta) {

  // Crear formulario
  const form = formidable({
    multiples: false
  })

  // Leer datos
  form.parse(pedido, (err, fields, files) => {

    if (err) {
      console.log(err)
      respuesta.write('Error formulario')
      respuesta.end()
      return
    }

    // Obtener datos del formulario
    const nombreProducto =
      fields.nombre[0]

    const precioProducto =
      fields.precio[0]

    // Obtener archivo
    const archivo =
      files.archivo[0]

    // Nuevo nombre para la imagen
    const nombreNuevo =
      Date.now() +
      '-' +
      archivo.originalFilename.replace(/\s/g, '_')

    // Ruta temporal
    const rutaTemporal =
      archivo.filepath

    // Nueva ruta
    const nuevoPath =
      './public/upload/' + nombreNuevo

    // Mover imagen
    fs.rename(
      rutaTemporal,
      nuevoPath,
      error => {

        if (error) {
          console.log(error)
          respuesta.write('Error moviendo archivo')
          respuesta.end()
          return
        }

        // Consulta SQL
        const sql = `
          INSERT INTO archivos
          (nombre, precio, imagen)
          VALUES (?, ?, ?)
        `

        // Guardar producto
        conexion.query(
          sql,
          [
            nombreProducto,
            precioProducto,
            nombreNuevo
          ],
          error => {

            if (error) {
              console.log(error)
              respuesta.write('Error MySQL')
              respuesta.end()
              return
            }

            // Respuesta exitosa
            respuesta.writeHead(200, {
              'Content-Type': 'text/html'
            })

            respuesta.write(`
              <h1>
                Producto guardado
              </h1>

              <a href="/">
                Volver
              </a>
            `)
            respuesta.end()
          }
        )
      }
    )
  })
}

/*
prodctos listados
*/

function listar(respuesta) {

  // Obtener productos
  conexion.query(
    'SELECT * FROM archivos',
    (error, resultados) => {

      if (error) {
        console.log(error)
        respuesta.write('Error MySQL')
        respuesta.end()
        return
      }

      let productos = ''

      // Recorrer productos
      resultados.forEach(producto => {
        productos += `
          <div style="
            width:300px;
            border:1px solid gray;
            padding:15px;
            margin:20px;
            border-radius:10px;
            display:inline-block;
            text-align:center;
          ">

            <!-- Imagen -->
            <img
              src="/upload/${producto.imagen}"
              width="250"
              height="250"
              style="object-fit:cover;"
            >

            <!-- Nombre -->
            <h2>
              ${producto.nombre}
            </h2>

            <!-- Precio -->
            <h3>
              $ ${producto.precio}
            </h3>

          </div>
        `
      })

      // Mostrar página
      respuesta.writeHead(200, {
        'Content-Type': 'text/html'
      })

      respuesta.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>
            Productos
          </title>
        </head>
        <body>
          <h1>
            Productos
          </h1>
          ${productos}
          <br><br>
          <a href="/">
            Volver
          </a>
        </body>
        </html>
      `)
      respuesta.end()
    }
  )
}