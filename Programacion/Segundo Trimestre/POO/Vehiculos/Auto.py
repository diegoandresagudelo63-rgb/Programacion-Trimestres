from Vehiculos import Vehiculos
class Auto(Vehiculos):
    #Metodo constructor de la clase Auto, con herencia de la clase Vehiculos
    def __init__(self, marca, modelo, precio_alquiler, Num_puertas):
        super().__init__(marca, modelo, precio_alquiler)
        self.Num_puertas = Num_puertas

    #Metodo para mostrar la informacion del Auto, con herencia de la clase Vehiculos
    def mostrar_informacion(self):
        return super().mostrar_informacion() + f" El auto tiene {self.Num_puertas} puertas."
    def __str__(self):
        pass