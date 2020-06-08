import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import SignupPage from '../SignupPage/SignupPage';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    }
  }

  login = () => {
    this.setState({
      isAuthenticated: true
    })
  }

  logout = () => {
    localStorage.removeItem('auth_token');
    this.setState({
      isAuthenticated: false
    })
  }

  componentDidMount() {
    if (localStorage.getItem('auth_token')) {
      this.login();
    } else {
      this.logout();
    }
  }

  wrappedSignupPage = (props) => {
    if (!this.state.isAuthenticated)
      return <SignupPage
        {...props}
        login={this.login}
        isAuthenticated={this.state.isAuthenticated}
      />;
    else
      return <Redirect to="/" />
  }


  render() {

    return (
      <Router>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="/"><strong>Collaboration</strong></a>
          <div className="navbar-menu">
            <div>
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="/objectif">Objectif <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/about">About</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/contact">Contact</a>
                </li>
              </ul>
            </div>
            <div className="navbar-end">
              <div className="navbar-item has-dropdown is-hoverable">
                {this.state.isAuthenticated ?
                  <div className="container-fluid">
                    <a className="navbar-item">Profile</a>
                    <a className="navbar-item" onClick={this.logout}>Logout</a>
                  </div> :
                  <div className="navbar-dropdown">
                    <Link className="navbar-item" to="/signup">Login/Sign Up</Link>
                  </div>
                }
              </div>
            </div>
          </div>
        </nav>
        <div className="container-fluid">
          <Route path="/signup" component={this.wrappedSignupPage} />
          <Route path="/login" component={this.wrappedSignupPage} />
        </div>
      </Router >
    );
  }
}

export default Header;
