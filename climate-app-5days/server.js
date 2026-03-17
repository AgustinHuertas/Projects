const express = require("express")
const cors = require("cors")
const app = express()
app.use(cors())

const apiKey = "api_accuweather"

app.get("/clima/:ciudad", async (req, res) => {

    const ciudad = req.params.ciudad

    try{

        const urlCiudad = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${ciudad}`
        const resCiudad = await fetch(urlCiudad)
        const datosCiudad = await resCiudad.json()

        if(datosCiudad.length === 0){
            return res.json({error:"Ciudad no encontrada"})
        }

        const locationKey = datosCiudad[0].Key       
        const urlClima = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}&metric=true`
        const resClima = await fetch(urlClima)
        const datosClima = await resClima.json()
        res.json(datosClima)

    }catch(error){
        res.status(500).json({error:"Error obteniendo clima"})
    }

})

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000")
})