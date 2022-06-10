import { sub } from "date-fns";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getData } from "../util/slices";

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