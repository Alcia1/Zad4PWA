const API_KEY = '174e27e1585c7e4ad5fcfed600860e6e';
const form = document.getElementById('form');
const input = document.getElementById('input');
const result = document.getElementById('result');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = input.value.trim();
  if (!city) return;

  result.innerHTML = 'Ładowanie...';

  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=pl`);
    if (!res.ok) throw new Error('Nie znaleziono miasta lub brak dostępu do internetu.');

    const data = await res.json();
    displayWeather(data);
  } catch (error) {
    result.innerHTML = `<p>Błąd: ${error.message}</p>`;
  }
});

function displayWeather(data) {
  const { name, main, weather } = data;
  const iconCode = weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  result.innerHTML = `
    <h2>${name}</h2>
    <img src="${iconUrl}" alt="Ikona pogody">
    <p>Pogoda: ${weather[0].description}</p>

    <p>Temperatura: ${main.temp}°C</p>
    <p>Temperatura Odczuwalna: ${main.feels_like}°C</p>

    <p>Wilgotność: ${main.humidity}%</p>
    <p>Ciśnienie: ${main.pressure}hPa</p>
  `;
}
