import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Users from './users';

const App = () => {

  return (
    <Router>
      <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar-brand">Typescript assignment</div>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/users">Users</Link>
          </li>
        </ul>
        </nav>

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/users" component={Users}>
            {/* <Users /> */}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => (<h1 className="m-5">Home page</h1>)

export default App;
