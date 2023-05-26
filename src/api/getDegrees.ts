import axios from "axios";
import type { Degree } from "./types";

const getDegrees = async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const res = await axios.get<Degree[]>(`${baseUrl}/degrees`);
  return res.data;
};

export default getDegrees;
