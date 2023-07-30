import { BsStar, BsStarFill } from 'react-icons/bs'

export function FavouriteIcon({ isFav, onToggle, className }) {
  return (
    <span className={`text-primary ${className}`} style={{cursor: 'pointer'}}>
      {isFav ? <BsStarFill onClick={onToggle} /> : <BsStar onClick={onToggle} />}
    </span>
  )
}