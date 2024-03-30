import axios from "axios";

export const client = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
});

const clientJWT = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL
})

clientJWT.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
      return Promise.reject({
        message: error.response.statusText,
        ...error.response,
        ...error.response.data
      })
    }
  }
)

export const setAuthorizationHeader = token => (   
  clientJWT.defaults.headers.common['Authorization'] = `Bearer ${token}`
)

export const removeAuthorizationHeader = () => {
  delete clientJWT.defaults.headers.common['Authorization']
}

export default clientJWT