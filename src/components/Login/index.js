import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
  }

  changingUsername = e => {
    this.setState({
      username: e.target.value,
    })
  }

  changingPassword = e => {
    this.setState({
      password: e.target.value,
    })
  }

  success = fetchedData => {
    const {history} = this.props
    const jwtToken = fetchedData.jwt_token
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  failure = fetchedData => {
    this.setState({
      errorMsg: fetchedData.error_msg,
    })
  }

  logging = async e => {
    e.preventDefault()
    const {username, password} = this.state
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const fetchedData = await response.json()
    if (response.ok) {
      this.success(fetchedData)
    } else {
      this.failure(fetchedData)
    }
  }

  render() {
    const {errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <div className="login-first-container">
          <div className="inputCard">
            <div className="logo-container">
              <img
                alt="website logo"
                src="https://res.cloudinary.com/dgz4gcw07/image/upload/v1729678302/Frame_274_g9bojt.png"
              />
              <h1 className="logo-head">Tasty Kitchens</h1>
            </div>
            <h1 className="login-page-head">Login</h1>
            <form onSubmit={this.logging}>
              <div className="user-input-card">
                <label className="inputLabel" htmlFor="1">
                  USERNAME
                </label>
                <br />
                <input
                  onChange={this.changingUsername}
                  className="inputEle"
                  id="1"
                  type="text"
                />
              </div>
              <div>
                <label className="inputLabel" htmlFor="2">
                  PASSWORD
                </label>
                <br />
                <input
                  onChange={this.changingPassword}
                  className="inputEle"
                  id="2"
                  type="password"
                />
              </div>
              <p className="error-msg">{errorMsg}</p>
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
          </div>
        </div>
        <div className="login-second-container">
          <img
            className="login-image"
            alt="website login"
            src="https://res.cloudinary.com/dgz4gcw07/image/upload/v1729674806/Rectangle_1456_u9bp2e.png"
          />
        </div>
      </div>
    )
  }
}
export default Login
