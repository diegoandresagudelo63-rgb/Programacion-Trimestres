#Funcion donde reciba 2 parametro, subtotal e iva. La funcion debe retornar el valor total de la venta, es decir, el subtotal mas el iva.

def Calcular_total(Subtotal, IVA):
    total = Subtotal + IVA
    return total
Subtotal = float(input("Ingrese el subtotal de la venta: "))
IVA = Subtotal * 0.19
print(f"El total de la venta es: {Calcular_total(Subtotal, IVA)}")