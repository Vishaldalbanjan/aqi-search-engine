import { motion } from "framer-motion";

export default function SearchBar({ value, onChange, onSearch }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mt-24 w-full flex justify-center px-6"
    >
      <div className="flex w-full max-w-2xl bg-white/10 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-3xl overflow-hidden p-1.5">
  
  {/* Input */}
  <input
    value={value}
    onChange={(e) => onChange(e.target.value)}
    type="text"
    placeholder="🔍  Search for a city..."
    className="flex-1 px-6 py-4 bg-transparent text-white placeholder-gray-300 text-lg focus:outline-none"
  />

  {/* Button */}
  <button
    onClick={onSearch}
    className="px-8 py-3 rounded-2xl font-bold text-white bg-gradient-to-r 
               from-orange-300 to-red-400  
               shadow-lg hover:shadow-xl hover:opacity-95 
               transition-all duration-300 active:scale-95"
  >
    Search
  </button>

</div>

    </motion.div>
  );
}
