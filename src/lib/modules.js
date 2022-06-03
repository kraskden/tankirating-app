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

export function getNormalModuleName(name) {
  const turret = MODULES_MAP[name]
  return turret ? `m${turret}` : name;
}

export function humanizeTrackModuleNames(track) {
  if (track.activities && track.activities.modules) {
    for (const m of track.activities.modules) {
      // So, Opex, fuck you
      m.name = getNormalModuleName(m.name)
    }
  }
}