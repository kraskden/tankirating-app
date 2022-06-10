import { VictoryPie } from "victory-pie";


export function EmbeddedPieChart({ data }) {
  return (
    <svg width="400" height="400" role="img" viewBox="0 0 400 400" style={{ "pointerEvents": "all", width: "100%", height: "80%" }} >
      <VictoryPie
        data={data}
        style={{
          labels: {
            fontSize: 20
          }
        }}
        colorScale="qualitative"
        standalone={false}
      />
    </svg>
  )
}