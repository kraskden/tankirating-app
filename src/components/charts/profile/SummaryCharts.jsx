import { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { makeBarSummaryData } from "../../../lib/chart";

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
      xFormatter={property.tickFormatter}
      tooltipValueFormatter={property.valueFormatter}
      xDomain={[0, 'dataMax']}
    />
  )
}

export function SummaryCharts({ summary, properties, percentLimit }) {

  const [property, setProperty] = useState(properties[0])
  const [activities, setActivities] = useState(makeBarSummaryData(summary, property.name, percentLimit))

  useEffect(() => {
    setActivities(makeBarSummaryData(summary, property.name, percentLimit))
  }, [summary, property, percentLimit])

  const { hulls, turrets, modes, modules } = activities

  return (
    <Card className="mt-2 shadow-sm">
      <Card.Header>
        <OptionRadio items={properties} onChange={setProperty} />
      </Card.Header>
      <Card.Body>
        <div className="row">
          <div className="col-sm-6">
            <SummaryBarChart data={turrets} property={property} />
          </div>
          <div className="col-sm-6">
            <SummaryBarChart data={hulls} property={property} />

          </div>
        </div>
        <div className="row mt-5">
          <div className="col-sm-6">
            <SummaryBarChart data={modes} property={property} />
          </div>
          <div className="col-sm-6">
            <SummaryBarChart data={modules} property={property} />
          </div>
        </div>
      </Card.Body>
    </Card>
  )

}