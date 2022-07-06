const MODULES_MAP = {
  Fox: "Fire",
  Badger: "Freeze",
  Ocelot: "Isida",
  Weasel: "Tesla",
  Wolf: "Hammer",
  Panther: "Twins",
  Lion: "Rico",
  Dolphin: "Smoky",
  Orka: "Strike",
  Shark: "Vulcan",
  Grizzly: "Thunder",
  Falcon: "Rail",
  Griffin: "Magnum",
  Owl: "Gauss",
  Eagle: "Shaft",
  Spider: "Mines"
}

function getNormalModuleName(name) {
  const turret = MODULES_MAP[name]
  return turret ? `m${turret}` : name.replace("Spectrum ", "Spec-");
}

function humanizeTrackModuleNames(track) {
  if (track.activities && track.activities.modules) {
    for (const m of track.activities.modules) {
      // So, Opex, fuck you
      m.name = getNormalModuleName(m.name)
    }
  }
}


function addAdditionalTrackProperties(track) {
  track.kd = track.deaths ? track.kills / track.deaths : null;
  track.kh = track.time ? Math.round(track.kills * 3600 / track.time) : null;

  if (track.activities) {
    for (const k in track.activities) {
      for (const entry of track.activities[k]) {
        entry.sh = entry.time ? Math.round(entry.score * 3600 * 100 / entry.time) / 100 : undefined
      }
    }
  }

}

export function postProcessTrack(track) {
  humanizeTrackModuleNames(track)
  addAdditionalTrackProperties(track)
}

export function makeActivitiesDataRelative(track) {
  if (track.activities) {
    for (const k in track.activities) {
      const total = track.activities[k].reduce((acc, curr) => ({
        time: acc.time + curr.time, 
        score: acc.score+ curr.score
      }), {time: 0,score: 0})
      for (const entry of track.activities[k]) {
        entry.time = total.time === 0 ? 0 : entry.time / total.time
        entry.score = total.score === 0 ? 0 : entry.score / total.score
      }
    }
  }
}


export function getSupplyUsages(tracking, name) {
  const supply = tracking.supplies
    .filter(s => s.name === name)[0]
  return supply?.usages ?? 0
}

export function getTrackActivityNames(tracks, category, property) {
  var names = new Map()
  for (const track of tracks) {
    for (const activity of track.activities[category]) {
      if (activity.time) {
        const existedTime = names.get(activity.name) || 0
        names.set(activity.name, existedTime + activity[property])
      }
    }
  }
  return [...names.entries()].sort(([k1, v1], [k2, v2]) => v2 - v1).map(pair => pair[0])
}

export function makeItemsTracks(tracks, category, property, items) {
  
  function makeItemsTrack(track) {
    const {periodStart, periodEnd, trackStart, trackEnd, activities} = track
    
    const trackMap = activities[category].reduce((acc, curr) => {
      acc[curr.name] = curr[property]
      return acc
    }, {})

    return items.reduce((acc, item) => {
      acc[item.value] = trackMap[item.value] || 0
      return acc
    }, {periodStart, periodEnd, trackStart, trackEnd})    
  }

  return tracks.map(makeItemsTrack)
}

