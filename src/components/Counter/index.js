import {Component} from 'react'

import './index.css'

class Counter extends Component {
  state = {count: 1}

  onDecrement = () => {
    const {count} = this.state
    const {backDoor, iden} = this.props
    if (count > 1) {
      this.setState(prevState => ({
        count: prevState.count - 1,
      }))
      const data2 = JSON.parse(localStorage.getItem('cartData'))
      const array1 = data2.map(item => {
        if (item.id === iden) {
          return {
            ...item,
            quantity: item.quantity - 1,
          }
        }
        return {...item}
      })
      localStorage.setItem('cartData', JSON.stringify(array1))
    } else {
      backDoor()
    }
  }

  onIncrement = () => {
    const {iden} = this.props
    this.setState(prevState => ({
      count: prevState.count + 1,
    }))
    const data2 = JSON.parse(localStorage.getItem('cartData'))
    const array1 = data2.map(item => {
      if (item.id === iden) {
        return {
          ...item,
          quantity: item.quantity + 1,
        }
      }
      return {...item}
    })
    localStorage.setItem('cartData', JSON.stringify(array1))
  }

  render() {
    const {count} = this.state
    return (
      <div className="count-container">
        <button
          type="button"
          className="decrement-button"
          data-testid="decrement-count"
          onClick={this.onDecrement}
        >
          -
        </button>
        <div data-testid="active-count" className="active-number">
          {count}
        </div>
        <button
          type="button"
          className="decrement-button"
          data-testid="increment-count"
          onClick={this.onIncrement}
        >
          +
        </button>
      </div>
    )
  }
}

export default Counter
