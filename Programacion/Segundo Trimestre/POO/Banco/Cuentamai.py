#importar la clase de los procedimientos 
from Caje import CuentaCorriente

def main():

    #creamos dos cuentas corriente con titulares y saldos iniciales

    cuenta1 = CuentaCorriente("Shakira Goza", 5000)
    cuenta2 = CuentaCorriente("Jenny rivera", 25000)
    
    #le pasamos los datos de cada cuenta por paramretos 

    CuentaCorriente.transferencia(cuenta1, cuenta2, 5000)
    #mostrar todos los datos 
    print(cuenta1.get_datos_cuenta())
    print(cuenta2.get_datos_cuenta())

#el metodo get_datos_cuenta retornar una cadena con el nombre del titular, numero de ceunta y 
#saldo pero no modifica nada 
if __name__ =="__main__":
    main()