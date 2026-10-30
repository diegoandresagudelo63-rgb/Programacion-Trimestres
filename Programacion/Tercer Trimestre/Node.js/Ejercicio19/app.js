const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'))

app.listen(8888, () => {
  console.log('Servidor web iniciado')
})

