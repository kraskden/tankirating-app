import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectors } from "../../util/slices";
import { AbsoluteSpinner, CenterSpinner } from "./Spinners";

export function Loader({ selector, loadEvent, children, loader }) {

  const [statusFetcher, dataFetcher, errorFetcher] = getSelectors(selector)
  const status = useSelector(statusFetcher)
  const error = useSelector(errorFetcher)
  const data = useSelector(dataFetcher)

  const dispatch = useDispatch()

  useEffect(() => {
    if (status === 'idle') {
      dispatch(loadEvent())
    }
  }, [status])

  switch (status) {
    case 'ok':
      return children;
    case 'loading':
      if (data === null) {
        return loader
      } else {
        // Show old data
        return children 
      }
    case 'idle':
      return loader
    case 'error':
      return <p>Error... {error}</p>
  }

}

export function SpinnerLoader({selector, loadEvent, children, variant}) {

  variant = variant || 'center'

  function getSpinner() {
    if (variant == 'absolute') {
      return <AbsoluteSpinner />
    } else {
      return <CenterSpinner />
    }
  }

  return <Loader selector={selector} loadEvent={loadEvent} children={children} loader={getSpinner()} />

}