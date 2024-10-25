import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import ItemInCart from '../ItemInCart'

const apiConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  noOrders: 'NOORDERS',
  paymentSuccess: 'PAYMENTSUCCESS',
  foods: 'FOODS',
}

class Cart extends Component {
  state = {
    apiStatus: apiConstants.loading,
    cartItems: [],
    total: '',
  }

  componentDidMount() {
    this.retrevingData()
  }

  placingOrder = () => {
    this.setState({
      apiStatus: apiConstants.paymentSuccess,
    })
  }

  totalPrice = () => {
    const data2 = JSON.parse(localStorage.getItem('cartData'))
    const amount = data2.map(item => item.quantity * item.cost)
    const s = amount.reduce((a, b) => a + b)
    this.setState({
      total: s,
    })
  }

  removing = a => {
    const data2 = JSON.parse(localStorage.getItem('cartData'))
    const filtering = data2.filter(item => item.id !== a)
    localStorage.setItem('cartData', JSON.stringify(filtering))
    this.setState({
      cartItems: filtering,
    })
    if (filtering.length === 0) {
      this.setState({
        apiStatus: apiConstants.noOrders,
      })
    }
    this.totalPrice()
  }

  retrevingData = () => {
    const data = localStorage.getItem('cartData')
    if (data === null || JSON.parse(data).length === 0) {
      this.setState({
        apiStatus: apiConstants.noOrders,
      })
    } else {
      this.setState({
        apiStatus: apiConstants.foods,
        cartItems: JSON.parse(data),
      })
      this.totalPrice()
    }
  }

  loadingView = () => (
    <div className="cart-loader">
      <Loader type="TailSpin" color="#F7931E" height="53" width="53" />
    </div>
  )

  noOrdersView = () => (
    <div className="cart-order">
      <img
        className="no-image"
        alt="empty cart"
        src="https://res.cloudinary.com/dgz4gcw07/image/upload/v1729855943/cooking_1_xxpxfa.png"
      />
      <h1 className="no-head">No Order Yet!</h1>
      <p className="no-para">
        Your cart is empty. Add something from the menu.
      </p>
      <Link to="/">
        <button type="button" className="no-button">
          Order Now
        </button>
      </Link>
    </div>
  )

  paymentView = () => (
    <div className="cart-order">
      <img
        alt="payment"
        src="https://res.cloudinary.com/dgz4gcw07/image/upload/v1729856571/check-circle.1_1_zei0jg.png"
      />
      <h1 className="no-head">Payment Successful</h1>
      <p className="no-para2">
        Thank you for ordering Your payment is successfully completed.
      </p>
      <Link to="/">
        <button type="button" className="payment-button">
          Go To Home Page
        </button>
      </Link>
    </div>
  )

  foodView = () => {
    const {cartItems, total} = this.state
    return (
      <div>
        <div className="food-container">
          <div className="food-in">
            <ul className="food-unorder">
              {cartItems.map(item => (
                <ItemInCart
                  key={item.id}
                  obj={item}
                  removing={this.removing}
                  totalPrice={this.totalPrice}
                />
              ))}
            </ul>
            <hr className="food-line" />
            <div className="food-amount">
              <h1>Order Total:</h1>
              <p data-testid="total-price">₹{total}</p>
            </div>
            <div className="place-container">
              <button
                onClick={this.placingOrder}
                className="place-button"
                type="button"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  parts = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.loading:
        return this.loadingView()
      case apiConstants.noOrders:
        return this.noOrdersView()
      case apiConstants.paymentSuccess:
        return this.paymentView()
      case apiConstants.foods:
        return this.foodView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div>{this.parts()}</div>
      </div>
    )
  }
}
export default Cart
