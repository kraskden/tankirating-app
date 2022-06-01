import {Row} from 'react-bootstrap'

import './SummaryTable.css'

/**
 * Render property table (based on data)
 * data format: 
 * [
 *  [key, value], // Key-value pair
 *  null // Empty value
 * ]
 * @param {data} Array of data 
 */
function PropertyTable({data}) {

  const items = data.map((el, idx) => {
    if (el == null) {
      return (
        <li key={idx}>
          <div className="property-empty"></div>
        </li>
      )
    } else {
      const [k, v] = el
      return (
        <li key={k}>
          <div className="property-key text-nowrap fs-6">{k}</div>
          <div className="property-spacer mx-1"></div>
          <div className="property-value text-nowrap fs-6">{v}</div>
        </li>
      )
    }
  })

  return (
    <div className="property-table">
      {items}
    </div>
  )
}

export function SummaryTable({left, right}) {
  return (
    <Row>
      <div className="col-6">
        <PropertyTable data={left} />
      </div>
      <div className="col-6">
        <PropertyTable data={right} />
      </div>
    </Row>
  )
}