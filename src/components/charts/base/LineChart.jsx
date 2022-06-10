import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';


function BaseChart({ height, data, xKey, options, children }) {

  if (data.length === 0) {
    return <></>
  }
  const { xFormatter, yFormatter } = (options || {})

  return (
    <ResponsiveContainer width='100%' height={height}>
      <LineChart data={data}>
        {children}
        <CartesianGrid stroke="#373737" strokeDasharray="5 5" />
        <XAxis dataKey={xKey} tickFormatter={xFormatter} interval='preserveStartEnd' />
        <YAxis domain={[0, 'auto']} tickFormatter={yFormatter} />
        <Tooltip formatter={yFormatter} labelFormatter={xFormatter} />
      </LineChart>
    </ResponsiveContainer>
  );

}

export function MultiLineChart({ dataKeys, colors, ...rest }) {

  return (
    <BaseChart {...rest}>
      {dataKeys.map((k, idx) => (
        <Line key={k} type='monotone' dataKey={k} stroke={colors[idx]} animationDuration={500} />
      ))}
      <Legend />
    </BaseChart>
  )

}

export function SingleLineChart({ yKey, ...rest }) {

  return (
    <BaseChart {...rest}>
      <Line type='monotone' dataKey={yKey} stroke='#3a3af9' animationDuration={500} />\
    </BaseChart>
  )
}