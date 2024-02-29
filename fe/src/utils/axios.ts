import axios from 'axios'
import { BASE_URL } from '@/config'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error.response || 'Something went wrong')
)

export default axiosInstance
