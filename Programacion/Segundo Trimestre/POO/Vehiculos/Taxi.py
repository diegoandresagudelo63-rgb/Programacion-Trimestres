from Vehiculos import Vehiculos
#Clase Taxi, con herencia de la clase Vehiculos
class Taxi(Vehiculos):
    #Metodo constructor de la clase Taxi
    def __init__(self,marca, modelo, precio_alquiler,precio_km,km):
        super().__init__(marca,modelo,precio_alquiler)
        self.precio_km = precio_km
        self.km = km
        self.total_km = 0

    #Metodo para calcular la tarifa del Taxi, con herencia de la clase Vehiculos
    def calcular_tarifa(self):
        if self.km < 0 or self.precio_km < 0:
            raise ValueError("Los kilómetros recorridos o el precio por km no pueden ser negativos.") 
        self.total_km = self.precio_km * self.km
        return self.total_km
    
    def mostrar_informacion(self):
        return super().mostrar_informacion() + f" con un precio por km de {self.precio_km} y un total de km recorridos de {self.km} km."
    
    def devolver(self):
        if not self.disposible:
            self.disposible = True
            self.km = 0
            return f"El vehiculo {self.marca} ha sido devuelto de manera correcta Los Km se han reiniciado a {self.km}"
        return f"Devolucion del vehiculo {self.marca} del modelo {self.modelo} ha sido devuelto correctamente "
    
    def __str__(self):
        pass
    