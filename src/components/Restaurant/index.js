import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import './index.css'

class Restaurant extends Component {
  render() {
    const {obj} = this.props
    const {imageUrl, name, cuisine, userRating, id} = obj
    const {rating, totalReviews} = userRating
    return (
      <li className="rest-item" data-testid="restaurant-item">
        <Link className="rest-link" to={`/restaurant/${id}`}>
          <img className="rest-image" alt="restaurant" src={imageUrl} />
          <div className="desp">
            <h1 className="rest-head">{name}</h1>
            <p className="rest-para">{cuisine}</p>
            <div className="star-container">
              <FaStar className="star" />
              <p className="star-rating">{rating}</p>
              <p className="star-review">({totalReviews} ratings)</p>
            </div>
          </div>
        </Link>
      </li>
    )
  }
}
export default Restaurant
