async function buscarClima(){

    let ciudad = document.getElementById("ciudad").value

    let apiKey = "MI_APIKEY"

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`

    try{

        let respuesta = await fetch(url)

        let datos = await respuesta.json()

        let clima = datos.weather[0].main.toLowerCase()

        document.getElementById("temperatura").textContent = "Temperatura: " + datos.main.temp + " °C"

        document.getElementById("descripcion").textContent = "Clima: " + datos.weather[0].description

        document.getElementById("humedad").textContent = "Humedad: " + datos.main.humidity + "%"

        document.getElementById("hora").textContent = "Hora local: " + horaLocal(datos)

        mostrarIcono(clima, horaLocal(datos))

        

    }catch(error){

        alert("No se pudo obtener el clima")

    }

}

function mostrarIcono(clima , hora){

    document.querySelectorAll('.gif').forEach(img => {
        img.style.display = "none"
    })
   
    if(clima.includes("cloud")){
        document.getElementById("cloud").style.display = "block"
        document.body.style.background ="linear-gradient(135deg,#bdc3c7,#2c3e50)"
    }

    if(clima.includes("rain")){
        document.getElementById("rain").style.display = "block"
        document.body.style.background ="linear-gradient(135deg,#4b79a1,#283e51)"
    }

    if(clima.includes("snow")){
        document.getElementById("snow").style.display = "block"
        document.body.style.background ="linear-gradient(135deg,#e6dada,#274046)"
    }

    if(clima.includes("clear")){

        if (hora >= "07:00" && hora <= "19:59" ){
            document.getElementById("clear").style.display="block"
            document.body.style.background ="linear-gradient(135deg,#fbc531,#f5f6fa)"
        }
        else {
            document.getElementById("night").style.display="block"
            document.body.style.background ="linear-gradient(to bottom, #0e0261, #08030d)"
        }
    }

}

function horaLocal(datos){
    let timezone = datos.timezone
    let fecha = new Date(Date.now() + timezone * 1000)
    return fecha.toUTCString().slice(-12, -7)
}


