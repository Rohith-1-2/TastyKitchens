import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaStar} from 'react-icons/fa'
import Footer from '../Footer'
import Header from '../Header'
import Dishes from '../Dishes'

class SpecificRestaurantDetails extends Component {
  state = {
    condition: true,
    restaurantDetails: {},
  }

  componentDidMount() {
    this.makingRequest()
  }

  changingToCamel = foods =>
    foods.map(item => ({
      name: item.name,
      cost: item.cost,
      foodType: item.food_type,
      imageUrl: item.image_url,
      id: item.id,
      rating: item.rating,
    }))

  converting = fetchedData => ({
    rating: fetchedData.rating,
    id: fetchedData.id,
    name: fetchedData.name,
    costForTwo: fetchedData.cost_for_two,
    cuisine: fetchedData.cuisine,
    imageUrl: fetchedData.image_url,
    reviewsCount: fetchedData.reviews_count,
    opensAt: fetchedData.opens_at,
    location: fetchedData.location,
    itemsCount: fetchedData.items_count,
    foodItems: this.changingToCamel(fetchedData.food_items),
  })

  makingRequest = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      `https://apis.ccbp.in/restaurants-list/${id}`,
      options,
    )
    const fetchedData = await response.json()
    const restaurant = this.converting(fetchedData)
    this.setState({
      restaurantDetails: restaurant,
      condition: false,
    })
  }

  parts = () => {
    const {condition, restaurantDetails} = this.state
    const {
      imageUrl,
      name,
      cuisine,
      location,
      rating,
      reviewsCount,
      costForTwo,
      foodItems,
    } = restaurantDetails
    if (condition) {
      return (
        <div data-testid="restaurant-details-loader" className="details-loader">
          <Loader type="TailSpin" color="#F7931E" height="53" width="53" />
        </div>
      )
    }
    return (
      <div>
        <div className="banner-image">
          <img className="restaurant-pic" alt="restaurant" src={imageUrl} />
          <div>
            <h1 className="banner-head">{name}</h1>
            <p className="banner-para">{cuisine}</p>
            <p className="banner-para">{location}</p>
            <div className="banner-bottom">
              <div>
                <p className="sta-container">
                  <FaStar className="sta" />
                  {rating}
                </p>
                <p className="count-para">{reviewsCount}+ Ratings</p>
              </div>
              <div className="vertical" />
              <div>
                <p className="cost">₹ {costForTwo}</p>
                <p className="count-para">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        <div className="specific-container">
          <ul className="specific-unorder">
            {foodItems.map(item => (
              <Dishes key={item.id} obj={item} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Header />
        <div>{this.parts()}</div>
        <Footer />
      </div>
    )
  }
}
export default SpecificRestaurantDetails
