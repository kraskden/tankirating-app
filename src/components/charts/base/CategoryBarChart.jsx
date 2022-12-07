import { BarChart, ResponsiveContainer, XAxis, YAxis, Bar, CartesianGrid, Tooltip } from "recharts";

export function CategoryBarChart({ height, data, xKey, yKey, xFormatter,
  tooltipValueFormatter, tooltipLabelFormatter, xDomain, yDomain }) {

  return (
    <ResponsiveContainer height={height}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 25, bottom: 5 }}
      >
        <XAxis type="number" tickFormatter={xFormatter} domain={xDomain}/>
        <YAxis type="category" dataKey={xKey} domain={yDomain} />
        <CartesianGrid strokeDasharray="3 " />
        <Tooltip formatter={tooltipValueFormatter || xFormatter} labelFormatter={tooltipLabelFormatter}/>
        <Bar dataKey={yKey} fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )

}