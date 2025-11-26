import React, { useState } from "react";
import SearchBar from "../Components/SearchBar";
import CityCard from "../Components/CityCard";
import Loader from "../Components/Loader";
import { searchCity, getCityDetails } from "../Utils/api";
import Navbar from "../Components/Navbar";
import { getAqiColor } from "../Components/AqiColor";
import { motion } from "framer-motion";
import bgimg from "../assets/bgimg2.png"

export default function Home() {
  const [city, setCity] = useState("");
  const [results, setResults] = useState([]);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setResults([]);

    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    try {
      setLoading(true);

      const res = await searchCity(city);

      if (!res.data || !res.data.data || res.data.data.length === 0) {
        setError(" No city found. Try a different name.");
        return;
      }

      const stations = res.data.data;

      // Fetch AQI for each station
      const withAqi = await Promise.all(
        stations.map(async (s) => {
          try {
            const fullDetails = await getCityDetails(s.uid);
            return { ...s, fullAQI: fullDetails.data.data.aqi };
          } catch {
            return { ...s, fullAQI: "N/A" };
          }
        })
      );

      setResults(withAqi);
    } catch (err) {
      console.log(err);
      const message =
        err.response?.data?.message ||
        "Something went wrong while fetching data.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const openDetails = async (uid) => {
    setError("");

    try {
      const res = await getCityDetails(uid);
      if (!res.data?.data) {
        setError("No details available for this city.");
        return;
      }
      setDetails(res.data.data);
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.message ||
          "Failed to load city details. Try again."
      );
    }
  };

  return (
    <>


<div className="fixed inset-0 -z-10 bg-black/50">
  <img
    src={bgimg}
    className="w-full h-full object-cover brightness-50"
  />
</div>






      <Navbar />

      <SearchBar value={city} onChange={setCity} onSearch={handleSearch} />

      {/* ERROR BOX */}
     {error && (
  <div className="mx-10 mt-6 flex items-center gap-3 bg-red-500/10 border border-red-400/40 text-red-200 px-5 py-4 rounded-2xl backdrop-blur-xl shadow-lg animate-fade-in">
    <span className="text-red-300 text-xl">⚠️</span>
    <p className="font-medium tracking-wide">{error}</p>
  </div>
)}


      {/* LOADING */}
      {loading && <Loader />}

      {/* RESULTS */}
      <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-10">
        {results.map((c, i) => (
          <CityCard key={i} city={c} onClick={() => openDetails(c.uid)} />
        ))}
      </div>

     {details && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4"
  >
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      className="bg-white/10 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl border border-white/20 w-full max-w-lg"
    >
      <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        {details.city.name}
      </h2>

      <div className={`text-4xl py-4 rounded-xl text-center mb-6 font-extrabold ${getAqiColor(details.aqi)}`}>
        AQI: {details.aqi}
      </div>

      {/* Weather */}
      <div className="bg-white/5 p-5 rounded-2xl border border-white/10 mb-4">
        <h3 className="text-xl mb-2 text-blue-300 font-semibold">Weather</h3>
        <div className="text-gray-200 space-y-1">
          <p>🌡 Temp: {details.iaqi?.t?.v ?? "N/A"} °C</p>
          <p>💧 Humidity: {details.iaqi?.h?.v ?? "N/A"}%</p>
          <p>💨 Wind: {details.iaqi?.w?.v ?? "N/A"} m/s</p>
        </div>
      </div>

      {/* Pollutants */}
      <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
        <h3 className="text-xl text-blue-300 font-semibold mb-3">Pollutants</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { key: "pm25", label: "PM2.5" },
            { key: "pm10", label: "PM10" },
            { key: "no2", label: "NO₂" },
            { key: "so2", label: "SO₂" },
            { key: "co", label: "CO" },
            { key: "o3", label: "O₃" },
          ].map((p) => (
            <div key={p.key} className="bg-white/10 p-4 rounded-xl text-center border border-white/10">
              <p className="text-sm text-gray-300">{p.label}</p>
              <p className="text-xl font-bold text-cyan-300">
                {details.iaqi?.[p.key]?.v ?? "N/A"}
              </p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => setDetails(null)}
        className="w-full bg-gradient-to-r from-red-500 to-red-600 py-3 rounded-xl text-white font-bold mt-6"
      >
        Close
      </button>
    </motion.div>
  </motion.div>
)}

    </>
  );
}
