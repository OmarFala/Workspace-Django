import React, { Component } from "react";
import userDataService from "../services/user.service";
import { Link } from "react-router-dom";

export default class usersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchemail = this.onChangeSearchemail.bind(this);
    this.retrieveusers = this.retrieveusers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveuser = this.setActiveuser.bind(this);
    this.removeAllusers = this.removeAllusers.bind(this);
    this.searchemail = this.searchemail.bind(this);

    this.state = {
      users: [],
      currentuser: null,
      currentIndex: -1,
      searchemail: ""
    };
  }

  componentDidMount() {
    this.retrieveusers();
  }

  onChangeSearchemail(e) {
    const searchemail = e.target.value;

    this.setState({
      searchemail: searchemail
    });
  }

  retrieveusers() {
    userDataService.getAll()
      .then(response => {
        this.setState({
          users: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveusers();
    this.setState({
      currentuser: null,
      currentIndex: -1
    });
  }

  setActiveuser(user, index) {
    this.setState({
      currentuser: user,
      currentIndex: index
    });
  }

  removeAllusers() {
    userDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchemail() {
    userDataService.findByemail(this.state.searchemail)
      .then(response => {
        this.setState({
          users: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchemail, users, currentuser, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by email"
              value={searchemail}
              onChange={this.onChangeSearchemail}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchemail}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>users List</h4>

          <ul className="list-group">
            {users &&
              users.map((user, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveuser(user, index)}
                  key={index}
                >
                  {user.lastname}{user.firstname}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllusers}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentuser ? (
            <div>
              <h4>utilisateur: {currentuser.firstname}{}{currentuser.lastname}</h4>
              <div>
                <label>
                  <strong>Nom Complete:</strong>
                </label>{" "}
                {currentuser.firstname}{}{currentuser.lastname}
              </div>
              <div>
                <label>
                  <strong>email:</strong>
                </label>{" "}
                {currentuser.email}
              </div>
              <div>
                <label>
                  <strong>language:</strong>
                </label>{" "}
                {currentuser.language}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentuser.published ? "active" : "inactive"}
              </div>

              <Link
                to={"/users/" + currentuser.id}
                className="badge badge-warning"
              >
                Modifier
              </Link>
              <br></br>
              <Link
                to={"/users/" + currentuser.id}
                className="badge badge-warning"
              >
                exporter
              </Link>
            </div>
          ) : (
              <div>
                <br />
                <p>S'il vous plait, appuyer sur un utilisateur...</p>
              </div>
            )}
        </div>
      </div>
    );
  }
}
