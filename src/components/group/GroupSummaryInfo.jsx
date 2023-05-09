import { useSelector } from "react-redux";
import { getData } from "../../util/slices";
import { useEffect, useState } from "react";
import { apiLoadGroupStat } from "../../service/group";
import { calcSummaryTime } from "../../lib/tracking";

export function GroupSummaryInfo({group, selector}) {
    const summary = useSelector(getData(selector))
    const [info, setInfo] = useState(null)

    useEffect(() => {
        apiLoadGroupStat(group, summary.periodStart, summary.periodEnd).then((data) => {
            setInfo({
                ...data,
                playedTime: calcSummaryTime(summary)
            })
        }).catch(ex => {
            setInfo(null)
        })
    }, [summary])

    console.log(info)
    if (!info) {
        return
    }
    const playedHours = Math.floor(info.playedTime / 3600)
    const playedDays = Math.floor(playedHours / 24)
    return (
        <p className="mt-3 fs-4 text-center">{info.playedAccounts} Legends, {playedHours || '<1 h'} hours</p>
    )



}