import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080'

axios.interceptors.response.use((response) => response, (err) => {
  const errorName = JSON.stringify(err.response.data)
  const errorMessage = err.response.data.message
  return Promise.reject({name: errorName, message: errorMessage})
})