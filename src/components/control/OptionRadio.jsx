import { ButtonGroup, ToggleButton } from "react-bootstrap"
import {useState} from 'react';

export function OptionRadio({items, onChange, defaultItem, bg}) {

  const [item, setItem] = useState(defaultItem || items[0])

  const variant = bg || "secondary"

  function onItemChange(item) {
    setItem(item)
    onChange && onChange(item.name)
  }

  return (
    <ButtonGroup>
      {items.map(i => (
        <ToggleButton
          variant={variant}
          key={i.name}
          type="radio"
          value={i.name}
          checked={item.name === i.name}
          onClick={() => onItemChange(i)}
        >
          {i.title}
        </ToggleButton>
      ))}
    </ButtonGroup>
  )

}