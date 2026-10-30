#Crea un programa en python que calcule el valor del IVA (Impuesto al Valor Agregado) de una venta. 

def IVA(Valor_venta):
    iva = Valor_venta * 0.19
    return iva
valor_venta = float(input("Ingrese el valor de la venta: "))
Total = valor_venta + IVA(valor_venta)
print(f"EL valor total de la venta con IVA es: {Total}")