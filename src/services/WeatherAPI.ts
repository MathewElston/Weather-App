import axios from "axios";

const baseURL = "http://api.weatherapi.com/v1";
const key = "29dcb6629c1b48cea34222405232403";

const weatherAPI = axios.create({
  baseURL: baseURL,
  params: {
    key: key,
  },
});

export default weatherAPI;
