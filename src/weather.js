import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.API_KEY;

const cityName = "Kottayam";

const apiUrl = `http://api.openweathermap.org/data/2.5/find?q=${cityName}&appid=${apiKey}`;

async function cityId() {
  try {
    return await fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const cityId = data.list[0].id;
        return cityId;
      })
      .catch((err) => console.log(err, "some error ouccreed while fetching"));
  } catch (error) {
    console.log(error, "fetching city id has some errors");
  }
}

async function getWeather() {
  try {
    const cityIdUsingFetch = await cityId();

    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?id=${cityIdUsingFetch}&appid=${apiKey}`
    );

    // Iterate over each forecast entry
    response.data.list.forEach((forecast) => {
      // Extract temperature from the forecast and convert to Celsius
      const temperatureKelvin = forecast.main.temp;
      const temperatureCelsius = temperatureKelvin - 273.15;

      // Extract weather conditions from the forecast
      const weatherConditions = forecast.weather
        .map((condition) => condition.main)
        .join(", ");

      // Print temperature in Celsius and weather conditions
      console.log(`Temperature: ${temperatureCelsius.toFixed(2)} °C`);
      console.log(`Weather Conditions: ${weatherConditions}`);
    });
  } catch (error) {
    console.log(error, "Error occured in weather main page");
    return null;
  }
}

getWeather("new york");
