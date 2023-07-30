import { Card } from "react-bootstrap"
import { getRank } from "../../../lib/ranks"
import { useDispatch, useSelector } from "react-redux"
import { addFavUser, getFavUsers, removeFavUser } from "../../../slices/favouriteUsersSlice"
import { FavouriteIcon } from "../../FavouriteIcon"

export const UserInfo = ({ user, snapshot }) => {

  const dispatch = useDispatch()
  const favourites = useSelector(getFavUsers)
  const isFav = favourites.includes(user.id)

  function toggleFav() {
    isFav ? dispatch(removeFavUser(user.id)) : dispatch(addFavUser(user.id))
  }

  return (
    <div className="d-flex align-items-baseline mb-1">
      <div className="d-flex align-items-baseline">
        <Card.Title className="d-inline fs-4 me-2 my-0" >{user.name}</Card.Title>
        <Card.Subtitle className="d-inline text-muted fs-6 my-0">{getRank(snapshot.score)}</Card.Subtitle>
        <FavouriteIcon className="align-self-center ms-2" isFav={isFav} onToggle={toggleFav}/>
      </div>
    </div>
  )
}
