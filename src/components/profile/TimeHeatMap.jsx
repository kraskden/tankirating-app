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

const classIdxMatcher = matcher([1, [30], 2, [60], 3, [120], 4, [240], 5])

export function HeatMapView({ year }) {

  const data = useSelector(getData(getHeatMap))

  const heatMapSeries = data.map(d => ({
    date: d.timestamp,
    count: d.value
  }))

  function getClassForTime(time) {
    if (!time) {
      return 'color-empty'
    }
    const minutes = time / 60
    return `color-github-${classIdxMatcher(minutes)}`
  }

  function getTooltipAttrs(value) {
    if (value && value.date && value.count) {
      const seconds = value.count
      const timeStr = seconds > 3600 ? (seconds / 3600).toFixed(1) + 'h' :
        ((seconds / 60).toFixed(0) || '<1') + ' min'

      return { 'data-tip': `${moment(value.date).format('D MMM')}: ${timeStr}` }
    }
    return null
  }

  return (
    <>
      <CalendarHeatmap
        startDate={`${year}-01-01`}
        endDate={`${year}-12-31`}
        values={heatMapSeries}
        classForValue={(value) => getClassForTime(value?.count)}
        tooltipDataAttrs={getTooltipAttrs}
      />
      <ReactTooltip className="fs-6" />
    </>
  )

}

export function TimeHeatMap({ initialYear }) {

  const [year, setYear] = useState(initialYear)
  const dispatch = useDispatch()

  function changeYear(delta) {
    const newYear = year + delta;

    setYear(newYear)
    dispatch(loadHeatMap(newYear))
  }

  return (
    <Card className="mt-2">
      <Card.Header>
        <div className="d-flex justify-content-center align-items-center">
          <LeftIcon className="fs-3 mx-2" onClick={() => changeYear(-1)}>Prev</LeftIcon>
          <p className="fs-3 mb-0">{year}</p>
          <RightIcon className="fs-3 mx-2" onClick={() => changeYear(1)}>Next</RightIcon>
        </div>

      </Card.Header>
      <Card.Body>
        <SpinnerLoader selector={getHeatMap} loadEvent={() => loadHeatMap(year)}>
          <HeatMapView year={year} />
        </SpinnerLoader>


      </Card.Body>
    </Card>
  )

}