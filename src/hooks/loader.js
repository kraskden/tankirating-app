import { useEffect, useState } from "react";

export function useLoader(loader) {

  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    loader()
      .then(data => {
        setData(data)
        setError(null)
      })
      .catch(err => {
        setData(null)
        setError(err)
      })
  }, [])

  return [data, error];
}