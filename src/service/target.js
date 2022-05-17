import axios from "axios";

export async function getTargetByName(name) {
  return axios.get(`/target/${name}`)
}