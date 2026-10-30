def calcular_gastos():
    total = 0
    dias = 1

    while dias <= 6:
        try:
            gasto = float(input(f"Ingrese el gasto del día {dias}: "))
            total += gasto
            dias += 1
        except ValueError:
            print("Ingrese un número válido para el gasto.")
    print(f"El gasto total de la semana es: {total}")
calcular_gastos()