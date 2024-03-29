import { batteryEnabled, getSupplyUsages } from "../../../lib/tracking"
import { getDaysBetweenDates } from "../../../util/date"
import { btrPhBgMatcher, CryBadge, cryPhBgMatcher, ddPhBgMatcher, KdBadge, killsPhBgMatcher, PerHourBadge, PremiumBadge, scorePhBgMatcher, TimePerDayBadge, } from "./Badges"


export function SummaryBadges({ summary }) {

  const { kills, deaths, cry, score, time, activities, supplies, premiumDays } = summary

  const days = Math.max(1, getDaysBetweenDates(summary.trackStart, summary.trackEnd) + 1)

  const batteries = getSupplyUsages(summary, 'BATTERY')
  const dd = getSupplyUsages(summary, 'DD')

  const badges = [
    <KdBadge key='kdph' kills={kills} deaths={deaths} />,
    batteryEnabled(new Date(summary.trackEnd)) ? <PerHourBadge key='btrph' value={batteries} time={time} valueTitle='BTR' bgMatcher={btrPhBgMatcher} /> : <></>,
    <PremiumBadge key='prem' premiumDays={premiumDays} totalDays={days} />,
    <PerHourBadge key='ddph' value={dd} time={time} valueTitle='DD' bgMatcher={ddPhBgMatcher} />,

    <PerHourBadge key='cryph' value={cry} time={time} valueTitle='CRY' bgMatcher={cryPhBgMatcher} />,
    <PerHourBadge key='scoreph' value={score} time={time} valueTitle='SCORE' bgMatcher={scorePhBgMatcher} />,
    <TimePerDayBadge key='timepd' time={time} totalDays={days} />,
    <PerHourBadge key='killph' value={kills} time={time} valueTitle='KILLS' bgMatcher={killsPhBgMatcher} />
  ]

  return (
    <>
      <div className="d-flex flex-wrap justify-content-start">
        {badges}
      </div>
    </>
  )
}