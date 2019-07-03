const elementoProcura = document.querySelector('[input-procura]')
const caixaProcura = new google.maps.places.SearchBox(elementoProcura)
caixaProcura.addListener('places_changed', () => {
  const local = caixaProcura.getPlaces()[0]
  if (local == null) return
  const latitude = local.geometry.location.lat()
  const longitude = local.geometry.location.lng()
  fetch('/clima', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      latitude: latitude,
      longitude: longitude
    })
  }).then(res => res.json()).then(data => {
    setDataClima(data, local.formatted_address)
  })
})

const icone = new Skycons({ color: '#222' })
const elementoLocal = document.querySelector('[data-local]')
const elementoStatus = document.querySelector('[data-status]')
const elementoTemperatura = document.querySelector('[data-temperatura]')
const elementoPrecipitacao = document.querySelector('[data-precipitacao]')
const elementoVento = document.querySelector('[data-vento]')

function setDataClima(data, local) {
  elementoLocal.textContent = local
  elementoStatus.textContent = data.summary
  elementoTemperatura.textContent = data.temperature + 'ºC'
  elementoPrecipitacao.textContent = `${data.precipProbability * 100}%`
  elementoVento.textContent = data.windSpeed
  icone.set('icone', data.icon)
  icone.play()

  let areaTemperatura = document.querySelector(".detalhes.borda")
  let altTemperatura = document.getElementsByClassName("span-temperatura")
  let celsiusToF = ((data.temperature * 9/5) + 32).toFixed(1) 

  areaTemperatura.addEventListener("click", () => {
    if (altTemperatura.textContent === "ºC") {
      altTemperatura.textContent = "ºF"
      elementoTemperatura.textContent = celsiusToF + 'ºF'
    } else {
      altTemperatura.textContent = "ºC"
      elementoTemperatura.textContent = data.temperature + 'ºC'
    }
  })

}


