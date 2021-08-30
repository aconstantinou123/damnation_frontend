import {
  Router,
  Switch,
  Route,
} from 'react-router-dom'
import { Provider } from 'react-redux'

import LandingPage from './containers/LandingPage/LandingPage'
import About from './containers/About/About'
import Article from './containers/Article/Article'
import CreateArticle from './containers/CreateArticle/CreateArticle'
import EditArticle from './containers/EditArticle/EditArticle'
import Login from './containers/Login/Login'
import Logout from './containers/Logout/Logout'
import Submissions from './containers/Submissions/Submissions'
import PrivateRoute from './routes/PrivateRoute'
import Archive from './containers/Archive/Archive'
import ArchiveArticles from './containers/ArchiveArticles/ArchiveArticles'
import EditContent from './containers/EditContent/EditContent'
import Search from './containers/Search/Search'

import history from './history'
import store from './store'

import { persistLogin } from './actions/userActions'

import './App.css'

store.dispatch(persistLogin())

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/submissions' component={Submissions}/>
          <Route path='/content/:id' component={EditContent}/>
          <Route path='/archive/:date' component={ArchiveArticles}/>
          <Route path='/archive' component={Archive}/>
          <Route path='/search/:search' component={Search}/>
          <PrivateRoute path='/create' component={CreateArticle}/>
          <PrivateRoute path='/edit/:id' component={EditArticle}/>
          <Route path='/article/:id' component={Article}/>
          <Route path='/about' component={About}/>
          <Route path='/' component={LandingPage}/>
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
