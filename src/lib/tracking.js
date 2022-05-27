
export function getSupplyUsages(tracking, name) {
  const supply = tracking.supplies
    .filter(s => s.name === name)[0]
  return supply?.usages ?? 0
}