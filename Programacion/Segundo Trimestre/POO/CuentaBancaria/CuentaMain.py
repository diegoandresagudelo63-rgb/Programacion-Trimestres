#De archivo Cajero Importar la clase Cajero
from Cajero import CuentaCorriente

def main():
    # Creamos dos cuentas corrientes con titulares y saldos iniciales.
    cuenta1 = CuentaCorriente("Goza Bueno", 5000, 123456789)
    cuenta2 = CuentaCorriente("Mariana Pajon", 25000, 987654321)

    # Le pasamos los datos de cada cuenta por parametro, de una sacamos y llevamos a otra

    CuentaCorriente.transferencia(cuenta1, cuenta2, 5000)

    # Pedimos los datos de cada cuenta para ver el saldo.
    print(cuenta1.get_datos_cuenta())
    print(cuenta2.get_datos_cuenta())

    # El metodo get_datos_cuenta retorna una cadena con el nombre del titular, numero de cuenta y saldo, pero no modifica nada, por eso no es un SETTER

    if __name__ == "__main__":
        main()



        