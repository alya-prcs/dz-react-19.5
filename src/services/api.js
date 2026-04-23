import axios from "axios";

const API_KEY = "55295944-00667858dcc250c98128e887a";
const BASE_URL = "https://pixabay.com/api/";

export const fetchImages = async (query, page) => {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      page,
      per_page: 12,
      image_type: "photo",
      orientation: "horizontal",
    },
  });

  return response.data.hits;
};