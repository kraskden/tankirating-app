import { useEffect, useState } from "react"
import { Card } from "react-bootstrap"

import { OptionRadio } from "../../control/OptionRadio"
import { CategoryBarChart } from '../base/CategoryBarChart';


function SummaryBarChart({ data, property }) {
  const height = 30 * data.length + 40;
  return (
    <CategoryBarChart
      height={height}
      data={data}
      xKey='name'
      yKey={property.name}
      options={{
        valueFormatter: property.valueFormatter,
        tickFormatter: property.tickFormatter
      }}
    />
  )
}

export function SummaryCharts({ summary, properties }) {

  const [property, setProperty] = useState(properties[0])
  const [activities, setActivities] = useState(getSortedActivities())

  useEffect(() => {
    setActivities(getSortedActivities())
  }, [summary, property])

  const { hulls, turrets, modes, modules } = activities

  function getSortedActivities() {
    return ['hulls', 'turrets', 'modes', 'modules'].reduce((acc, activity) => {
      const data = [...summary.activities[activity]]
      data.sort((a, b) => b[property.name] - a[property.name])
      acc[activity] = data
      return acc;
    }, {})
  }

  return (
    <Card className="mt-2 shadow-sm">
      <Card.Header>
        <OptionRadio items={properties} onChange={setProperty} />
      </Card.Header>
      <Card.Body>
        <div className="row">
          <div className="col-md-6">
            <SummaryBarChart data={turrets} property={property} />
          </div>
          <div className="col-md-6">
            <SummaryBarChart data={hulls} property={property} />

          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6">
            <SummaryBarChart data={modes} property={property} />
          </div>
          <div className="col-md-6">
            <SummaryBarChart data={modules} property={property} />
          </div>
        </div>
      </Card.Body>
    </Card>
  )

}