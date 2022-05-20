import axios from "axios"

export async function getTimeHeatMap(targetId, year) {
  const from = `${year}-01-01`
  const to = `${year}-12-31`
  return axios.get(`/target/${targetId}/heatmap/time`, {
    params: {from, to}
  })
}