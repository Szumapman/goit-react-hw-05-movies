import axios from "axios";

const TMDB_API_KEY = "941b4060b32a2bcfaa35765cb3db42d2";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
axios.defaults.params = {
    api_key: TMDB_API_KEY,
    language: "en-US",
};

export const fetchData = async (url: string) => {
    const { data } = await axios.get(url);
    return data;
};