#Funcion que toma el precio unitario, la cantidad vendida y devuelve el total de la venta.

def Total_venta(Precio_unitario, cantidad_vendida):
    total = Precio_unitario * cantidad_vendida
    return total
while True:
    try:
        Precio_unitario = float(input("Ingrese el precio unitario: "))
        cantidad_vendida = int(input("Ingrese la cantidad vendida: "))
        print(f"El total de la venta es: {Total_venta(Precio_unitario, cantidad_vendida)}")
        break
    except ValueError:
        print("Ingrese un numero valido para el precio unitario y la cantidad vendida.")