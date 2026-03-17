document.getElementById("btnBuscar").addEventListener("click", buscarClima)

async function buscarClima(){

    let ciudad = document.getElementById("ciudad").value
    let url = `http://localhost:3000/clima/${encodeURIComponent(ciudad)}`

    try{

        let respuesta = await fetch(url)
        let datos = await respuesta.json()
        console.log(url)
        mostrarPronostico(datos)

    }catch(error){
        alert("Error obteniendo clima")
    }
}

function mostrarPronostico(datos){

    let forecast = document.getElementById("forecast")
    forecast.innerHTML = ""
    let lista = datos.DailyForecasts

    for(let i = 0; i < lista.length; i++){

        let dia = lista[i]
        let fecha = new Date(dia.Date)
        let temp = dia.Temperature.Maximum.Value
        let desc = dia.Day.IconPhrase
        let card = document.createElement("div")
        card.className = "card"
        card.innerHTML = `<img src=${mostrarIcono(desc)}>
                          <p>${fecha.toLocaleDateString()}</p>
                          <p>${temp}°C</p>
                          <p>${desc}</p>`

        forecast.appendChild(card)

    }

}

function mostrarIcono(climas){

    let clima = climas.toLowerCase()

    if(clima.includes("cloud") || clima.includes("overcast") || clima.includes("dreary")){
        return "./gifs/nubes.gif"
    }

    if(clima.includes("rain") || clima.includes("storm") || clima.includes("shower")){
        return "./gifs/lluvia.gif"
    }

    if(clima.includes("snow")){
        return "./gifs/copo-de-nieve.gif"
    }

    if(clima.includes("sun")){
        return "./gifs/sol.gif"
    }

    if(clima.includes("flurries")){
        return "./gifs/viento.gif"
    }

}