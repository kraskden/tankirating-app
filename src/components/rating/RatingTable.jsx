import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../util/slices";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Link } from "react-router-dom";

import { getRank } from '../../lib/ranks';
import { formatBigNumber, formatTime } from '../../util/format'

import './RatingTable.css'


const ZERO_PLACEHOLDER = ' - '

export const TABLE_COLUMNS = [
  { dataField: 'position', text: '#', sort: false, headerStyle: () => ({ width: '50px' })},
  { dataField: 'id', sort: false, hidden: true},
  { dataField: 'name', text: 'Nickname', sort: true, sortField: 'target.name', formatter: (cell) => <Link to={`/user/${cell}`}>{cell}</Link> },
  { dataField: 'maxScore', text: 'Rank', sort: true, formatter: getRank },
  { dataField: 'kd', text: 'K/D', sort: true, sortField: 'trackRecord.kd', formatter: (x) => x?.toFixed(2) ?? ZERO_PLACEHOLDER, headerStyle: () => ({ width: '10%' }) },
  { dataField: 'kh', text: 'Kills/13min', sort: true, sortField: 'trackRecord.kt', formatter: (x) => ((x ?? 0) * 13 / 60).toFixed(), headerStyle: () => ({ width: '10%' }) },
  { dataField: 'time', text: 'Time', sort: true, sortField: 'trackRecord.time', formatter: (t) => formatTime(t, ZERO_PLACEHOLDER), headerStyle: () => ({ width: '10%' }) },
  { dataField: 'score', text: 'Score', sort: true, sortField: 'trackRecord.score', formatter: (s) => formatBigNumber(s, ZERO_PLACEHOLDER), headerStyle: () => ({ width: '10%' }) },
  { dataField: 'cry', text: 'Cry', sort: true, sortField: 'trackRecord.cry', formatter: (c) => formatBigNumber(c, ZERO_PLACEHOLDER), headerStyle: () => ({ width: '10%' }) },
]

export function RatingTable({ ratingSelector, onTableChange, sort }) {

  const { ratingData } = useSelector(getData(ratingSelector))

  const { pageable, totalElements, content } = ratingData

  return (
    <BootstrapTable
      bootstrap4
      striped
      wrapperClasses="table-responsive mt-2"
      classes="align-middle"
      remote={{
        sort: true, pagination: true
      }}
      keyField="id"
      data={content}
      columns={TABLE_COLUMNS}
      pagination={paginationFactory({
        page: pageable.pageNumber + 1,
        sizePerPage: pageable.pageSize,
        totalSize: totalElements
      })}
      onTableChange={onTableChange}
      sort={{
        dataField: sort.column.dataField,
        order: sort.direction
      }}
    />
  )


}