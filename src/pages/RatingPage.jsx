import { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { UncontrolledOptionRadio } from "../components/control/OptionRadio";
import { PeriodOffsetSelect } from "../components/control/period/PeriodOffsetSelect";
import { PeriodSelectContainer } from "../components/control/period/PeriodSelectContainer";
import { Loader } from "../components/loader/Loaders";
import { RatingTable, TABLE_COLUMNS } from "../components/rating/RatingTable";
import { SearchBoxContainer } from "../components/SearchBox";
import { usePeriodWithOffsetState } from "../hooks/tracking";
import { TRACK_PERIODS } from "../lib/constants";
import { getRatingSelector, loadRating } from "../slices/ratingSlice";
import { getData } from "../util/slices";
import { getFavouriteUsersFromStorage } from "../service/favouriteUsers";

const periods = TRACK_PERIODS
const defaultPeriod = periods[1]

const FILTERS = [
  { name: 'all', title: 'All', getFilter: () => {}, },
  { name: 'legends', title: 'Legends', getFilter: () => ({minScore: 1600000}) },
  { name: 'favouriteUsers', title: 'Favourites', getFilter: () => ({ids: getFavouriteUsersFromStorage()})}
]

export function RatingPage() {

  const dispatch = useDispatch()
  const [pagination, setPagination] = useState({page: 0, size: 25})
  const [sort, setSort] = useState({
    column: TABLE_COLUMNS[5],
    direction: 'desc'
  })
  const [filter, setFilter] = useState(FILTERS[0])

  const {period, offset, setPeriod, setOffset, changeOffset, changeDate} = usePeriodWithOffsetState(defaultPeriod, periods)

  const ratingSelector = getRatingSelector(period.name, offset)
  const ratingLoader = useCallback(() => loadRating({
    period: period.name,
    offset,
    queryParams: {
      ...filter.getFilter(),
      page: pagination.page,
      size: pagination.size,
      sort: `${sort.column.sortField ?? sort.column.dataField},${sort.direction}`  
    }
  }), [period, offset, pagination, sort, filter])

  useEffect(() => {
    dispatch(ratingLoader())
  }, [ratingLoader])

  function onTableChange(type, data) {
    if (type === 'sort') {
      const column = TABLE_COLUMNS.filter(c => c.dataField === data.sortField)[0]
      const direction = data.sortOrder
      if (sort.column.dataField !== column.dataField || sort.direction !== direction) {
        setSort({column, direction})
      } 
    } else if (type === 'pagination') {
      const {page, sizePerPage} = data
      setPagination({
        page: page - 1,
        size: sizePerPage
      })
    }
  }

  return (
    <Container fluid='md'>
      <SearchBoxContainer />
      
      <PeriodSelectContainer periods={periods} period={period} 
        isResetDisabled={offset === 0} onPeriodChange={setPeriod} onReset={() => setOffset(0)}>
          <Loader selector={ratingSelector}>
            <LoadedRatingControl selector={ratingSelector} onOffsetChange={changeOffset} onDateChange={changeDate}
              period={period} />
          </Loader>
      </PeriodSelectContainer>
      <div className="mt-3"></div>
      <UncontrolledOptionRadio item={filter} items={FILTERS} onChange={setFilter} />
      <Loader selector={ratingSelector} loader={<></>}>
        <RatingTable ratingSelector={ratingSelector} onTableChange={onTableChange} sort={sort} />
      </Loader>
    </Container>
  )

}

function LoadedRatingControl({selector, ...rest}) {
  const rating = useSelector(getData(selector))
  return <PeriodOffsetSelect from={rating.periodStart} to={rating.periodEnd} {...rest} />
}