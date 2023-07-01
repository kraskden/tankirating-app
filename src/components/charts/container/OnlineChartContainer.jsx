import { useCallback, useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useDatePeriodState } from "../../../hooks/tracking";
import { DIFF_PERIODS } from "../../../lib/constants";
import { getCcu, getPcuSelector, loadCcuForDatePeriod, loadPcuForDatePeriod } from "../../../slices/onlineSlice";
import { DatePeriodRangeSelect } from "../../control/DatePeriodRangeSelect";
import { UncontrolledOptionRadio } from "../../control/OptionRadio";
import { Loader } from "../../loader/Loaders";
import { CcuChart } from "../online/CcuChart";
import { PcuChart } from "../online/PcuChart";


const VARIANTS = [
  { name: 'ccu', title: 'CCU', chart: CcuChart, loader: loadCcuForDatePeriod },
  { name: 'pcu', title: 'PCU', chart: PcuChart, loader: loadPcuForDatePeriod }
]

const ZOOM_OPTIONS = [
  { name: true, title: '+' }, { name: false, title: '-' }
]

export function OnlineChartContainer() {

  const defaultPcuOffset = 30
  const defaultCcuOffset = 4

  const dispatch = useDispatch()

  const [variant, setVariant] = useState(VARIANTS[1])
  const [zoom, setZoom] = useState(ZOOM_OPTIONS[0])
  const [pcuDatePeriod, setPcuDatePeriod] = useDatePeriodState(DIFF_PERIODS[2], defaultPcuOffset)
  const [ccuDatePeriod, setCcuDatePeriod] = useDatePeriodState(DIFF_PERIODS[2], defaultCcuOffset)


  const [datePeriod, setDatePeriod] = variant.name === 'pcu' ?
    [pcuDatePeriod, setPcuDatePeriod] :
    [ccuDatePeriod, setCcuDatePeriod]

  function onRangeChange(startDate, endDate) {
    const newPeriod = setDatePeriod(datePeriod, startDate, endDate)
    dispatch(variant.loader(newPeriod))
  }

  function onRangeReset() {
    const newPeriod = setDatePeriod(datePeriod)
    dispatch(variant.loader(newPeriod))
  }

  const loadOnlineEvent = useCallback(() =>
    variant.loader(datePeriod)
    , [datePeriod, variant])

  const onlineSelector = variant.name === 'pcu' ?
    getPcuSelector(datePeriod.name) : getCcu

  const Chart = variant.chart

  return (
    <Card>
      <Card.Header className="d-flex">
        <UncontrolledOptionRadio item={variant} items={VARIANTS} onChange={setVariant} />
        {variant.name === 'pcu' &&
          <>
            <div className="ms-3 d-flex">
              <UncontrolledOptionRadio item={pcuDatePeriod} items={DIFF_PERIODS} onChange={setPcuDatePeriod} />
            </div>
            <div className="ms-3 d-flex">
              <UncontrolledOptionRadio item={zoom} items={ZOOM_OPTIONS} onChange={setZoom} />
            </div>
          </>
        }
      </Card.Header>
      <Card.Body>
        <Loader loadEvent={loadOnlineEvent} selector={onlineSelector} loader={<></>}>
          <Chart period={datePeriod} selector={onlineSelector} height={400} zoom={zoom.name}/>
        </Loader>
      </Card.Body>
      <Card.Footer className="my-2">
        <DatePeriodRangeSelect
          bg='secondary'
          datePeriod={datePeriod}
          onRangeChange={onRangeChange}
          onRangeReset={onRangeReset}
        />
      </Card.Footer>
    </Card>
  )


}