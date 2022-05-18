
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