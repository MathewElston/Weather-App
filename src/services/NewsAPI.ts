import axios from "axios";

const baseURL = "https://newsapi.org/v2/";
const key = "909486fdf8c34ede86a8b93e8af31ab6";


const NewsAPI = axios.create({
  baseURL: baseURL,
  params: {
    apiKey: key,
    sortBy: "popularity"
  },
});

export default NewsAPI;





