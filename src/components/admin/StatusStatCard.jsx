import { useEffect, useState } from "react"
import { Card, Spinner } from "react-bootstrap"
import { apiManagementGetTargetStat } from "../../service/management"
import { useLoader } from "../../hooks/loader"

export const StatusStatCard = () => {

  const [stat, error] = useLoader(apiManagementGetTargetStat)

  if (error) {
    console.log(error)
  }
  return (
    <Card className="col-xl-2 col-md-3">
      <Card.Header>Target statuses</Card.Header>

      <Card.Body>
        {stat ?
          <ul>
            {stat.map(e => (
              <li key={e.status}>
                {e.status}: {e.count}
              </li>
            ))}
          </ul>
          : <Spinner />}
      </Card.Body>
    </Card>
  )
}