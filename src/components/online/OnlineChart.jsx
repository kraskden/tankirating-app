import { useState } from "react";
import { Card } from "react-bootstrap";
import { DIFF_PERIODS } from "../../lib/constants";
import { UncontrolledOptionRadio } from "../control/OptionRadio";

const VARIANTS = [
  { name: 'ccu', title: 'CCU' },
  { name: 'pcu', title: 'PCU' }
]

function CcuChart() {
  
}

export function OnlineChart() {

  const [variant, setVariant] = useState(VARIANTS[0])
  const [pcuPeriod, setPcuPeriod] = useState(DIFF_PERIODS[0])

  return (
    <Card>
      <Card.Header className="d-flex">
        <UncontrolledOptionRadio item={variant} items={VARIANTS} onChange={setVariant} />
        {variant.name === 'pcu' &&
          <div className="ms-3 d-flex">
            <UncontrolledOptionRadio item={pcuPeriod} items={DIFF_PERIODS} onChange={setPcuPeriod} />
          </div>
        }
      </Card.Header>
      <Card.Body>

      </Card.Body>
    </Card>
  )


}