import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectors } from "../../util/slices";

export function PageLoader({ selector, loadEvent, children }) {

  const [statusFetcher, _, errorFetcher] = getSelectors(selector)
  const status = useSelector(statusFetcher)
  const error = useSelector(errorFetcher)

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
    case 'idle':
      return <p>Loading...</p>
    case 'error':
      return <p>Error...</p>
  }

}