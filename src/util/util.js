
export const getInitOffsetMap = (periods) => periods.reduce((acc, p) => {
  acc[p.name] = 0;
  return acc;
}, {})

export const percentProp = (prop) => prop + 'Percent'