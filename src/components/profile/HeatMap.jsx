import { Button, Card } from "react-bootstrap";
import { BsCaretLeftFill as LeftIcon, BsCaretRightFill as RightIcon } from 'react-icons/bs';

import { useState } from 'react'
import { SpinnerLoader } from '../loader/Loaders'
import { getHeatMap, loadHeatMap } from "../../slices/heatMapSlice";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../util/slices";

import CalendarHeatmap from 'react-calendar-heatmap'

import 'react-calendar-heatmap/dist/styles.css';

import { matcher } from "../../lib/matcher";
import ReactTooltip from "react-tooltip";
import moment from 'moment';
import { OptionRadio } from "../control/OptionRadio";

const classTimeMatcher = matcher([1, [30], 2, [60], 3, [120], 4, [240], 5])
const classGoldMatcher = matcher([[1], 1, [2], 2, [5], 3, [10], 4, [50], 5])

function getCssClass(property, value) {
  if (!value) {
    return 'color-empty'
  }
  let cssClassIdx = 1;
  if (property === "time") {
    const minutes = value / 60
    cssClassIdx = classTimeMatcher(minutes)
  } else if (property === "golds") {
    cssClassIdx = classGoldMatcher(value)
  } else if (property === "premiumDays") {
    cssClassIdx = 3
  }
  return `color-github-${cssClassIdx}`
}

function getValueStr(property, value) {
  if (property === "time") {
    const seconds = value

    return seconds ? seconds > 3600 ? (seconds / 3600).toFixed(1) + 'h' :
      ((seconds / 60).toFixed(0) || '<1') + ' min' : "N/P"
  } else if (property === "premiumDays") {
    return value ? '+' : '-'
  } else {
    return value
  }
}

export function HeatMapView({ year, property }) {

  const data = useSelector(getData(getHeatMap))

  const heatMapSeries = data.map(d => ({
    date: d.timestamp,
    count: d[property]
  }))

  function getTooltipAttrs(value) {
    if (value && value.date) {
      const valueStr = getValueStr(property, value.count)

      return { 'data-tip': `${moment(value.date).format('D MMM')}: ${valueStr}` }
    }
    return null
  }

  return (
    <>
      <CalendarHeatmap
        startDate={`${year}-01-01`}
        endDate={`${year}-12-31`}
        values={heatMapSeries}
        classForValue={(value) => getCssClass(property, value?.count)}
        tooltipDataAttrs={getTooltipAttrs}
      />
      <ReactTooltip className="fs-6" />
    </>
  )

}

const properties = [
  {
    name: 'time',
    title: 'Time'
  },
  {
    name: 'golds',
    title: 'Golds'
  },
  {
    name: 'premiumDays',
    title: 'Premium'
  }
]

export function HeatMap({ initialYear }) {

  const [year, setYear] = useState(initialYear)
  const [property, setProperty] = useState(properties[0].name)
  const dispatch = useDispatch()

  function changeYear(delta) {
    const newYear = year + delta;

    setYear(newYear)
    dispatch(loadHeatMap(newYear))
  }

  return (
    <Card className="mt-2">
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center">
          <div className="mr-auto">
            <OptionRadio items={properties} onChange={setProperty} />
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <LeftIcon className="fs-3 mx-2" onClick={() => changeYear(-1)}>Prev</LeftIcon>
            <p className="fs-3 mb-0">{year}</p>
            <RightIcon className="fs-3 mx-2" onClick={() => changeYear(1)}>Next</RightIcon>
          </div>
          <div className="invisible">
            <OptionRadio  items={properties} />
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <SpinnerLoader selector={getHeatMap} loadEvent={() => loadHeatMap(year)}>
          <HeatMapView year={year} property={property} />
        </SpinnerLoader>
      </Card.Body>
    </Card>
  )

}