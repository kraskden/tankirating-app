import Select from 'react-select';
import { useEffect, useMemo, useState } from "react"
import { shallowEqual, useSelector } from "react-redux"
import { FULL_DIFF_FORMAT } from "../../../lib/constants"
import { formatBigNumber, formatHoursTime } from "../../../util/format"
import { getData } from "../../../util/slices"
import { UncontrolledOptionDropdown } from "../../control/OptionDropdown"
import { DiffChartContainer } from "./DiffChartContainer"
import { compareDiffs, makeItemsTracks } from '../../../lib/tracking';


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

// qualitative colour pallete, see: https://tsitsul.in/blog/coloropt/
const COLOR_PALLETE = ["#4053d3", "#ddb310", "#b51d14", "#00beff", "#fb49b0", "#00b25d"]
const MAX_ITEMS = COLOR_PALLETE.length

function ChartWrapper({selector, property, category, selectedItems}) {
  const diffs = useSelector(getData(selector))

  //TODO: Calculates every time items is updated...
  const chartData = useMemo(() => {
    console.log("Ch Wrapper useMemo()")
    // if (!category) {
    //   return "NO_DATA"
    // }
    // console.log(makeItemsTracks(diffs, category.name, property.name))
    return ""
  }, [diffs, category, property])

  if (!(category && selectedItems && selectedItems.length > 0)) {
    return (
      <p className="text-center mb-0 fs-4">
        Select category and items 
      </p>
    )
  }

  return (
    <h1>Chart ...</h1>
  )

}


function ChartControls({selector, category, setCategory, selectedItems, setSelectedItems}) {

  const diffs = useSelector(getData(selector))

  const [items, setItems] = useState([])

  const itemsEmpty = !items || items.length === 0
  
  useEffect(() => {
    console.log(diffs)
    if (!diffs) {
      return
    }
    category && updateItems(category)
  }, [diffs])

  function onCategoryChange(newCategory) {
    setCategory(newCategory)
    updateItems(newCategory)
    setSelectedItems([])

  }

  function updateItems(category) {
    var names = new Set()
    for (const diff of diffs) {
      for (const activity of diff.activities[category.name]) {
        if (activity.time) {
          names.add(activity.name)
        }
      }
    }
    setItems([...names].map(name => ({value: name, label: name})))
  }

  return (
    <div className="d-flex ms-4">
      <UncontrolledOptionDropdown item={category} items={categories} onChange={onCategoryChange} />
      <div className="mx-2"></div>
      <Select
        isDisabled={itemsEmpty}
        options={items} 
        value={selectedItems}
        onChange={setSelectedItems}
        isMulti
        autoFocus
      />
    </div>
  )
}

export function FullDiffChart() {

  const [category, setCategory] = useState(null)
  const [selectedItems, setSelectedItems] = useState([])

  const chartWrapper = ({selector, property}) => (
    <ChartWrapper selector={selector} property={property} 
      category={category} selectedItems={[]} /> 
  )

  const controlsWrapper = ({ selector }) => (
    <ChartControls selector={selector} category={category} setCategory={setCategory}
      selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
  )

  return (
    <DiffChartContainer
      additionalControls={controlsWrapper}
      format={FULL_DIFF_FORMAT}
      properties={properties}
      chartComponent={chartWrapper}
      onDataChanges={() => setSelectedItems([])}
    />
  )

}