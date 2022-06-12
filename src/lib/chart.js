import { toISODate } from "../util/format";

export function makePieTimeData(activities, countLimit = 5, percentLimit = 1/16) {


  let data = activities.filter(a => a.time > 0);
  const totalTime = data.reduce((acc, curr) => acc + curr.time, 0)

  data = data
    .sort((a, b) => b.time - a.time)
    .filter(x => (x.time / totalTime) > percentLimit)
    .slice(0, countLimit)
    .map(act => ({name: act.name, time: act.time}))
  
  let otherTime = totalTime - data.reduce((acc, curr) => acc + curr.time, 0)

  if (otherTime) {
    data.push({
      name: "Others",
      time: otherTime
    })
  }

  return data.map(e => ({
    x: e.name, 
    y: e.time
  }))
  
}

/**
 * For CCU chart X-Axis tick is draw for point in the middle of the day.
 * Vertical reference line is drawn on every day start
 */
export function makeCcuTickIndexes(data) {
  const dayMap = {}
  data.forEach((entry, idx) => {
    const key = toISODate(entry.timestamp)
    dayMap[key] = dayMap[key] ?? {start: idx, end: idx}
    dayMap[key].end = idx
  });
  const tickIndexes = new Set(Object.values(dayMap).map(pair => Math.round((pair.start + pair.end) / 2)))
  const referenceKeys = Object.values(dayMap).map(p => p.start).map(idx => data[idx].timestamp)

  return {tickIndexes, referenceKeys}
}