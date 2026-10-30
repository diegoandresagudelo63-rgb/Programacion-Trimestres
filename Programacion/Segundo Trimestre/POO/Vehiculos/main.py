from Vehiculos import Vehiculos
from Auto import Auto
from Taxi import Taxi
from Moto import Moto

def ejecutar_sistema():
    print("//--- Sitema de Alquiler de Vehiculos ---//")
    #Creamos el vehiculo.
    Vehiculos = Vehiculos("Mclaren", "Spider66", 500000)
    #Ponemos los metodos del vehiculo
    print(Vehiculos.mostrar_informacion())
    print(Vehiculos.alquilar())
    print(Vehiculos.devolver())
    print(Vehiculos.mostrar_informacion())
    print("//------------------------------------------------------------------//")

    print("//--------------------------------------------------------------------//")
    #Creamos el Auto.
    Auto = Auto("Lamborghini", "Veneno", 450000, 2)
    #Ponemos los metodos
    print(Auto.mostrar_informacion())
    print(Auto.alquilar())
    print(Auto.devolver())
    print(Auto.mostrar_informacion())
    print("//--------------------------------------------------------------------//")

    print("//--------------------------------------------------------------------//")
    #Creamos el Taxi.
    Taxi = Taxi("Renault", "Logan", 50000, 1000, 25)    
    #Ponemos los metodos
    print(Taxi.mostrar_informacion())
    print(Taxi.alquilar())
    print(Taxi.calcular_tarifa())
    print(Taxi.devolver())
    print(Taxi.mostrar_informacion())
    print("//--------------------------------------------------------------------//")

    print("//--------------------------------------------------------------------//")
    #Creamos la Moto.
    Moto = Moto("Yamaha", "R1", 200000, 1000)
    #Ponemos los metodos
    print(Moto.mostrar_informacion())
    print(Moto.alquilar())
    print(Moto.devolver())
    print(Moto.mostrar_informacion())
    print("//--------------------------------------------------------------------//")

#Creamos el vehiculo.
Vehiculos = Vehiculos("Mclaren", "Spider66", 500000)
#Ponemos los metodos del vehiculo
print(Vehiculos.mostrar_informacion())
print(Vehiculos.alquilar())
print(Vehiculos.devolver())
print(Vehiculos.mostrar_informacion())
print("//------------------------------------------------------------------//")

print("//--------------------------------------------------------------------//")
#Creamos el Auto.
Auto = Auto("Lamborghini", "Veneno", 450000, 2)
#Ponemos los metodos
print(Auto.mostrar_informacion())
print(Auto.alquilar())
print(Auto.devolver())
print(Auto.mostrar_informacion())
print("//--------------------------------------------------------------------//")

print("//--------------------------------------------------------------------//")
#Creamos el Taxi.
Taxi = Taxi("Renault", "Logan", 50000, 1000, 25)    
#Ponemos los metodos
print(Taxi.mostrar_informacion())
print(Taxi.alquilar())
print(Taxi.calcular_tarifa())
print(Taxi.devolver())
print(Taxi.mostrar_informacion())
print("//--------------------------------------------------------------------//")

print("//--------------------------------------------------------------------//")
#Creamos la Moto.
Moto = Moto("Yamaha", "R1", 200000, 1000)
#Ponemos los metodos
print(Moto.mostrar_informacion())
print(Moto.alquilar())
print(Moto.devolver())
print(Moto.mostrar_informacion())
print("//--------------------------------------------------------------------//")