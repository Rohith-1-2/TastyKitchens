import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import Cookies from 'js-cookie'
import {MdSort} from 'react-icons/md'
import {AiOutlineLeftSquare, AiOutlineRightSquare} from 'react-icons/ai'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Restaurant from '../Restaurant'
import Footer from '../Footer'
import Offers from '../Offers'

const sortByOptions = [
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
]

class Home extends Component {
  state = {
    condition: true,
    cond2: true,
    offersAll: [],
    restaurantsAll: [],
    pageNumber: 1,
    dropDown: 'Lowest',
    searchInput: '',
  }

  componentDidMount() {
    this.makingRequest()
    this.obtainingRestaurants()
  }

  changingOption = e => {
    this.setState(
      {
        dropDown: e.target.value,
      },
      this.obtainingRestaurants,
    )
  }

  userChangingInput = e => {
    this.setState({
      searchInput: e.target.value,
    })
  }

  leftMove = () => {
    const {pageNumber} = this.state
    if (pageNumber > 1) {
      this.setState(
        prevState => ({
          pageNumber: prevState.pageNumber - 1,
        }),
        this.obtainingRestaurants,
      )
    }
  }

  rightMove = () => {
    const {pageNumber} = this.state
    if (pageNumber < 4) {
      this.setState(
        prevState => ({
          pageNumber: prevState.pageNumber + 1,
        }),
        this.obtainingRestaurants,
      )
    }
  }

  searchingBasedOnInput = () => {
    this.obtainingRestaurants()
  }

  updatingOffers = offersList =>
    offersList.map(item => ({
      imageUrl: item.image_url,
      id: item.id,
    }))

  rating = obj => ({
    ratingText: obj.rating_text,
    ratingColor: obj.rating_color,
    totalReviews: obj.total_reviews,
    rating: obj.rating,
  })

  updatingRestaurants = array1 =>
    array1.map(item => ({
      hasOnlineDelivery: item.has_online_delivery,
      userRating: this.rating(item.user_rating),
      name: item.name,
      hasTableBooking: item.has_table_booking,
      isDeliveringNow: item.is_delivering_now,
      costForTwo: item.cost_for_two,
      cuisine: item.cuisine,
      imageUrl: item.image_url,
      id: item.id,
      menuType: item.menu_type,
      location: item.location,
      opensAt: item.opens_at,
      groupByTime: item.group_by_time,
    }))

  obtainingRestaurants = async () => {
    this.setState({
      cond2: true,
    })
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const {dropDown, pageNumber, searchInput} = this.state
    const restaurantsResponse = await fetch(
      `https://apis.ccbp.in/restaurants-list?offset=${
        (pageNumber - 1) * 9
      }&limit=9&sort_by_rating=${dropDown}&search=${searchInput}`,
      options,
    )
    const retrivedData = await restaurantsResponse.json()
    const resLists = this.updatingRestaurants(retrivedData.restaurants)
    this.setState({
      restaurantsAll: resLists,
      cond2: false,
    })
  }

  makingRequest = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      'https://apis.ccbp.in/restaurants-list/offers',
      options,
    )
    const fetchedData = await response.json()
    const offers = this.updatingOffers(fetchedData.offers)
    this.setState({
      offersAll: offers,
      condition: false,
    })
  }

  parts = () => {
    const {condition, offersAll} = this.state
    if (condition) {
      return (
        <div className="loadingOffers" data-testid="restaurants-offers-loader">
          <Loader type="TailSpin" color="#F7931E" height="53" width="53" />
        </div>
      )
    }
    return <Offers listOffers={offersAll} />
  }

  restaurantsList = () => {
    const {cond2, restaurantsAll} = this.state
    if (cond2) {
      return (
        <div className="loadingOffers" data-testid="restaurants-list-loader">
          <Loader type="TailSpin" color="#F7931E" height="53" width="53" />
        </div>
      )
    }
    return (
      <ul className="restaurant-unorder">
        {restaurantsAll.map(item => (
          <Restaurant key={item.id} obj={item} />
        ))}
      </ul>
    )
  }

  render() {
    const {dropDown, pageNumber} = this.state
    return (
      <div>
        <Header />
        <div className="success-card">
          <div className="success-inner-card">
            {this.parts()}
            <div className="popular-restaurant">
              <h1 className="restaurant-head">Popular Restaurants</h1>
              <div className="filter-container">
                <p className="filter-para">
                  Select Your favourite restaurant special dish and make your
                  day happy...
                </p>
                <div className="drop-container">
                  <MdSort className="icon-1" />
                  <p className="sort-para">Sort by {dropDown}</p>
                  <select onChange={this.changingOption} className="drop">
                    {sortByOptions.map(item => (
                      <option key={item.id} value={item.value}>
                        {item.displayText}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="search-container">
                <input
                  onChange={this.userChangingInput}
                  className="searching"
                  type="search"
                  placeholder="Search"
                />
                <button
                  type="button"
                  onClick={this.searchingBasedOnInput}
                  className="searchButton"
                >
                  <BsSearch />
                </button>
              </div>
              <hr className="hr-line" />
              {this.restaurantsList()}
              <div className="pagination">
                <button
                  onClick={this.leftMove}
                  data-testid="pagination-left-button"
                  className="but"
                  type="button"
                >
                  <AiOutlineLeftSquare className="arrow-icon" />
                </button>
                <p className="page">
                  <span data-testid="active-page-number">{pageNumber}</span> of
                  4
                </p>
                <button
                  type="button"
                  onClick={this.rightMove}
                  data-testid="pagination-right-button"
                  className="but"
                >
                  <AiOutlineRightSquare className="arrow-icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
export default Home
