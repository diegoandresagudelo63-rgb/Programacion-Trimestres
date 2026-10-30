from Vehiculos import Vehiculos
#Clase Moto, con herencia de la clase Vehiculos
class Moto(Vehiculos):
    #Metodo constructor de la clase Moto
    def __init__(self,marca, modelo, precio_alquiler,cilidrada):
        super().__init__(marca,modelo,precio_alquiler)
        self.cilidrada = cilidrada

    #Metodo para mostrar la informacion de la Moto, con herencia de la clase Vehiculos
    def mostrar_informacion(self):
        return super().mostrar_informacion() + f" con una cilindrada de {self.cilidrada} cc."
    def __str__(self):
        pass     