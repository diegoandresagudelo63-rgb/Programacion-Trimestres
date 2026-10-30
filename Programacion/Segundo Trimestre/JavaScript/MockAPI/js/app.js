const URL = "https://69dc4e2884f912a264038ac7.mockapi.io/Estados";

//  GET
async function obtenerProductos() {
  const res = await fetch(URL);
  const data = await res.json();
  document.getElementById("resultado").textContent = JSON.stringify(data, null, 2);
}

//  POST
async function crearProducto() {
  const producto = {
    referencia: "00" + Math.floor(Math.random() * 100),
    nombre: "Producto nuevo",
    precio: 10000,
    stock: 5,
    estado: true
  };

  await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(producto)
  });

  alert("Producto creado");
  obtenerProductos();
}

//  PUT
async function actualizarProducto() {
  const id = document.getElementById("idActualizar").value;

  const producto = {
    nombre: "Producto actualizado",
    precio: 9999,
    stock: 20,
    estado: true
  };

  await fetch(`${URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(producto)
  });

  alert("Producto actualizado");
  obtenerProductos();
}

//  DELETE
async function eliminarProducto() {
  const id = document.getElementById("idEliminar").value;

  await fetch(`${URL}/${id}`, {
    method: "DELETE"
  });

  alert("Producto eliminado");
  obtenerProductos();
}