 const apiKey = '76d9d0d2e69b603ff862f884cdbfd58b'
export const fetchCurrentWeather =  async ({lat ,lon})=>{
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
  const data = await res.json()

  return data

}

export const fetchForecast = async ({lat, lon})=> {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
  const data = await res.json()

  return data
}

export const fetchCityWeather = async (cityName)=>{
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
  const data = await res.json()

  return data
}