import { useSelector } from "react-redux";
import { getData } from "../util/slices";



export function RatingTable({ratingSelector}) {

  const rating = useSelector(getData(ratingSelector))

  console.log(rating)

  return null;

}