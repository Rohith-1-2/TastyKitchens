import {Component} from 'react'
import './index.css'
import {FaStar} from 'react-icons/fa'
import Counter from '../Counter'

class Dishes extends Component {
  state = {cond: true}

  backDoor = () => {
    const {obj} = this.props
    const {id} = obj
    this.setState({
      cond: true,
    })
    const data2 = JSON.parse(localStorage.getItem('cartData'))
    const filtering = data2.filter(item => item.id !== id)
    localStorage.setItem('cartData', JSON.stringify(filtering))
  }

  adding = () => {
    const {obj} = this.props
    const {name, cost, imageUrl, id} = obj
    const dish = {
      cost,
      quantity: 1,
      id,
      imageUrl,
      name,
    }
    const cartData = localStorage.getItem('cartData')
    if (cartData === null) {
      localStorage.setItem('cartData', JSON.stringify([dish]))
    } else {
      const itemsList = JSON.parse(cartData)
      localStorage.setItem('cartData', JSON.stringify([...itemsList, dish]))
    }
    this.setState({
      cond: false,
    })
  }

  render() {
    const {obj} = this.props
    const {cond} = this.state
    const {name, cost, imageUrl, id, rating} = obj
    return (
      <li data-testid="foodItem" className="specific-item">
        <img className="specific-image" alt={id} src={imageUrl} />
        <div>
          <h1 className="specific-head">{name}</h1>
          <p className="specific-desp">{cost}</p>
          <p className="specific-rating">
            <FaStar className="specific-star" /> {rating}
          </p>
          {cond && (
            <button
              onClick={this.adding}
              type="button"
              className="specific-button"
            >
              ADD
            </button>
          )}
          {!cond && <Counter iden={id} backDoor={this.backDoor} />}
        </div>
      </li>
    )
  }
}
export default Dishes
