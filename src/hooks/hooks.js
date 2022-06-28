import { startOfDay, sub } from "date-fns";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getData } from "../util/slices";
import { getInitOffsetMap } from "../util/util";

export function useData(selector) {
  return useSelector(getData(selector))
}

export function useDatePeriodState(defPeriod, defOffset) {

  function defPeriodStart(period) {
    return sub(new Date(), { [period.fnsPeriod]: defOffset })
  }

  function defDatePeriod(period) {
    return {
      ...period,
      startDate: defPeriodStart(period),
      endDate: new Date()
    }
  }

  const [period, setPeriod] = useState(defDatePeriod(defPeriod))

  return [period, (newPeriod, startDate, endDate) => {
    startDate = startDate ?? defPeriodStart(newPeriod)
    endDate = endDate ?? new Date()
    const newDatePeriod = {
      ...newPeriod,
      startDate,
      endDate
    }
    setPeriod(newDatePeriod)
    return newDatePeriod
  }]
}


export function usePeriodWithOffsetState(initPeriod, periods) {

  const [period, setPeriod] = useState(initPeriod)
  const [offsets, setOffsets] = useState(getInitOffsetMap(periods))

  const offset = offsets[period.name]

  const setOffset = (offset) => {
    setOffsets({
      ...offsets,
      [period.name]: offset
    })
  }

  const changeOffset = (delta) => {
    setOffsets({
      ...offsets,
      [period.name]: offsets[period.name] + delta
    })
  }

  const changeDate = (newDate) => {
    if (period.diffFn) {
      const today = startOfDay(new Date())
      const offset = period.diffFn(today, newDate)
      setOffset(offset)
    }
  }

  return {period, offset, setPeriod, setOffset, changeOffset, changeDate }

}
