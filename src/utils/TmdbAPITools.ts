import axios from "axios";
import { BASE_TMDB_API_URL } from "./APILinks";

const TMDB_API_KEY = "941b4060b32a2bcfaa35765cb3db42d2";

axios.defaults.baseURL = BASE_TMDB_API_URL;
axios.defaults.params = {
    api_key: TMDB_API_KEY,
    language: "en-US",
};

export const fetchData = async (url: string, query?: string) => {
    const { data } = await axios.get(url, query ? { params: { query } } : {});
    return data;
};