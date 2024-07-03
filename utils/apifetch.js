const dotenv = require("dotenv");
dotenv.config();
const axios = require("axios");

async function getWeather(infoType) {
  const latitude = 45.6495;
  const longitude = 13.7768;
  let url;

  const newDate = new Date();
  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1).padStart(2, "0");
  const day = String(newDate.getDate()).padStart(2, "0");
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();

  const today = `'${year}-${month}-${day}'`;

  if (infoType === "gradi") {
    url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
  } else if (infoType === "vento") {
    url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
  } else if (infoType === "pioggia") {
    url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=precipitation_hours`;
  }

  try {
    const response = await axios.get(url);

    if (infoType === "gradi") {
      const temperature = response.data.current_weather.temperature;
      return `La temperatura attuale a Trieste è di ${temperature}°C gradi`;
    } else if (infoType === "vento") {
      const windSpeed = response.data.current_weather.windspeed;
      return `La velocità attuale del vento a Trieste è di ${windSpeed} km/h`;
    } else if (infoType === "pioggia") {
      const dailyPrecipitation = response.data.daily;

      let rain = false;

      dailyPrecipitation.time.forEach((date, index) => {
        if (date === today) {
          indexOfDay = index;
          dailyPrecipitation.precipation_hours.forEach((hour) => {
            if (hour[index] > 0.0) {
              rain = true;
            }
          });
        }
      });
      if (rain) {
        return "Oggi è prevista pioggia";
      } else {
        return "Oggi non è prevista pioggia";
      }
    }
  } catch (error) {
    throw new Error(`Errore nella richiesta: ${error.message}`);
  }
}

module.exports = { getWeather };
