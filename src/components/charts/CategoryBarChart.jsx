import { BarChart, ResponsiveContainer, XAxis, YAxis, Bar } from "recharts";

export function CategoryBarChart({ height, data, xKey, yKey }) {

  return (
    <ResponsiveContainer height={height}>
      <BarChart
        width={400}
        height={500}
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis type="number" />
        <YAxis type="category" dataKey={xKey} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Bar dataKey={yKey} fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )

}