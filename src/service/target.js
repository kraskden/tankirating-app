import axios from "axios";

export async function getTargetByName(name, type) {
  return axios.get(`/target/${name}`, {
    params: {
      targetType: type
    }
  })
}