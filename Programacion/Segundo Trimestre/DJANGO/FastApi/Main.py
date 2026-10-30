from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional ## permite definir tipos de datos opcionales, ejemplo: Optional{str}
# Crea una instancia de la aplicacion FastAPI.
app = FastAPI()
# Esta es la respuesta que vera el usuario.

## Importar BaseModel de pydantic para definir modelos de datos

class Producto(BaseModel):
    nombre: str
    costo: float
    categoria: str
    stock: int 
    peso: float 
    precio_venta: float

#Base de datos en memoria
productos_db = {
    1: Producto(
            nombre="Laptop Lenovo",
            costo=1200,
            categoria="Tecnologia",
            stock=10,
            peso=1.5,
            precio_venta=1500.00
        ),
    2: Producto(
            nombre="Mouse Logitech",
            costo=50.00,
            categoria="Accesorios",
            stock=100,
            peso=0.2,
            precio_venta=80.00
        )
}
    
#http:// 127.0.0.1:8000/
@app.get("/") #Al ejecutar este endpoint se ejecuta la funcion read_index

def read_index ():
    return {"message": "esta es mi primera aplicacion con FastAPI"}

@app.get("/productos/{id}") #Al ejecutar este endpoint se ejecuta la funcion mostrar_producto
def mostrar_producto(id:int):
    return {"data": id}

@app.post("/productos/") ##Al ejecutar este endpoint se ejecuta la funcion crear_producto
def crear_producto(producto: Producto): ## El parametro producto es de tipo Producto, que es el modelo de datos definido anteriormente
    # return {"data": producto} ## Devuelve el producto creado en formato JSON
    return {"message": f"El producto {Producto.nombre} fue creado exitosamente", "data": producto } ## Devuelve un mensaje de confirmacion con el nombre del producto creado


#Eliminar un producto
@app.delete("/productos/{id}") ## Al ejecutar este endpoint se ejecuta la funcion eliminar_producto
def eliminar_producto(id: int): ## El parametro id es de tipo int, que es el identificador del producto a eliminar
    if id not in productos_db: ## Verifica si el id del producto existe en la base de datos
        raise HTTPException(status_code=404, detail="Producto no encontrado") ## Si el producto no existe, devuelve un error 404
    
    producto_eliminado = productos_db.pop(id) ## Elimina el producto de la base de datos y lo guarda en la variable producto_eliminado
    return {
        "message": f"El producto {producto_eliminado.nombre} fue eliminado exitosamente", ## Devuelve un mensaje de confirmacion con el nombre del producto eliminado
        "id": id
    }

@app.get("/productos")
def listar_productos():
    return {"data": productos_db}