import { Button, Card } from "react-bootstrap";
import { BsCaretLeftFill as LeftIcon, BsCaretRightFill as RightIcon } from 'react-icons/bs';

import { useMemo, useState } from 'react'
import { Loader } from '../loader/Loaders'
import { getHeatMapSelector, loadHeatMap } from "../../slices/heatMapSlice";
import { useSelector } from "react-redux";
import { getData } from "../../util/slices";

import CalendarHeatmap from 'react-calendar-heatmap'

import 'react-calendar-heatmap/dist/styles.css';

import { matcher } from "../../lib/matcher";
import ReactTooltip from "react-tooltip";
import moment from 'moment';
import { OptionRadio } from "../control/OptionRadio";
import { formatTime } from "../../util/format";

const classTimeMatcher = matcher([1, [30], 2, [60], 3, [120], 4, [240], 5])
const classGoldMatcher = matcher([[1], 1, [2], 2, [5], 3, [10], 4, [50], 5])

export function HeatMapView({ year, selector, property }) {

  const data = useSelector(getData(selector))

  const heatMapSeries = data.map(d => ({
    date: d.timestamp,
    count: d[property.name]
  }))

  const total = heatMapSeries.reduce((acc, curr) => acc += curr?.count ?? 0, 0)

  function getTooltipAttrs(value) {
    if (value && value.date) {
      const valueStr = property.getValueStr ? property.getValueStr(value?.count) : value?.count;
      return { 'data-tip': `${moment(value.date).format('D MMM')}: ${valueStr}` }
    }
    return null
  }

  function getCssClass(property, value) {
    if (!value) {
      return 'color-empty'
    }
    return `color-github-${property.getCssClass ? property.getCssClass(value) : 1}`
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
      <div className="d-flex justify-content-start mt-2">
        <p className="fs-5 mb-0">Total: {property.getTotalStr ? property.getTotalStr(total, heatMapSeries.length) : total}</p>
        <p className="fs-5 mb-0 ms-auto">Days: {heatMapSeries.length} </p>
      </div>
    </>
  )

}

const properties = [
  {
    name: 'time',
    title: 'Time',
    getCssClass(value) {
      const minutes = value / 60
      return classTimeMatcher(minutes)
    },
    getValueStr: formatTime,
    getTotalStr(value, days) {
      const totalValue = this.getValueStr(value)
      const perDay = this.getValueStr((value / days).toFixed())
      return `${totalValue} [≈ ${perDay === 'N/P' ? '0s' : perDay}/day]`
    }
  },
  {
    name: 'golds',
    title: 'Golds',
    getCssClass(value) {
      return classGoldMatcher(value)
    },
    getTotalStr(value, days) {
      const perWeek = (value * 7 / days).toFixed()
      return `${value} [≈ ${perWeek} per week]`
    }
  },
  {
    name: 'premiumDays',
    title: 'Premium',
    getCssClass(value) {
      return 3;
    },
    getValueStr(value) {
      return value ? '+' : '-'
    },
    getTotalStr(value, days) {
      return `${value}/${days} [${(value * 100 / days).toFixed()}%]`
    }
  }
]

export function HeatMap({ initialYear }) {

  const [year, setYear] = useState(initialYear)
  const heatMapSelector = useMemo(() => getHeatMapSelector(year), [year])

  const [property, setProperty] = useState(properties[0])

  function changeYear(delta) {
    const newYear = year + delta;

    setYear(newYear)
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
            <OptionRadio items={properties} />
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <Loader selector={heatMapSelector} loadEvent={() => loadHeatMap(year)}>
          <HeatMapView year={year} property={property} selector={heatMapSelector}/>
        </Loader>
      </Card.Body>
    </Card>
  )

}