const url = 'https://api.openweathermap.org/data/2.5/'
const key = '898376a58460a05b05941d681431bacf'
const sehirler = ['İstanbul','denizli','izmir','manisa','İstanbul','Yozgat'];
const getResult = () => {
    for (let index = 1; index <= 6; index++) {
        let cityName = sehirler[index-1];
        let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`
        fetch(query)
        .then(weather => {
            return weather.json();
        })
        .then(result => {
            displayResult(result, index);
        })
    }
}
 
const displayResult = (result, index) => {
    let sicaklik = document.querySelector("#sehir"+index+"Sicaklik");
    sicaklik.innerText = `${Math.round(result['main']['temp'])}°C`;
    let nem = document.querySelector("#sehir"+index+"Nem");
    nem.innerText = `%${(result['main']['humidity'])}`;
    let ruzgar = document.querySelector("#sehir"+index+"Ruzgar");
    ruzgar.innerText = `${(result['wind']['speed'])} km`;
}

 getResult();
