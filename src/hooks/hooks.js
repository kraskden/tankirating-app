import { useSelector } from "react-redux";
import { getData } from "../util/slices";

export function useData(selector) {
  return useSelector(getData(selector))
}