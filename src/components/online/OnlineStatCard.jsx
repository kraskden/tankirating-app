import { differenceInHours, format } from "date-fns";
import { useEffect, useState } from "react";
import { Alert, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "recharts";
import { matcher } from "../../lib/matcher";
import { getCurrentPcu, getMomentary, loadCurrentPcu, loadMomentary } from "../../slices/onlineSlice";
import { getData } from "../../util/slices";
import { UncontrolledOptionRadio } from "../control/OptionRadio";
import { Loader } from "../loader/Loaders";



// Alternativa disables their online services. 

function DisabledOnlineStatCard() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadMomentary())
  }, [])

  return (
    <Card className="mt-3">
      <Card.Header className="d-flex justify-content-center">
        <p className="text-center fw-bold h3">Press F</p>
      </Card.Header>
      <Card.Body>
        <Loader selector={getMomentary}>
          <SnapshotDateView />
        </Loader>
      </Card.Body>
    </Card>
  )

}

export const OnlineStatCard = DisabledOnlineStatCard

const ONLINE_PERIODS = [
  { name: 'day', title: 'Day' },
  { name: 'week', title: 'Week' },
  { name: 'month', title: 'Month' },
  { name: 'year', title: 'Year' },
  { name: 'all_time', title: 'All Time' }
]

function MomentaryOnlineCard({ online, inbattles, onlineTitle, inbattlesTitle }) {
  const inBattlesPercent = inbattles ? `[${Math.floor(inbattles / online * 100)}%]` : ''
  onlineTitle = onlineTitle || "Online"
  inbattlesTitle = inbattlesTitle || "In battles"
  return (
    <div className="col ml-auto">
      <p className="text-center fw-bold h3">
        {`${onlineTitle}: ${online ?? "N/A"}`}
      </p>
      <p className="text-center h4 mt-2">
        {`${inbattlesTitle}: ${inbattles ?? "N/A"} ${inBattlesPercent}`}
      </p>
    </div>
  )
}

function MomentaryOnlineView() {

  const data = useSelector(getData(getMomentary))

  return <MomentaryOnlineCard online={data.online} inbattles={data.inbattles} />
}

function PcuView({ period }) {

  const data = useSelector(getData(getCurrentPcu))

  const online = data[period.name]

  return <MomentaryOnlineCard
    online={online?.onlinePcu}
    inbattles={online?.inbattlesPcu}
    onlineTitle={`Online ${period.title} PCU`}
    inbattlesTitle={`In battles ${period.title} PCU`}
  />
}

const UPDATER_MATCHER = matcher(["text-success", [2], "text-danger", [24], "text-danger fw-bold"])

function SnapshotDateView() {
  const data = useSelector(getData(getMomentary))
  const date = new Date(data.timestamp)
  const hoursPassed = differenceInHours(new Date(), date)
  console.log(hoursPassed, UPDATER_MATCHER(0))
  return (
    <p className={`text-center h3 mt-2 ${UPDATER_MATCHER(hoursPassed)}`}>
      {format(date, "do LLL yyyy hh:mm / [O]")}
    </p>
  )
}

export function OldOnlineStatCard() {

  const [period, setPeriod] = useState(ONLINE_PERIODS[0])
  const dispatch = useDispatch()

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(loadMomentary())
    }, 1000 * 60 * 15)
    dispatch(loadMomentary())
    return () => clearInterval(timer)
  }, [])

  return (
    <Card className="mt-3">
      <Card.Header className="d-flex justify-content-end">
        <UncontrolledOptionRadio items={ONLINE_PERIODS} item={period} onChange={setPeriod} />
      </Card.Header>
      <Card.Body>
        <Loader selector={getMomentary}>
          <SnapshotDateView />
        </Loader>
        <div className="row mt-4 mb-4">
          <Loader selector={getMomentary} errorHandler={MomentaryOnlineCard}>
            <MomentaryOnlineView />
          </Loader>
          <Loader selector={getCurrentPcu} loadEvent={loadCurrentPcu}>
            <PcuView period={period} />
          </Loader>
        </div>
      </Card.Body>
    </Card>

  )


}
