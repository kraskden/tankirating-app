
export function getSupplyUsages(tracking, name) {
  const supply = tracking.supplies
    .filter(s => s.name === name)[0]
  return supply?.usages ?? 0
}

export function makeItemsTracks(tracks, category, property) {
  
  function makeItemsTrack(track) {
    console.log(track)
    const {periodStart, periodEnd, trackStart, trackEnd, activities} = track 
    return activities[category].reduce((acc, curr) => {
      acc[curr.name] = curr[property]
      return acc
    }, {periodStart, periodEnd, trackStart, trackEnd})
  }

  return tracks.map(makeItemsTrack)
}