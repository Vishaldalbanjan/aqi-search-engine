import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/aqi",
});

export const searchCity = (city) =>
  API.get(`/search?city=${city}`);

export const getCityDetails = (uid) =>
  API.get(`/city/${uid}`);
