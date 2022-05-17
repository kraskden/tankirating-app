import { useSelector } from "react-redux";
import { getSnapshot } from "../../slices/snapshotSlice";
import { getTarget } from "../../slices/targetSlice";
import { getData } from "../../util/slices";
import { UserBox } from "../profile/UserBox";


export function SnapshotView() {

  const user = useSelector(getData(getTarget))
  const snapshot = useSelector(getData(getSnapshot))

  return (
    <h4>Snapshot view</h4>
  )

}