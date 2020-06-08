import React, { Component } from "react";
import userDataService from "../services/user.service";

export default class Adduser extends Component {
  constructor(props) {
    super(props);
    this.onChangefirstname = this.onChangefirstname.bind(this);
    this.onChangelastname = this.onChangelastname.bind(this);
    this.onChangeemail = this.onChangeemail.bind(this);
    this.onChangelanguage = this.onChangelanguage.bind(this);
    this.saveuser = this.saveuser.bind(this);
    this.newuser = this.newuser.bind(this);

    this.state = {
      id: null,
      id: null,
      firstname: "",
      lastname: "",
      email: "",
      language: "",
      published: false,

      submitted: false
    };
  }

  onChangefirstname(e) {
    this.setState({
      firstname: e.target.value
    });
  }
  onChangeemail(e) {
    this.setState({
      email: e.target.value
    });
  }
  onChangelanguage(e) {
    this.setState({
      language: e.target.value
    });
  }

  onChangelastname(e) {
    this.setState({
      lastname: e.target.value
    });
  }

  saveuser() {
    var data = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      language: this.state.language,
    };

    userDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          email: response.data.email,
          language: response.data.language,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newuser() {
    this.setState({
      id: null,
      firstname: "",
      lastname: "",
      email: "",
      language: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>utilisateur ajouté avec succés!</h4>
            <button className="btn btn-success" onClick={this.newuser}>
              Confirmer !
            </button>
          </div>
        ) : (
            <div>
              <h2>Ajouter nouvel utilisateur :</h2>
              <hr></hr>
              <div className="form-group">
                <label htmlFor="firstname">Nom</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  required
                  value={this.state.firstname}
                  onChange={this.onChangefirstname}
                  name="nom"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastname">Prenom</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  required
                  value={this.state.lastname}
                  onChange={this.onChangelastname}
                  name="prenom"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="Email"
                  className="form-control"
                  id="email"
                  required
                  value={this.state.email}
                  onChange={this.onChangeemail}
                  name="email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="language">Language</label>
                <input
                  type="text"
                  className="form-control"
                  id="language"
                  required
                  value={this.state.language}
                  onChange={this.onChangelanguage}
                  name="language"
                />
              </div>

              <button onClick={this.saveuser} className="btn btn-success">
                Valider
            </button>
            </div>
          )}
      </div>
    );
  }
}
