
import time
from lavadora_base import LavadoraBase

class LavadoraEstandar(LavadoraBase):

    def __init__(self, nombre_cliente, estrato):
        # Llama al constructor del padre con una potencia fija de 0.4 kW
        super().__init__(nombre_cliente, estrato, potencia_kw=0.4)

    def lavar(self):
        # Polimorfismo: lavado en modo estándar.
        print("\nLavando en modo ESTÁNDAR...", end="", flush=True)
        self._tiempo_lavado = 30
        time.sleep(4)
        print(" listo!")

    def _nombre_metodo(self):
        return "Estándar"
