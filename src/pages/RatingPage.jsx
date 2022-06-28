import { useCallback, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { PeriodOffsetSelect } from "../components/control/period/PeriodOffsetSelect";
import { PeriodSelectContainer } from "../components/control/period/PeriodSelectContainer";
import { Loader } from "../components/loader/Loaders";
import { RatingTable } from "../components/RatingTable";
import { usePeriodWithOffsetState } from "../hooks/hooks";
import { TRACK_PERIODS } from "../lib/constants";
import { getRatingSelector, loadRating } from "../slices/ratingSlice";
import { getData } from "../util/slices";

const periods = TRACK_PERIODS
const defaultPeriod = periods[1]

export function RatingPage() {

  const [pagination, setPagination] = useState({page: 1, size: 25})

  const [sort, setSort] = useState()

  const {period, offset, setPeriod, setOffset, changeOffset, changeDate} = usePeriodWithOffsetState(defaultPeriod, periods)

  const ratingSelector = getRatingSelector(period.name, offset)
  const ratingLoader = useCallback(() => loadRating({
    period: period.name,
    offset,
    page: pagination.page,
    size: pagination.size,
    sort: sort
  }), [period, offset, pagination, sort])

  return (
    <Container fluid='md'>
      <PeriodSelectContainer periods={periods} period={period} 
        isResetDisabled={offset === 0} onPeriodChange={setPeriod} onReset={() => setOffset(0)}>
          <Loader loadEvent={ratingLoader} selector={ratingSelector}>
            <LoadedRatingControl selector={ratingSelector} onOffsetChange={changeOffset} onDateChange={changeDate}
              period={period} />
          </Loader>
      </PeriodSelectContainer>
      <Loader selector={ratingSelector} loader={<></>}>
        <RatingTable ratingSelector={ratingSelector} />
      </Loader>
    </Container>
  )

}

function LoadedRatingControl({selector, ...rest}) {
  const rating = useSelector(getData(selector))
  return <PeriodOffsetSelect from={rating.periodStart} to={rating.periodEnd} {...rest} />
}