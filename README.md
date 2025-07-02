![Screenshot 2025-07-02 202029](https://github.com/user-attachments/assets/79dba49d-3865-43b2-a857-b68b37b36265)
````markdown
# 🌦️ LiquidGlass Weather App

A beautifully designed weather application built with **React.js**, inspired by **Apple iOS 16's liquid glass UI aesthetic**. This app leverages **Tailwind CSS**, **PrimeReact**, **Recharts**, **Leaflet.js**, and **OpenWeatherMap API** to deliver responsive, interactive, and accurate weather tracking for users worldwide.

## 🔍 Features

- **Live Weather Tracking**  
  Get real-time weather data including temperature, humidity, pressure, cloudiness, and wind speed.

- **Interactive Map (Leaflet.js)**  
  Click anywhere on the map to fetch weather data of that location instantly.

- **Search by City**  
  Search any city in the world and get the current weather and forecast.

- **Forecast by Hour & Day**  
  Visual 3-hour forecast blocks and weekly forecast in chart form powered by **Recharts**.

- **Responsive & Mobile-Friendly UI**  
  Crafted with **Tailwind CSS** and designed to work seamlessly across devices.

- **Popular Cities Overview**  
  Display weather conditions from multiple popular global cities.

## 📷 Preview

| Home Page | Search City | Forecast View |
|-----------|-------------|---------------|
| ![Home](./screenshots/home.png) | ![Search](./screenshots/search.png) | ![Forecast](./screenshots/forecast.png) |




## ⚙️ Tech Stack

- **Frontend Framework:** React.js  
- **Styling:** Tailwind CSS, PrimeReact  
- **Data Visualization:** Recharts  
- **Maps:** Leaflet.js  
- **Weather API:** [OpenWeatherMap API](https://openweathermap.org/api)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file and add your OpenWeatherMap API key:

   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

4. **Run the app**

   ```bash
   npm run dev
   ```

## 🧪 Development Notes

* Uses `fetch` to get real-time data from OpenWeatherMap's One Call API (v2.5).
* Geo-coordinates from Leaflet click events are passed to API calls to return weather at any map location.
* Modular component design with hooks for weather data, city search, and forecast formatting.
* Deployed on modern Vite environment for fast development.

## 📱 UI Inspiration

The visual design mimics the **liquid glass blur and smooth gradients** from Apple iOS 16's Weather app interface — blending transparency, smooth curves, and clean typography for a modern feel.

## 📄 License

MIT License. See [LICENSE](LICENSE) for more information.

---

**Crafted with 💙 by [\MSFauzan505]**

```

---

```
