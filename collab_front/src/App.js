import React, { Component, Fragment } from "react";
import Header from "./component/Header";
import Home from "./GererEspace/Home";
import Footer from './component/footer';
import HomePage from './component/HomePage';
import Dashboard from './Dashboard/Dashboard';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Router>


          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/Dashboard">
              <Dashboard />
            </Route>
            <Route path="/espace">
              <Home />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>

        </Router>
        {/*<Footer />*/}
      </Fragment>

    );
  }
}

export default App;