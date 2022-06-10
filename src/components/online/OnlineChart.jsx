import { useCallback, useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useDatePeriodState } from "../../hooks/hooks";
import { DIFF_PERIODS } from "../../lib/constants";
import { getCcu, getPcuSelector, loadCcuForDatePeriod, loadPcu, loadPcuForDatePeriod } from "../../slices/onlineSlice";
import { UncontrolledOptionRadio } from "../control/OptionRadio";
import { Loader } from "../loader/Loaders";
import { DatePeriodRangeSelect } from "./DatePeriodRangeSelect";

function CcuChart() {
  
}

function PcuChart({period}) {
  
}

const VARIANTS = [
  { name: 'ccu', title: 'CCU', chart: CcuChart, loader: loadCcuForDatePeriod },
  { name: 'pcu', title: 'PCU', chart: PcuChart, loader: loadPcuForDatePeriod }
]

export function OnlineChart() {

  const defaultPcuOffset = 30
  const defaultCcuOffset = 4

  const dispatch = useDispatch()

  const [variant, setVariant] = useState(VARIANTS[0])
  const [pcuDatePeriod, setPcuDatePeriod] = useDatePeriodState(DIFF_PERIODS[0], defaultPcuOffset)
  const [ccuDatePeriod, setCcuDatePeriod] = useDatePeriodState(DIFF_PERIODS[0], defaultCcuOffset)
  
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
    getPcuSelector(datePeriod) : getCcu;

  const Chart = variant.chart

  return (
    <Card>
      <Card.Header className="d-flex">
        <UncontrolledOptionRadio item={variant} items={VARIANTS} onChange={setVariant} />
        {variant.name === 'pcu' &&
          <div className="ms-3 d-flex">
            <UncontrolledOptionRadio item={pcuDatePeriod} items={DIFF_PERIODS} onChange={setPcuDatePeriod} />
          </div>
        }
      </Card.Header>
      <Card.Body>
        <Loader loadEvent={loadOnlineEvent} selector={onlineSelector} loader={<></>}>
          <Chart period={datePeriod} />
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