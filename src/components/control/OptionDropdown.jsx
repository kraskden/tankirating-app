import { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";


export function UncontrolledOptionDropdown({ items, item, onChange, bg }) {
  const variant = bg || "secondary"

  const title = item ? (item.title || item.name) : "N/S"

  return (
    <DropdownButton className="align-self-start" title={title} variant={variant}>
      {items.map(i => (
        <Dropdown.Item key={i.name} onClick={() => onChange(i)}>{i.title || i.name}</Dropdown.Item>
      ))}
    </DropdownButton>
  )


}

export function OptionDropdown({ items, onChange, defaultItem, bg }) {

  const [item, setItem] = useState(defaultItem || items[0])

  function onItemChange(item) {
    setItem(item)
    onChange && onChange(item)
  }

  return <UncontrolledOptionDropdown item={item} bg={bg} items={items} onChange={onItemChange} />

}