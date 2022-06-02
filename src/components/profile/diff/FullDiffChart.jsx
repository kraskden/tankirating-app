import { useState } from "react"
import { useSelector } from "react-redux"
import { FULL_DIFF_FORMAT } from "../../../lib/constants"
import { formatBigNumber, formatHoursTime } from "../../../util/format"
import { getData } from "../../../util/slices"
import { UncontrolledOptionDropdown } from "../../control/OptionDropdown"
import { DiffChartContainer } from "./DiffChartContainer"


const properties = [
  { name: 'time', title: 'Time', formatter: (time) => time ? formatHoursTime(time) : 0 },
  { name: 'score', title: 'Score', formatter: formatBigNumber },
]

const categories = [
  { name: 'hulls', title: 'Hulls' },
  { name: 'turrets', title: 'Turrets' },
  { name: 'modes', title: 'Modes' },
  { name: 'modules', title: 'Modules' }
]

export function FullDiffChart() {

  const [category, setCategory] = useState(null)
  const [items, setItems] = useState([])
  const [item, setItem] = useState(null)


  const chartWrapper = (props) => {
    console.log(props)
    console.log(category)
    console.log(item)
    return (
      <h1>Chart...</h1>
    )
  }

  const Controls = ({ selector }) => {

    const diffs = useSelector(getData(selector))

    function onCategoryChange(newCategory) {
      setCategory(newCategory)
      var names = new Set()
      for (const diff of diffs) {
        for (const activity of diff.activities[newCategory]) {
          names.add(activity.name)
        }
      }
      setItems([...names].map(name => ({ name })))
      setItem(null)

    }

    return (
      <div className="d-flex ms-auto">
        <UncontrolledOptionDropdown item={category} items={categories} onChange={onCategoryChange} />
        <div className="mx-1"></div>
        <UncontrolledOptionDropdown item={item} items={items} onChange={setItem} />
      </div>
    )
  }

  return (
    <DiffChartContainer
      additionalControls={Controls}
      format={FULL_DIFF_FORMAT}
      properties={properties}
      chartComponent={chartWrapper}
    />
  )

}