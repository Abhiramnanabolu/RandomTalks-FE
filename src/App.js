import './App.css'
import {Route, Switch,BrowserRouter} from 'react-router-dom'
import Home from './Components/Home'
import Chat from './Components/Chat'

// Replace your code here
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/chat" component={Chat} />
    </Switch>
  </BrowserRouter>
)
export default App