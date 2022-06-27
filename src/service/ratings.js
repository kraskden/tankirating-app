import axios from "axios";
import { postProcessTrack } from "../lib/tracking";


export async function apiLoadRating(period, offset, page, size, sort) {
  const {data} = await axios.get(`/users/rating/${period}/${offset}`, {
    params: {
      page, size, sort
    }
  })
  postProcessTrack(data.ratingData.content)
  return data
}