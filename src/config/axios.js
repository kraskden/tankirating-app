import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080'

axios.interceptors.response.use((response) => response, (err) => {
  if (err.response && err.response.data) {
    const errorName = JSON.stringify(err.response.data)
    const errorMessage = err.response.data.message
    return Promise.reject({name: errorName, message: errorMessage})  
  } else {
    return Promise.reject()
  }
})