import { format } from "date-fns";
import { useSelector } from "react-redux";
import { LineChart, ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from "recharts";
import { makeCcuTickIndexes } from "../../../lib/chart";
import { ONLINE_COLOR_PALLETE } from "../../../lib/constants";
import { getCcu } from "../../../slices/onlineSlice";
import { getData } from "../../../util/slices";

const [onlineColor, inbattlesColor] = ONLINE_COLOR_PALLETE


function CustomizedTick({ x, y, payload, tickIndexes }) {
  const date = new Date(payload.value)
  const fmtDate = format(date, 'd/M')
  if (tickIndexes.has(payload.index)) {
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666">{fmtDate}</text>
      </g>
    );
  } else {
    return null
  }
}
 

export function CcuChart({ height }) {

  const data = useSelector(getData(getCcu))

  if (!data || data.length == 0) {
    return <></>
  }

  const {referenceKeys, tickIndexes} = makeCcuTickIndexes(data)

  return (
    <ResponsiveContainer width='100%' height={height}>
      <LineChart data={data}>
        <Line type='monotone' dataKey='online' stroke={onlineColor} dot={false} />
        <Line type='monotone' dataKey='inbattles' stroke={inbattlesColor} dot={false} />
        <XAxis dataKey='timestamp' tickLine={false} interval={0} tick={<CustomizedTick tickIndexes={tickIndexes}/>}/>
        <YAxis dataKey='online' scale="linear" domain={[0, 'dataMax']} />
        <CartesianGrid vertical={false}/>
        {referenceKeys.map(k => <ReferenceLine key={k} x={k} />)}
        <Tooltip labelFormatter={(dateStr) => format(new Date(dateStr), 'MMM do h:mm') + ' (MSK)'}/>
      </LineChart>
    </ResponsiveContainer>
  )

}