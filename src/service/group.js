import axios from "axios";
import { toISODate } from "../util/format";

export async function apiLoadGroupStat(group, from, to) {
    const {data} = await axios.get(`/group/${group}/stat`, {
        params: {
            from: toISODate(from),
            to: toISODate(to)
        }
    })
    return data
}