import axios from "axios";
const axiosClient = axios.create({ baseURL: "http://localhost:8000" })


axiosClient.interceptors.request.use((requestConfig) => {
  const accessToken = localStorage.getItem('accessToken-iCare')
  if (accessToken) requestConfig.headers["Authorization"] = `Bearer ${accessToken}`
  return requestConfig
}, (error) => {
  return Promise.reject(error)
})


axiosClient.interceptors.response.use((res) => {
  return res
}, async (error) => {
  const originalConfig = error.config
  const statusCode = error.response.status
  if (statusCode === 401 && originalConfig.url === "/auth/token") return Promise.reject(error)
  if (statusCode === 401) {
    const tokenResponse = await axiosClient.post('/auth/token', { refreshToken: localStorage.getItem('refreshToken-iCare') })
    localStorage.setItem('accessToken-iCare', tokenResponse.data.data)
    return axiosClient(originalConfig)
  }
  try {
    error.message = error.response.data.error
  } catch (error) {
    console.log(error)
  }
  return Promise.reject(error)
})


export default axiosClient