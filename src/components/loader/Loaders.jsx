import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectors } from "../../util/slices";
import {  CenterSpinner } from "./Spinners";

export function Loader({ selector, loadEvent, children, loader, errorHandler }) {

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

  if (data != null) {
    return children;
  }

  const ErrorHandler = errorHandler

  switch (status) {
    case 'ok':
      return children;
    case 'loading':
    case 'idle':
      return loader ?? <CenterSpinner />
    case 'error':
      return errorHandler ? <ErrorHandler error={JSON.parse(error.name)} /> :
       <p>Error: {error.message}</p>
  }
}