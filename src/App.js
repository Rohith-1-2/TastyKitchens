import './App.css'
import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import SpecificRestaurantDetails from './components/SpecificRestaurantDetails'
import NotFound from './components/NotFound'
import Cart from './components/Cart'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute
      exact
      path="/restaurant/:id"
      component={SpecificRestaurantDetails}
    />
    <ProtectedRoute exact path="/cart" component={Cart} />
    <Route exact path="/bad-path" component={NotFound} />
    <Redirect to="/bad-path" />
  </Switch>
)

export default App
