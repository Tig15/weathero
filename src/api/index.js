const API_KEY = 'ZVWKBDUUC4VZKJGFKU35W59HQ&';
const API_URL =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

const fetchWeather = async location => {
  try {
    const response = await fetch(
      `${API_URL}/${location}?unitGroup=metric&key=${API_KEY}&contentType=json`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export {fetchWeather};
