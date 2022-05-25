import axios from "axios"

export async function apiGetHeatMap(targetId, year) {
  const from = `${year}-01-01`
  const to = `${year}-12-31`
  return axios.get(`/target/${targetId}/heatmap`, {
    params: {from, to}
  })
}