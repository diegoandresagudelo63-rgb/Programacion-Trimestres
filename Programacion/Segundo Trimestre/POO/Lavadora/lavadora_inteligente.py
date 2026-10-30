
import time
from lavadora_base import LavadoraBase


class LavadoraInteligente(LavadoraBase):

    def __init__(self, nombre_cliente, estrato):
        # Llama al constructor del padre con una potencia de 0.6 kW
        super().__init__(nombre_cliente, estrato, potencia_kw=0.6)
        self._wifi     = False
        self._sensores = {}

    def conectar_wifi(self):
        # Simula la conexión a WiFi.
        print("Conectando a WiFi...", end="", flush=True)
        time.sleep(3)
        self._wifi = True
        print(" conectado! Reporte enviado a la app.")

    def detectar_tipo_ropa(self):
        # Usa los sensores para ajustar el ciclo automáticamente.
        hay_delicada = any(p in self.PRENDAS_ESPECIALES for p in self._tipo_ropa)

        if hay_delicada:
            self._tiempo_lavado = 20
            self._sensores = {"temperatura": "30°C", "modo": "delicado"}
            print("Sensor: prendas delicadas detectadas → modo suave activado.")
        else:
            self._tiempo_lavado = 35
            self._sensores = {"temperatura": "40°C", "modo": "normal"}
            print("Sensor: prendas normales → modo estándar optimizado.")

        print(f"  Configuración: {self._sensores['temperatura']}, {self._sensores['modo']}")

    def lavar(self):
        # Polimorfismo: lavado inteligente con sensores y WiFi.
        print()
        self.detectar_tipo_ropa()
        self.conectar_wifi()
        print("Lavando en modo INTELIGENTE...", end="", flush=True)
        time.sleep(2)
        print(" listo!")

    def _nombre_metodo(self):
        return "Inteligente (WiFi + Sensores)"
