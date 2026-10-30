#Funcion que reciba 3 numeros y devuelva la suma

def suma(n1, n2, n3):
    return n1 + n2 + n3

while True:
    try:
        n1 = float(input("Ingrese numero 1: "))
        n2 = float(input("Ingrese numero 2: "))
        n3 = float(input("Ingrese numero 3: "))
        print("Su suma es: ", suma(n1, n2, n3))
        break
    except ValueError:
        print("Ingrese un numero valido")