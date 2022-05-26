import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


export function SingleLineChart({ height, data, xKey, yKey, options} ) {
  const {xFormatter, yFormatter} = (options || {})

  return (
    <ResponsiveContainer width='100%' height={height}>
      <LineChart data={data}>
        <Line type='monotone' dataKey={yKey} stroke='#3a3af9' animationDuration={500}/>
        <CartesianGrid stroke="#373737" strokeDasharray="5 5" />
        <XAxis dataKey={xKey} tickFormatter={xFormatter} interval='preserveStartEnd'/>
        <YAxis dataKey={yKey} domain={[0, 'auto']} tickFormatter={yFormatter} />
        <Tooltip formatter={yFormatter} labelFormatter={xFormatter}/>
      </LineChart>
    </ResponsiveContainer>
  );
}