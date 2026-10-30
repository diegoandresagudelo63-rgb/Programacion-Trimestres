import random

class CuentaCorriente:

    def __init__(self, nombre_titular: str, saldo: float, numero_cuenta: int):
        self.saldo = saldo
        self.nombre_titular = nombre_titular
        self.numero_cuenta = abs(random.randint(0, 10**9))

    #El metodo set_ingreso y set_retiro modifican el saldo, por eso son SETTERS
    # pero no retonarnan nada

    def set_ingreso(self, ingreso: float):
        if ingreso <= 0:
            print("No se permiten ingresos negativos.")
        else:
            self.saldo += ingreso
            print("Transferencia Exitosa.")

    def set_retiro(self, retiro: float):
        if retiro > self.saldo:
            print("Fondos Insuficientes para retirar.")
        else:
            self.saldo -= retiro
            print("Retiro Exitoso.")

    # Retornar el saldo actual de la cuenta, pero no lo modifica, por eso no es un SETTER.


    def get_saldo(self) -> str:
        return f"El saldo de la cuenta es: {self.saldo}"


    #El Metodo transferencia es estatico porque no depende de una instancia especifica, sino que opera sobre dos instancias pasadas como parametros. No retorna nada, solo realiza la accion de transferir fondos entre las cuentas.

    @staticmethod
    def transferencia(titular1, titular2, cantidad: float):
        if cantidad > titular1.saldo:
            print("Fondos insuficientes para la transferencia.")
        else:
            titular2.saldo += cantidad
            titular1.saldo -= cantidad
            print("Transferencia Exitosa.")
        
    def get_datos_cuenta(self) -> str:
        return f"Titular: {self.nombre_titular}\nNo cuenta: {self.numero_cuenta}\nSaldo: {self.saldo}"