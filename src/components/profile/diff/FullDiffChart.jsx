import Select from 'react-select';
import { createRef, useEffect, useMemo, useState } from "react"
import { Provider, shallowEqual, useSelector } from "react-redux"
import { CHART_COLOR_PALLETE, FULL_DIFF_FORMAT } from "../../../lib/constants"
import { formatBigNumber, formatHoursTime } from "../../../util/format"
import { getData } from "../../../util/slices"
import { UncontrolledOptionDropdown } from "../../control/OptionDropdown"
import { DiffChartContainer } from "./DiffChartContainer"
import { getTrackActivityNames, makeItemsTracks } from '../../../lib/tracking';
import { Button } from 'react-bootstrap';
import { MultiLineChart } from '../../charts/LineChart';


const properties = [
  { name: 'time', title: 'Time', formatter: (time) => time ? formatHoursTime(time) : 0 },
  { name: 'score', title: 'Score', formatter: formatBigNumber },
  { name: 'sh', title: 'Score/Hour'}
]

const categories = [
  { name: 'hulls', title: 'Hulls' },
  { name: 'turrets', title: 'Turrets' },
  { name: 'modes', title: 'Modes' },
  { name: 'modules', title: 'Modules' }
]

const MAX_ITEMS = CHART_COLOR_PALLETE.length

function ChartWrapper({ selector, property, category, period, selectedItems }) {
  const diffs = useSelector(getData(selector))

  const chartData = useMemo(() => {
    if (!property || !category || !diffs) {
      return null
    }
    return makeItemsTracks(diffs, category.name, property.name, selectedItems)
  }, [diffs, category, property])

  if (!(category && selectedItems && selectedItems.length > 0)) {
    return (
      <p className="text-center mb-0 fs-4">
        Select category and items
      </p>
    )
  }

  return (
    <MultiLineChart 
      height={450}
      dataKeys={selectedItems.map(i => i.value)}
      colors={CHART_COLOR_PALLETE}
      data={chartData}
      xKey='periodStart'
      options={{
        xFormatter: period.formatter,
        yFormatter: property.formatter
      }}
    />
  )

}

export function FullDiffChart() {

  const [category, setCategory] = useState(null)
  const [selectedItems, setSelectedItems] = useState([])

  const chartWrapper = ({ selector, property, period }) => (
    <ChartWrapper selector={selector} property={property}
      period={period} category={category} selectedItems={selectedItems} />
  )

  const ControlsWrapper = ({ selector, property }) => {

    const diffs = useSelector(getData(selector))

    const [items, setItems] = useState([])

    const itemsEmpty = !items || items.length === 0

    useEffect(() => {
      category && updateItems(category)
    }, [diffs])

    function onCategoryChange(newCategory) {
      setCategory(newCategory)
      updateItems(newCategory)
      setSelectedItems([])
    }

    function updateItems(category) {
      setItems(getTrackActivityNames(diffs, category.name, property.name).map(name => ({ value: name, label: name })))
    }

    return (
      <div className="d-flex ms-4">
        <UncontrolledOptionDropdown item={category} items={categories} onChange={onCategoryChange} />
        <div className="mx-2"></div>
        {itemsEmpty ? <Button variant='danger'>{category ? "No data" : "Select category"}</Button> : 
        <Select
          options={items}
          value={selectedItems}
          onChange={setSelectedItems}
          isMulti
          autoFocus
          isOptionDisabled={() => selectedItems.length > MAX_ITEMS}
          placeholder='Select items...'
        />}
      </div>
    )
  }

  return (
    <DiffChartContainer
      additionalControls={ControlsWrapper}
      format={FULL_DIFF_FORMAT}
      properties={properties}
      chartComponent={chartWrapper}
      onDataChanges={() => setSelectedItems([])}
    />
  )

}