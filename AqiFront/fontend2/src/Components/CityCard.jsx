import { motion } from "framer-motion";
import { getAqiColor } from "./AqiColor";

export default function CityCard({ city, onClick }) {
  const aqi = city.fullAQI ?? "N/A";

  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      transition={{ type: "spring", stiffness: 200 }}
      onClick={onClick}
      className="cursor-pointer p-6 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:bg-white/20 transition group"
    >
      <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-red-300 to-blue-500 bg-clip-text text-transparent transition group-hover:opacity-90">
  {city.station.name}
</h2>


      <div
        className={`text-5xl py-5 rounded-2xl font-extrabold text-center shadow-inner ${getAqiColor(
          aqi
        )}`}
      >
        {aqi}
      </div>

      <div className="mt-4 text-gray-300 text-sm">
        <p>📍 Latitude: {city.station.geo[0]}</p>
        <p>📍 Longitude: {city.station.geo[0]}</p>
      </div>
    </motion.div>
  );
}
