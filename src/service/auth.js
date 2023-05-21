import axios from "axios"

export async function apiAuth(login, password) {
  const header = `Basic ${btoa(`${login}:${password}`)}`
  return apiAuthWithHeader(header)
}

export async function apiAuthWithHeader(header) {
  const {data} = await axios.post(`/auth`, {}, {
    headers: {
      'Authorization': header
    }
  })
  return data
}