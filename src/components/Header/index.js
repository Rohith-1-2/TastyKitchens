import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import './index.css'
import Cookies from 'js-cookie'

class Header extends Component {
  loggingOut = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <nav className="nav-bar">
        <div className="nav-card">
          <Link className="header-first" to="/">
            <img
              alt="website logo"
              src="https://res.cloudinary.com/dgz4gcw07/image/upload/v1729678302/Frame_274_g9bojt.png"
            />
            <p className="header-para">Tasty kitchens</p>
          </Link>
          <div className="header-second">
            <ul className="unorder">
              <li>
                <Link className="list-Item" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="list-Item" to="/cart">
                  Cart
                </Link>
              </li>
            </ul>
            <button
              onClick={this.loggingOut}
              type="button"
              className="logout-button"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    )
  }
}
export default withRouter(Header)
