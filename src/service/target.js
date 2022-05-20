import axios from "axios";

export async function getTargetByName(name) {
  // await new Promise((res) => setTimeout(() => res(), 3000))
  return axios.get(`/target/${name}`)
}