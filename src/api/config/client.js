import axios from "axios";

export const client = axios.create({
  baseURL: "https://api.miporra.es/v1.0",
});

const clientJWT = axios.create({
  baseURL: "https://api.miporra.es/v1.0"
})

clientJWT.interceptors.response.use(response => response.data)

export default clientJWT