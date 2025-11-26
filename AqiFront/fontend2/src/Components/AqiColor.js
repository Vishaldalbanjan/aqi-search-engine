export const getAqiColor = (aqi) => {
  if (aqi <= 50) return "bg-green-600";
  if (aqi <= 100) return "bg-yellow-500";
  if (aqi <= 150) return "bg-orange-500";
  if (aqi <= 200) return "bg-red-600";
  if (aqi <= 300) return "bg-purple-700";
  return "bg-gray-900";
};
