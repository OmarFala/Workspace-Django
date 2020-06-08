import React, { Component } from "react";
import userDataService from "../services/user.service";

export default class user extends Component {
  constructor(props) {
    super(props);
    this.onChangefirstname = this.onChangefirstname.bind(this);
    this.onChangelastname = this.onChangelastname.bind(this);
    this.onChangeemail = this.onChangeemail.bind(this);
    this.onChangelanguage = this.onChangelanguage.bind(this);
    this.getuser = this.getuser.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateuser = this.updateuser.bind(this);
    this.deleteuser = this.deleteuser.bind(this);

    this.state = {
      currentuser: {
        id: null,
        firstname: "",
        lastname: "",
        email: "",
        language: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getuser(this.props.match.params.id);
  }

  onChangefirstname(e) {
    const firstname = e.target.value;

    this.setState(function (prevState) {
      return {
        currentuser: {
          ...prevState.currentuser,
          firstname: firstname
        }
      };
    });
  }
  onChangeemail(e) {
    const email = e.target.value;

    this.setState(function (prevState) {
      return {
        currentuser: {
          ...prevState.currentuser,
          email: email
        }
      };
    });
  }

  onChangelastname(e) {
    const lastname = e.target.value;

    this.setState(prevState => ({
      currentuser: {
        ...prevState.currentuser,
        lastname: lastname
      }
    }));
  }
  onChangelanguage(e) {
    const language = e.target.value;

    this.setState(prevState => ({
      currentuser: {
        ...prevState.currentuser,
        language: language
      }
    }));
  }

  getuser(id) {
    userDataService.get(id)
      .then(response => {
        this.setState({
          currentuser: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentuser.id,
      firstname: this.state.currentuser.firstname,
      lastname: this.state.currentuser.lastname,
      email: this.state.currentuser.email,
      language: this.state.currentuser.language,
      published: status
    };

    userDataService.update(this.state.currentuser.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentuser: {
            ...prevState.currentuser,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateuser() {
    userDataService.update(
      this.state.currentuser.id,
      this.state.currentuser
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The user was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteuser() {
    userDataService.delete(this.state.currentuser.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/users')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentuser } = this.state;

    return (
      <div>
        {currentuser ? (
          <div className="edit-form">
            <h2>Modifier utilisateur :</h2>
            <form>
              <div className="form-group">
                <label htmlFor="firstname">firstname</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  value={currentuser.firstname}
                  onChange={this.onChangefirstname}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">lastname</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  value={currentuser.lastname}
                  onChange={this.onChangelastname}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="Email"
                  className="form-control"
                  id="email"
                  value={currentuser.email}
                  onChange={this.onChangeemail}
                />
              </div>
              <div className="form-group">
                <label htmlFor="language">Language</label>
                <input
                  type="language"
                  className="form-control"
                  id="language"
                  value={currentuser.language}
                  onChange={this.onChangelanguage}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentuser.published ? "Active" : "Inactive"}
              </div>
            </form>

            {currentuser.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                Inactiver
              </button>
            ) : (
                <button
                  className="badge badge-primary mr-2"
                  onClick={() => this.updatePublished(true)}
                >
                  Activer
                </button>
              )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteuser}
            >
              suprimer
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateuser}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
            <div>
              <br />
              <p>S'il vous plait, appuyer sur un utilisateur...</p>
            </div>
          )}
      </div>
    );
  }
}
