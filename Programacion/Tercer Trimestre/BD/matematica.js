const PI = 3.14;

function sumar (x1, x2){
    return x1 + x2;
}

function restar(x1, x2){
    return x1 - x2;
}

function multiplicar(x1, x2){
    return x1 * x2;
}

function dividir (x1, x2){
    if (x2 === 0) {
        mostrarErrorDvision()
    }
    else{
        return x1 / x2;
    }
}

function mostrarErrorDvision () {
    console.log("Error, no se puede dividir por cero");
}
Module.exports = {

    PI,
    sumar,
    restar,
    multiplicar,
    dividir,
    mostrarErrorDvision,
};