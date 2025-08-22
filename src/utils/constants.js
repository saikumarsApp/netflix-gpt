export const LOGO =
  "https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png";

export const IMG_CDN_PATH = "https://image.tmdb.org/t/p/w500";

export const API_OPTION = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.REACT_APP_TMDB_KEY,
  },
};

// Gemini API key (from .env)
export const GEMINY_API = process.env.REACT_APP_GEMINI_KEY;

// Supported languages for GPT search
export const SUPPORTED_LANGAUGES = [
  { identifier: "English", name: "English" },
  { identifier: "Hindi", name: "Hindi" },
  { identifier: "Telugu", name: "Telugu" },
  { identifier: "Kannada", name: "Kannada" },
];
