import { BarChart, ResponsiveContainer, XAxis, YAxis, Bar, CartesianGrid, Tooltip } from "recharts";

export function CategoryBarChart({ height, data, xKey, yKey, options }) {

  const {xFormatter, valueFormatter, tickFormatter} = (options || {})

  return (
    <ResponsiveContainer height={height}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 25, bottom: 5 }}
      >
        <XAxis type="number" tickFormatter={tickFormatter}/>
        <YAxis type="category" dataKey={xKey} />
        <CartesianGrid strokeDasharray="3 " />
        <Tooltip formatter={valueFormatter} labelFormatter={xFormatter}/>
        <Bar dataKey={yKey} fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )

}