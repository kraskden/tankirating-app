import axios from "axios";
import { buildAuthHeaders } from "../util/api";

export async function apiManagementGetTargetStat() {
  const {data} = await axios.get('/management/stat/targets', {
    headers: buildAuthHeaders()
  })
  return data
}