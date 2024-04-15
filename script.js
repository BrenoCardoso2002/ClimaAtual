const cidade = document.querySelector("h1")
const clima = document.querySelector("h2")

function locationRequest(){
    var latitude = null
    var longitude = null

    navigator.geolocation.getCurrentPosition((localidade) => {
        latitude = localidade.coords.latitude
        longitude = localidade.coords.longitude

        url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&APPID=SUA_ID`
        chamaAPI(url)
    },
    (error) => {
        cidade.innerText = "Erro!!!"
        clima.innerText = "O acesso a localização deve ser pemitido!"
      }
    )
}

function chamaAPI(url){
    fetch(url)
    .then((data) => {
        return data.json();
    })
    .then((data) => {
        let temperatura = ((5/9) * (data.main.temp-32)).toFixed(1);
        cidade.innerText = `Hoje a temperatura em ${data.name} é:`;
        clima.innerText = temperatura + "°C";
    })
    .catch((erro) => {
        cidade.innerText = `Impossível acessar o OpenWeather. Verifique a sua conexão.`;
        clima.innerText = `-`;
    })
}

locationRequest()