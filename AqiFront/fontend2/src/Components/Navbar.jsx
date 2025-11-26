import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full backdrop-blur-lg bg-white/10 border-b border-white/20 py-4 shadow-lg fixed top-0 left-0 z-50"
    >
     <h1 className="text-3xl text-center font-extrabold bg-gradient-to-r from-orange-400 via-red-300 to-blue-500 bg-clip-text text-transparent drop-shadow-xl">
  🌍 AQI Explorer
</h1>


    </motion.div>
  );
}
