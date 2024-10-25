import {Component} from 'react'
import './index.css'
import {Link} from 'react-router-dom'

class NotFound extends Component {
  render() {
    return (
      <div className="not-found">
        <img
          className="not-pic"
          alt="not found"
          src="https://res.cloudinary.com/dgz4gcw07/image/upload/v1729790933/erroring_1_wnop3k.png"
        />
        <h1>Page Not Found</h1>
        <p className="not-para">
          We are sorry, the page you requested could not be found. <br />
          Please go back to the homepage
        </p>
        <Link to="/">
          <button className="not-button" type="button">
            Home Page
          </button>
        </Link>
      </div>
    )
  }
}
export default NotFound
