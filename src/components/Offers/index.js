import {Component} from 'react'
import './index.css'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
}

class Offers extends Component {
  render() {
    const {listOffers} = this.props
    return (
      <Slider {...settings}>
        {listOffers.map(item => (
          <li key={item.id}>
            <img className="offer-image" alt="offer" src={item.imageUrl} />
          </li>
        ))}
      </Slider>
    )
  }
}
export default Offers
