import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Alert, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "recharts";
import { getCurrentPcu, getMomentary, loadCurrentPcu, loadMomentary } from "../../slices/onlineSlice";
import { getData } from "../../util/slices";
import { UncontrolledOptionRadio } from "../control/OptionRadio";
import { Loader } from "../loader/Loaders";

const ONLINE_PERIODS = [
  { name: 'day', title: 'Day' },
  { name: 'week', title: 'Week' },
  { name: 'month', title: 'Month' },
  { name: 'year', title: 'Year' },
  { name: 'all_time', title: 'All Time' }
]

function ErrorLabel() {
  return (
    <Alert variant="danger">No data</Alert>
  )
}

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

export function OnlineStatCard() {

  const [period, setPeriod] = useState(ONLINE_PERIODS[0])
  const [date, setDate] = useState(new Date())
  const dispatch = useDispatch()

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(loadMomentary())
      setDate(new Date())
    }, 1000 * 60 * 1)
    return () => clearInterval(timer)
  }, [])

  return (
    <Card className="mt-3">
      <Card.Header className="d-flex justify-content-end">
        <UncontrolledOptionRadio items={ONLINE_PERIODS} item={period} onChange={setPeriod} />
      </Card.Header>
      <Card.Body>
        <p className="text-center h3 mt-2">
          {format(date, "do LLL yyyy hh:mm / [O]")}
        </p>
        <div className="row mt-4 mb-4">
          <Loader selector={getMomentary} loadEvent={loadMomentary} errorHandler={ErrorLabel}>
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