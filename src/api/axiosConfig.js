import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

const errorHandler = (error) => {
  const statusCode = error.respnose?.status
  if (statusCode && statusCode !== 401) {
    console.error(error)
  }
  return Promise.reject(error)
}

api.interceptors.response.use(undefined, (error) => {
  if (error?.response?.status === 401) {
    window.location.href = '/login'
  }
  return errorHandler(error)
})

export default api
