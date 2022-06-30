import axios from "axios";
import { postProcessTrack } from "../lib/tracking";


export async function apiLoadRating(period, offset, minScore, page, size, sort) {
  const {data} = await axios.get(`/users/rating/${period}/${offset}`, {
    params: {
      page, size, sort, minScore
    }
  })
  const {pageNumber, pageSize} = data.ratingData.pageable
  data.ratingData.content.forEach((t, idx) => {
    postProcessTrack(t)
    t.position = pageNumber * pageSize + idx + 1
  })
  return data
}