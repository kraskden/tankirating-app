import axios from "axios";

export async function apiGetVersion() {
  const {data} = await axios.get('/version')
  return data
}