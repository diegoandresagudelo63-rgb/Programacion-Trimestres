
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet

import winsound
import os
import time
from datetime import datetime
from abc import ABC, abstractmethod

class LavadoraBase(ABC):

    # Tarifas de energía según estrato
    TARIFAS_ESTRATO = {
        2: 867.8,
        3: 737.6,
        4: 867.8,
        5: 1041.0,
    }

    # Prendas que tienen costo adicional del 5%
    PRENDAS_ESPECIALES = {"interior", "pijamas", "vestidos"}

    def __init__(self, nombre_cliente, estrato, potencia_kw):
        self._nombre_cliente = nombre_cliente
        self._estrato        = estrato
        self._potencia_kw    = potencia_kw

        self._kilos          = 0
        self._tipo_ropa      = []
        self._tiempo_lavado  = 30   # minutos por defecto

        self.__estado        = "apagada"   # atributo PRIVADO

        # Valores fijos del negocio
        self._precio_kilo       = 10_000
        self._aumento_especial  = 0.05
        self._iva               = 0.19

    # Propiedad para leer el estado (no se puede modificar desde afuera) 
    @property
    def estado(self):
        return self.__estado

    # Método público: encender 
    def encender(self):
        self.__estado = "encendida"
        print("\n🔊 *BIP* ¡Lavadora encendida!")
        winsound.Beep(1000, 300)  # frecuencia, duración
    # Método polimórfico: cada hija lo implementa a su manera 
    @abstractmethod
    def lavar(self):
        pass

    # Método público principal: ejecuta el ciclo completo
    def ciclo_terminado(self):
        print("\n" + "=" * 50)
        print("       BIENVENIDO A LAVA SMART")
        print("=" * 50)

        self.encender()

        # Pedir datos al usuario
        self._kilos     = self._validar_kilos()
        self._tipo_ropa = self._seleccionar_prendas()

        # Mostrar costos antes de lavar
        costo_base, costo_aumentado, costo_con_iva = self._calcular_costos()
        print(f"\n  Precio por kilo   : ${self._precio_kilo:,.0f}")
        print(f"  Costo sin IVA     : ${costo_base:,.0f}")
        print(f"  Costo con IVA 19% : ${costo_con_iva:,.0f}")

        # Ciclo de lavado
        self._llenar()
        self.lavar()          # <- polimórfico
        self._enjuagar()

        # Preguntar si desea secar
        while True:
            try:
                respuesta = input("\n¿Desea secar la ropa? (s/n): ").strip().lower()
                if respuesta in ("s", "n"):
                    break
                print("  Ingrese 's' para sí o 'n' para no.")
            except EOFError:
                print("\n  Accion Invalida.")

        if respuesta == "s":
            self._secar()

        # Calcular energía y mostrar reporte final
        kwh, costo_energia = self._calcular_consumo_energia()
        self._mostrar_reporte(costo_base, costo_aumentado, costo_con_iva, kwh, costo_energia)

        # Devolver datos para el administrador
        return {
            "cliente"      : self._nombre_cliente,
            "total"        : costo_con_iva + costo_energia,
            "iva"          : costo_con_iva - costo_aumentado,
            "utilidad"     : costo_aumentado * 0.30,
            "energia"      : costo_energia,
        }

    # Métodos PROTEGIDOS (uso interno y subclases)

    def _validar_kilos(self):
        # Pide y valida que los kilos estén entre 5 y 40.
        while True:
            try:
                kilos = float(input("\nIngrese el peso de la ropa (5 a 40 kg): "))
                if 5 <= kilos <= 40:
                    return kilos
                print("  El peso debe estar entre 5 y 40 kg.")
            except ValueError:
                print("  Ingrese un número válido que cumpla con el rango.")
            except EOFError:
                print("\n  Accion Invalida.")

    def _seleccionar_prendas(self):
        # Muestra una lista y devuelve las prendas elegidas.
        opciones = ["interior", "pijamas", "vestidos", "camisas",
                    "pantalones", "sabanas", "toallas", "otros"]
        print("\nTipos de prenda:")
        for i, p in enumerate(opciones, 1):
            print(f"  {i}. {p}")
        while True:
            try:
                entrada  = input("Elija los números: ")
                indices  = [int(x.strip()) for x in entrada.split(",")]
                elegidas = [opciones[i - 1] for i in indices if 1 <= i <= len(opciones)]
                if elegidas:
                    return elegidas
                print("  Seleccione al menos una prenda.")
            except (ValueError, IndexError):
                print("  Entrada no válida.")
            except EOFError:
                print("\n  Elija una opción.")

    def _barra_progreso(self, duracion, mensaje):
        # Muestra una barra de progreso simple.
        total = 20 # longitud de la barra
        print(f"\n{mensaje}")

        for i in range(total + 1):
            porcentaje = int((i / total) * 100)
            barra = "#" * i + "-" * (total - i)
            print(f"\r[{barra}] {porcentaje}%", end="", flush=True)
            time.sleep(duracion / total)
        print(" listo!")



    def _llenar(self):
        # Simula el llenado de agua (7 segundos).
        self._barra_progreso(7, "Llenando de agua...")

    def _enjuagar(self):
        # Simula el enjuague (5 segundos).
        self._barra_progreso(5, "Enjuagando...")
        self._tiempo_lavado += 20
        print("\nEnjuague completo.")

    def _secar(self):
        # Simula el secado (10 segundos).
        self._barra_progreso(10, "Secando...")
        self._tiempo_lavado += 30
        print("\nSecado completo.")
        

    def _mostrar_reporte(self, costo_base, costo_aumentado, costo_con_iva, kwh, costo_energia):
        # Imprime el comprobante del cliente.
        total = costo_con_iva + costo_energia
        print("\n" + "=" * 50)
        print("          COMPROBANTE LAVA SMART")
        print("=" * 50)
        print(f"  Cliente      : {self._nombre_cliente}")
        print(f"  Fecha/Hora   : {datetime.now().strftime('%d/%m/%Y %H:%M')}")
        print(f"  Kilos        : {self._kilos} kg")
        print(f"  Prendas      : {', '.join(self._tipo_ropa)}")
        print(f"  Método       : {self._nombre_metodo()}")
        print("-" * 50)
        print(f"  Costo base   : ${costo_base:>10,.0f}")
        if costo_aumentado > costo_base:
            extra = costo_aumentado - costo_base
            print(f"  Aumento 5%   : ${extra:>10,.0f}")
        print(f"  IVA 19%      : ${costo_con_iva - costo_aumentado:>10,.0f}")
        print(f"  Energía      : ${costo_energia:>10,.1f}")
        print("-" * 50)
        print(f"  TOTAL        : ${total:>10,.0f}")
        print("=" * 50)
        print("  Gracias por usar Lava Smart!\n")
        self._generar_pdf(total)


    def _generar_pdf(self, total):
        # Genera un PDF con el comprobante.
        archivo = f"comprobante_{self._nombre_cliente}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
        estilos = getSampleStyleSheet()
        contenido = []

        contenido.append(Paragraph("COMPROBANTE LAVA SMART", estilos["Title"]))
        contenido.append(Spacer(1, 20))

        contenido.append(Paragraph(f"Cliente: {self._nombre_cliente}", estilos["Normal"]))
        contenido.append(Paragraph(f"Fecha/Hora: {datetime.now().strftime('%d/%m/%Y %H:%M')}", estilos["Normal"]))
        contenido.append(Paragraph(f"Kilos: {self._kilos} kg", estilos["Normal"]))
        contenido.append(Paragraph(f"Prendas: {', '.join(self._tipo_ropa)}", estilos["Normal"]))
        contenido.append(Paragraph(f"Método: {self._nombre_metodo()}", estilos["Normal"]))
        contenido.append(Paragraph(f"Total a pagar: ${total:,.0f}", estilos["Normal"]))

        contenido.append(Spacer(1, 20))
        contenido.append(Paragraph("Gracias por usar Lava Smart!", estilos["Normal"]))

        pdf = SimpleDocTemplate(archivo) 
        pdf.build(contenido)

        print(f"\nComprobante PDF generado: {archivo}")

    def _nombre_metodo(self):
        # Sobrescrito en las subclases para mostrar el tipo de lavado.
        return "Base"

    # Métodos PRIVADOS (solo uso interno de esta clase) 

    def _calcular_costos(self):
        # Retorna (costo_base, costo_con_aumento, costo_con_iva).
        costo_base = self._kilos * self._precio_kilo

        # ¿Hay prendas especiales? → +5%
        hay_especial   = any(p in self.PRENDAS_ESPECIALES for p in self._tipo_ropa)
        costo_aumentado = costo_base * 1.05 if hay_especial else costo_base

        costo_con_iva = costo_aumentado * 1.19  

        return costo_base, costo_aumentado, costo_con_iva

    def _calcular_consumo_energia(self):
        # Retorna (kWh consumidos, costo en pesos).
        kwh    = self._potencia_kw * (self._tiempo_lavado / 60)
        tarifa = self.TARIFAS_ESTRATO.get(self._estrato, 867.8)
        costo  = kwh * tarifa
        return kwh, costo
