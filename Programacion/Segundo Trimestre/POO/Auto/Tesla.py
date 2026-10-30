from carro import carro

class CarroElectrico(carro):
    def __init__(self, marca, color, velocidad_max, bateria_max):
        # Super llama aL constructor de la clase padre.
        super().__init__(marca, color, velocidad_max)
        self.bateria = bateria_max
        self.bateria_max = bateria_max

    def recargar(self):
        self.bateria = self.bateria_max
        return "Bateria cargada al 100%"
    
    #Polimorfino
    def acelerar(self, aumento):
        if not self.encendido:
            return "El carro apagado. Enciendalo primero."
        
        if self.bateria <= 0:
            return "Bateria Agotada. No puedes acelerar."

        mensaje_velocidad = super().acelerar(aumento)

        self.bateria -= 5

        return f"{mensaje_velocidad}| bateria{self.bateria}%"
    
    def __str__(self):
        return f"El carro electrico {self.marca} de color {self.color}"
        
        

            
