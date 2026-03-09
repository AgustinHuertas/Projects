function agregar(valor){
    document.getElementById("pantalla").value += valor
}

function limpiar(){
    document.getElementById("pantalla").value = ""
}

function borrar(){
    let pantalla = document.getElementById("pantalla")
    pantalla.value = pantalla.value.slice(0,-1)
}

function calcular(){
    let pantalla = document.getElementById("pantalla")
    try{
        pantalla.value = eval(pantalla.value)
    }catch{
        pantalla.value = "Error"
    }
}