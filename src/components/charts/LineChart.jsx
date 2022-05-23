import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


export function LineChart({ height, data, xKey, yKey, options} ) {
  const {xTickFormatter, yTickFormatter} = (options || {})

  return (
    <ResponsiveContainer width='100%' height={height}>
      <LineChart data={data}>
        <Line type='monotone' dataKey={yKey} stroke='#3a3af9' />
        <CartesianGrid stroke="#373737" strokeDasharray="5 5" />
        <XAxis dataKey={xKey} tickFormatter={xTickFormatter}/>
        <YAxis dataKey={yKey} domain={[0, 'auto']} tickFormatter={yTickFormatter} />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}