#Funcion llamada "calcular_iva" que reciba como parametro el valor de una venta y retome el valor del IVA (19%) correspndiente a esa venta.

def calcular_iva(Valor_venta):
    iva = Valor_venta * 0.19
    return iva
iva_total = calcular_iva(Valor_venta=100000)
print(f"IVA: {iva_total}")
