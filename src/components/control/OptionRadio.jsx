import { ButtonGroup, ToggleButton } from "react-bootstrap"
import {useState} from 'react';

export function UncontrolledOptionRadio({item, items, onChange, bg}) {
  const variant = bg || "secondary"

  return (
    <ButtonGroup>
      {items.map(i => (
        <ToggleButton
          variant={variant}
          key={i.name}
          type="radio"
          value={i.name}
          checked={item.name === i.name}
          onClick={() => onChange(i)}
        >
          {i.title}
        </ToggleButton>
      ))}
    </ButtonGroup>
  )
}

export function OptionRadio({items, onChange, defaultItem, bg}) {

  const [item, setItem] = useState(defaultItem || items[0])

  function onItemChange(item) {
    setItem(item)
    onChange && onChange(item)
  }

  return (
    <UncontrolledOptionRadio 
      bg={bg}
      item={item}
      onChange={onItemChange}
      items={items}
    />
  )

}