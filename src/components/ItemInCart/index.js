import {Component} from 'react'
import './index.css'

class ItemInCart extends Component {
  state = {
    cond12: '',
  }

  onDecrement12 = () => {
    const {obj, removing, totalPrice} = this.props
    const {id} = obj
    const data2 = JSON.parse(localStorage.getItem('cartData'))
    const virat = data2.find(item => {
      if (item.id === id) {
        return true
      }
      return false
    })
    if (virat.quantity > 1) {
      const array1 = data2.map(item => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity - 1,
          }
        }
        return {...item}
      })
      localStorage.setItem('cartData', JSON.stringify(array1))
      totalPrice()
    } else {
      removing(id)
    }
    this.setState({
      cond12: 'er',
    })
  }

  onIncrement12 = () => {
    const {obj, totalPrice} = this.props
    const {id} = obj
    const data2 = JSON.parse(localStorage.getItem('cartData'))
    const array1 = data2.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        }
      }
      return {...item}
    })
    localStorage.setItem('cartData', JSON.stringify(array1))
    this.setState({
      cond12: 'er',
    })
    totalPrice()
  }

  render() {
    const {obj} = this.props
    const {cost, id, imageUrl, name} = obj
    const data1 = JSON.parse(localStorage.getItem('cartData'))
    const virat = data1.find(item => {
      if (item.id === id) {
        return true
      }
      return false
    })
    return (
      <li data-testid="cartItem" className="in-item">
        <div className="box1">
          <img className="in-image" alt={name} src={imageUrl} />
          <h1 className="in-head">{name}</h1>
        </div>
        <div className="count-container">
          <button
            type="button"
            data-testid="decrement-quantity"
            className="decrement-button"
            onClick={this.onDecrement12}
          >
            -
          </button>
          <div data-testid="item-quantity" className="active-number">
            {virat.quantity}
          </div>
          <button
            type="button"
            data-testid="increment-quantity"
            className="decrement-button"
            onClick={this.onIncrement12}
          >
            +
          </button>
        </div>
        <p className="in-para">₹ {virat.quantity * cost}</p>
      </li>
    )
  }
}
export default ItemInCart
