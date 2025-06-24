export const fetchWeather =  async (lat ,lon)=>{
  const apiKey = '76d9d0d2e69b603ff862f884cdbfd58b'
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
  const data = await res.json()

  return data

}