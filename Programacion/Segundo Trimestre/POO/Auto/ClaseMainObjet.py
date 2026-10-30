from carro import carro
from Tesla import CarroElectrico

#Crear carro normal a gasolina.
carro_gasolina = carro("mazda", "rojo", 180)

#Probamos los metodos del carro
print(carro_gasolina.encender())
print(carro_gasolina.acelerar(60))
print(carro_gasolina.frenar())
print(carro_gasolina, "\n")  #Impresion del objeto usando __str__

#Creamos un carro electrico (heredamos de carro)
carro_electrico = CarroElectrico("Tesla", "Negro", 250, 100)

#Probamos sus metodos personalizados.
print(carro_electrico.encender())
print(carro_electrico.acelerar(100))
print(carro_electrico.acelerar(200)) # Limita velocidad + consumo bateria
print(carro_electrico.frenar())
print(carro_electrico)