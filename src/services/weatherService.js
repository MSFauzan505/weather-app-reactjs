export const fetchWeather =  async (lat ,lon)=>{
  const apiKey = 'bef8972b18afa5f3494939ef92112410'
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
  const data = await res.json()

  return data
}