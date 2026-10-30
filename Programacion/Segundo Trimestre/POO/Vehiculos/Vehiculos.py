#Clase Vehiculos, clase base para los tipos de vehiculos
class Vehiculos:
    #Metodo constructor de la clase Vehiculos
    def __init__(self,marca, modelo, precio_alquiler):
        if precio_alquiler < 0:
            raise ValueError("El precio de alquiler no puede ser negativo.")
        self.marca = marca
        self.modelo = modelo
        self.precio_alquiler = precio_alquiler
        self.disposible = True
    #Metodo para mostrar la informacion del vehiculo
    def mostrar_informacion(self):
        return f"El Vehiculo con marca {self.marca} de modelo {self.modelo}, tiene un precio de alquiler de {self.precio_alquiler} y se encuentra en estado {self.disposible} para la disposicion"
    
    def alquilar(self):
        if not self.disposible:
            raise Exception(f"El vehiculo de marca {self.marca} y modelo {self.modelo} ya esta alquilado.")
        self.disposible = False
        return "Vehiculo alquilado con exito"
    
    def devolver(self):
        if not self.disposible:
            self.disposible = True
            return f"El vehiculo {self.marca} ha sido devuelto de manera correcta"
        self.devolver = True
        return f"Devolucion del vehiculo {self.marca} del modelo {self.modelo} ha sido devuelto correctamente "
    def __str__(self):
        pass
    