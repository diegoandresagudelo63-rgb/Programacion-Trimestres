#Funcion que tome el costo unitario, el precio de venta y devuelva la ganancia obtenida.
def calcular_ganancia(costo_unitario, precio_venta):
    ganancia = precio_venta - costo_unitario
    return ganancia
while True:
    try:
        costo_unitario = float(input("Ingrese el costo unitario: "))
        precio_venta = float(input("Ingrese el precio de venta: "))
        print(f"La ganancia obtenida es: {calcular_ganancia(costo_unitario, precio_venta)}")
        break
    except ValueError:
        print("Ingrese un numero valido para el costo unitario y el precio de venta.")
