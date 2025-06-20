export const getWeather = async () => {
  const apiKey = "e4d7fbf644d848b198724015252006";
  const city = 'jakarta'
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  const res = await fetch(url);
  const data = await res.json();
  return data;
};
