import { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";


export function OptionDropdown({items, onChange, defaultItem, bg}) {
  
  const [item, setItem] = useState(defaultItem || items[0])

  const variant = bg || "secondary"

  function onItemChange(item) {
    setItem(item)
    onChange && onChange(item.name)
  }

  if (item) {
    return (
      <DropdownButton title={item.title || item.name} variant={variant}>
        {items.map(i => (
          <Dropdown.Item key={i.name} onClick={() => onItemChange(i)}>{i.title || i.name}</Dropdown.Item>
        ))}
      </DropdownButton>
    )
  } else {
    return (
      <DropdownButton title='N/A' variant={variant}>
        
      </DropdownButton>
    )
  }


}