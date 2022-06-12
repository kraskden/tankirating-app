import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { ONLINE_COLOR_PALLETE } from "../../../lib/constants";
import { getPcuSelector } from "../../../slices/onlineSlice";
import { getData } from "../../../util/slices";

const [onlineColor, inbattlesColor] = ONLINE_COLOR_PALLETE


export function PcuChart({ period, selector, height, zoom }) {

  const data = useSelector(getData(selector))

  const minimum = data.map(e => e.inbattlesPcu).reduce((acc, curr) => Math.min(acc, curr))

  return (
    <ResponsiveContainer width='100%' height={height}>
      <LineChart data={data}>
        <Line type='monotone' dataKey='onlinePcu' stroke={onlineColor} dot={false} />
        <Line type='monotone' dataKey='inbattlesPcu' stroke={inbattlesColor} dot={false} />
        <XAxis dataKey='periodStart' tickFormatter={period.formatter}/>
        <YAxis scale='linear' dataKey='onlinePcu' domain={[zoom ? minimum - 200 : 0, 'dataMax']} />
        <Tooltip labelFormatter={period.formatter}/>
        <CartesianGrid vertical={false} />
      </LineChart>
    </ResponsiveContainer>
  )

}