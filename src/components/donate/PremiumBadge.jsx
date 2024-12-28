import { Badge } from "react-bootstrap";
import { AbbrContent } from "../Util.jsx";

const { STATUSES } = require("../../lib/constants.js");

const statusMeta = STATUSES.PREMIUM

export function DonatePremiumBadge() {
    return (
        <Badge pill bg={statusMeta.bg} className="fs-6" >
            <AbbrContent abbr={statusMeta.abbr} content={statusMeta.title} />
        </Badge>
    )
}
