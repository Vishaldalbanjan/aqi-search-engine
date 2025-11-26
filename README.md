
🌍 AQI Explorer – Air Quality Index Search Engine  
A full-stack application that allows users to search for Air Quality Index (AQI) by city name, view detailed pollutant data, weather information, and navigate through an elegant UI powered by modern design.

This project consists of:

- Spring Boot Backend (REST API + Caching)
- React Frontend (Tailwind + Glassmorphism + Framer Motion animations)

---

🚀 Features

🌐 Frontend (React + Tailwind CSS)
- Beautiful glassmorphism UI
- AQI-colored cards for each station
- Detailed modal with:
  - AQI
  - Temperature, Humidity, Wind
  - Pollutants (PM2.5, PM10, CO, SO₂, NO₂, O₃)
- Error handling (city not found, API failure)
- Fully responsive for mobile/desktop

⚙ Backend (Spring Boot)
- REST API following best practices
- AQICN API integration
- Caching using `@Cacheable`  
  - Cache expiry  
  - Max entries  
  - Faster repeated searches
- Global exception handling
- CORS enabled for frontend

📁 Project Structure

bash
/backend
    ├── controller
    ├── service
    ├── client
    ├── config
    ├── exception
    └── AqiSearchApp.java

/frontend
    ├── src/Components
    ├── src/Pages
    ├── src/Utils
    └── public/assets
`


🛠 How to Run the Backend (Spring Boot)

Prerequisites

* Java 17+
* Maven 3+
* AQICN API Token (explained below)

Steps

bash
cd backend


1.Update `application.properties`:

properties
server.port=8080

aqicn.api.base-url=https://api.waqi.info
aqicn.api.token=YOUR_API_TOKEN

spring.cache.type=simple


2.Run the application:

bash
mvn spring-boot:run


Backend will start at:

👉 [http://localhost:8080](http://localhost:8080)

🎨 How to Run the Frontend (React)

Prerequisites

* Node.js 18+
* npm 

Steps

bash
cd frontend2
npm install
npm run dev


Frontend runs at:

👉 [http://localhost:5173](http://localhost:5173)

📘 API Documentation (Backend)

🟦 1. Search City

GET

/api/aqi/search?city={cityName}


Response

json
{
  "status": "ok",
  "data": [
    {
      "uid": 1234,
      "aqi": 56,
      "station": {
        "name": "Pune - XYZ",
        "geo": [18.52, 73.85]
      }
    }
  ]
}

🟩 2. Get City Details

GET

/api/aqi/details/{uid}


Response

json
{
  "status": "ok",
  "data": {
    "aqi": 72,
    "city": {
      "name": "Pune",
      "geo": [18.52, 73.85]
    },
    "iaqi": {
      "pm25": { "v": 18 },
      "pm10": { "v": 32 },
      "no2": { "v": 14 },
      "co":   { "v": 6  },
      "so2":  { "v": 4  },
      "o3":   { "v": 22 },
      "t":    { "v": 28 },
      "h":    { "v": 61 },
      "w":    { "v": 1.2 }
    }
  }
}

🌐 AQICN API Explanation

You can get your token here:

👉 [https://aqicn.org/data-platform/token/](https://aqicn.org/data-platform/token/)

AQICN provides two endpoints used in this project:

1️  Search API

GET https://api.waqi.info/search/?keyword={city}&token=YOUR_TOKEN

Returns all matching stations.

2️  City Details API


GET https://api.waqi.info/feed/@{uid}/?token=YOUR_TOKEN


Returns full AQI + pollutant + weather data for a station.

🔥 Sample API Responses

Search Response

json
{
  "status": "ok",
  "data": [
    { "uid": 1010, "aqi": 52, "station": { "name": "Delhi", "geo": [28.66, 77.23] } }
  ]
}


Details Response

json
{
  "status": "ok",
  "data": {
    "aqi": 160,
    "city": { "name": "Delhi" },
    "iaqi": {
      "pm25": { "v": 90 },
      "pm10": { "v": 150 }
    }
  }
}

📦 Tech Stack

Frontend

* React 19
* TailwindCSS
* Vite
* Axios
* Framer Motion

Backend

* Spring Boot
* RestTemplate
* Spring Cache
* Lombok
* AQICN API

🎨 Screenshots :

1️⃣ Landing Page – Initial UI

Title: AQI Explorer – Clean Landing Interface with City Search Bar
This screenshot shows the initial homepage with the background image and search bar.

<img width="1366" height="768" alt="Screenshot (53)" src="https://github.com/user-attachments/assets/ad4392b0-8782-423a-9544-26266f276b6a" />

2️⃣ Empty Search Error Message

Title: Validation Error – User Tried Searching Without Entering a City Name
This demonstrates proper error handling for empty input.

<img width="1366" height="768" alt="Screenshot (54)" src="https://github.com/user-attachments/assets/0d7584dd-7702-4ae4-a2fd-79dea4bd90b6" />

3️⃣ Invalid City Search Error

Title: No Results Found – Handling Invalid or Unknown City Searches
This shows the app gracefully displaying an error when no matching city is found.

<img width="1366" height="768" alt="Screenshot (55)" src="https://github.com/user-attachments/assets/8439a008-f0ff-4419-ac9d-d3328627047a" />

4️⃣ Search Results – Multiple Stations Displayed

Title: City AQI Results – Interactive Cards Showing AQI and Coordinates
This image highlights the AQI cards for different monitoring stations in the searched city.

<img width="1366" height="768" alt="Screenshot (56)" src="https://github.com/user-attachments/assets/2f670eca-eafb-41a0-a10b-2f7cda631ef8" />

5️⃣ Detailed AQI Popup Modal

Title: Station Details – Full AQI Breakdown, Weather, and Pollutants View
This showcases the detailed modal with AQI, weather, pollutants, and a close button.

<img width="1366" height="768" alt="Screenshot (57)" src="https://github.com/user-attachments/assets/cfdbe949-2723-43ce-928f-71fbe2b21d47" />



🎉 Thank you for checking out AQI Explorer!

