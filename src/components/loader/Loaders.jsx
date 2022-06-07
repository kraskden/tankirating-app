import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectors } from "../../util/slices";
import {  CenterSpinner } from "./Spinners";


export function Loader({ selector, loadEvent, children, loader, idleLoader, errorHandler }) {

  const [statusFetcher, dataFetcher, errorFetcher] = getSelectors(selector)
  const status = useSelector(statusFetcher)
  const error = useSelector(errorFetcher)
  const data = useSelector(dataFetcher)

  const dispatch = useDispatch()

  useEffect(() => {
    if (status === 'idle' && loadEvent) {
      const action = loadEvent()
      if (action) {
        dispatch(action)
      }
    }
  }, [status, loadEvent])

  if (data != null) {
    return children;
  }

  const ErrorHandler = errorHandler

  switch (status) {
    case 'ok':
      return children;
    case 'idle':
      if (idleLoader) {
        return idleLoader
      }
    case 'loading':
      return loader ?? <CenterSpinner />
    case 'error':
      return errorHandler ? <ErrorHandler error={error.name && JSON.parse(error.name)} /> :
       <p>Error: {error.message}</p>
  }
}