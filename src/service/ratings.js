import axios from "axios";
import { postProcessTrack } from "../lib/tracking";


export async function apiLoadRating(period, offset, queryParams) {
  queryParams.ids = queryParams.ids ? queryParams.ids.join(',') : undefined
  const {data} = await axios.get(`/account/rating/${period}/${offset}`, {
    params: queryParams
  })
  const {pageNumber, pageSize} = data.ratingData.pageable
  data.ratingData.content.forEach((t, idx) => {
    postProcessTrack(t)
    t.position = pageNumber * pageSize + idx + 1
  })
  return data
}