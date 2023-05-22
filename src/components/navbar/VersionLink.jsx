import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";

import {MdOutlineNewReleases as ReleaseIcon} from 'react-icons/md'
import { apiGetVersion } from "../../service/version";
import { differenceInDays } from "date-fns";

export function VersionLink() {

  const [version, setVersion] = useState(null)

  useEffect(() => {
    apiGetVersion()
      .then(setVersion)
      .catch(() => setVersion(null))
  }, [])

  if (!version) {
    return <></>
  }
  
  const isNew = differenceInDays(new Date(version.buildAt), new Date()) < 7

  return (
    <Nav.Link className="fw-semibold mx-lg-3 fs-5">
      <div className="d-flex align-items-center">
       <span>v{version.version}</span>
       {isNew && <ReleaseIcon className="fs-5 ms-1"/>}
      </div>
    </Nav.Link>
  )

}