
from lavadora_estandar    import LavadoraEstandar
from lavadora_inteligente import LavadoraInteligente


class SistemaLavaSmart:
    # Clase principal que coordina todo el sistema.

    def __init__(self):
        self.clientes_atendidos = 0
        self.total_facturado    = 0
        self.total_iva          = 0
        self.total_utilidad     = 0
        self.total_energia      = 0
        self.registros          = []   # lista con resumen de cada cliente

    def pedir_estrato(self):
        # Pide y valida el estrato del cliente.
        estratos_validos = [2, 3, 4, 5]
        while True:
            try:
                estrato = int(input("Ingrese el estrato (2, 3, 4 o 5): "))
                if estrato in estratos_validos:
                    return estrato
                print("  Estrato no válido.")
            except ValueError:
                print("  Ingrese un número.")
            except EOFError:
                print("\n  Accion Invalida.")

    def pedir_tipo_lavadora(self):
        # Pregunta qué tipo de lavadora desea usar.
        print("\nTipo de lavadora:")
        print("  1. Estándar")
        print("  2. Inteligente")

        while True:
            try:
                opcion = input("Seleccione (1 o 2): ").strip()
                if opcion in ("1", "2"):
                    return opcion
                print("  Opción inválida.")
            except EOFError:
                print("\n  No se puede hacer eso.")

    def atender_cliente(self):
        # Recoge datos, crea la lavadora correcta y ejecuta el ciclo.
        while True:
            try:
                nombre  = input("\nNombre del cliente: ").strip() or "Cliente"

                if nombre == "":
                    nombre = "Cliente"
                    break

                if nombre.replace(" ", "").isalpha():
                    break

                print("  El nombre solo debe contener letras.")

            except EOFError:
                print("\n  Coloque un nombre valido.")

        estrato = self.pedir_estrato()
        tipo    = self.pedir_tipo_lavadora()    

        # Polimorfismo: se crea el objeto según el tipo elegido
        if tipo == "1":
            lavadora = LavadoraEstandar(nombre, estrato)
        else:
            lavadora = LavadoraInteligente(nombre, estrato)

        # Ejecutar ciclo y guardar los resultados
        resultado = lavadora.ciclo_terminado()

        self.clientes_atendidos += 1
        self.total_facturado    += resultado["total"]
        self.total_iva          += resultado["iva"]
        self.total_utilidad     += resultado["utilidad"]
        self.total_energia      += resultado["energia"]
        self.registros.append({"cliente": nombre, "total": resultado["total"]})

    def reporte_administrador(self):
        # Muestra el resumen para el dueño del negocio.
        print("\n" + "=" * 50)
        print("     REPORTE DEL ADMINISTRADOR - LAVA SMART")
        print("=" * 50)
        print(f"  Clientes atendidos  : {self.clientes_atendidos}")
        print(f"  Total facturado     : ${self.total_facturado:>10,.0f}")
        print(f"  IVA cobrado         : ${self.total_iva:>10,.0f}")
        print(f"  Ganancia neta (30%) : ${self.total_utilidad:>10,.0f}")
        print(f"  Costo energía total : ${self.total_energia:>10,.1f}")
        print("-" * 50)
        print("  Detalle por cliente:")
        for r in self.registros:
            print(f"    {r['cliente']:20s}  ${r['total']:>10,.0f}")
        print("=" * 50)

    def ejecutar(self):
        # Bucle principal con el menú.
        print("\n" + "=" * 50)
        print("       SISTEMA LAVA SMART")
        print("=" * 50)

        while True:
            try:
                print("\nMENU PRINCIPAL")
                print("  1. Atender cliente")
                print("  2. Ver reporte del administrador")
                print("  3. Salir")

            
                opcion = input("Seleccione una opción: ").strip()

                if opcion == "1":
                    self.atender_cliente()
                elif opcion == "2":
                    if self.clientes_atendidos == 0:
                        print("  Aún no se han atendido clientes.")
                    else:
                        self.reporte_administrador()
                elif opcion == "3":
                    print("\nHasta pronto. Gracias por usar Lava Smart!\n")
                    break
                else:
                    print("  Opción inválida.")
            except EOFError:
                print("\n  No se puede hacer eso.")


# Punto de entrada
if __name__ == "__main__":
    sistema = SistemaLavaSmart()
    sistema.ejecutar()
