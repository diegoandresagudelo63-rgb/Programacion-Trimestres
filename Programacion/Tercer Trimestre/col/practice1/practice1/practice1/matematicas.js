const PI = 3.1416

function sumar(x1, x2){
    return x1 + x2
}

function restar(x1, x2){
    return x1 - x2
}

function multiplicar(x1, x2){
    return x1 * x2
}

function dividir(x1, x2){
    if (x1 === 0 || x2 === 0) {
        errorDivision()
    }
    else{
        return x1 / x2
    }
}

function errorDivision(){
    console.log("No se puede dividir por cero")
}

module.exports{
    sumar,
    restar,
    multiplicar,
    dividir,
    PI
}