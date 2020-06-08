import React, { Component } from 'react';
import { Route, Link, Router } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import userDataService from "../services/user.service";

class Home extends Component {
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
            <Router>
                <section class="section">
                    <div class="container">
                        <div class="container">
                            <p> Pour créer votre propre <strong>Espace</strong> insérer vos informations</p>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Nom</label>
                        <div class="control">
                            <input
                                type="text"
                                placeholder="Entrer votre nom"
                                className="form-control"
                                id="firstname"
                                required
                                value={this.state.firstname}
                                onChange={this.onChangefirstname}
                                name="nom"
                            />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Prenom</label>
                        <div class="control has-icons-left has-icons-right">
                            <input
                                type="text"
                                placeholder="Entrer votre prenom"
                                className="form-control"
                                id="lastname"
                                required
                                value={this.state.lastname}
                                onChange={this.onChangelastname}
                                name="prenom"
                            />
                            <span class="icon is-small is-left">
                                <i class="fas fa-user"></i>
                            </span>
                            <span class="icon is-small is-right">
                                <i class="fas fa-check"></i>
                            </span>
                        </div>
                        {/*<p class="help is-success">This username is available</p>*/}
                    </div>

                    <div class="field">
                        <label className="label">Email</label>
                        <div className="control has-icons-left has-icons-right">
                            <input
                                type="Email"
                                className="form-control"
                                id="email"
                                required
                                value={this.state.email}
                                onChange={this.onChangeemail}
                                name="email"
                            />
                            <span class="icon is-small is-left">
                                <i class="fas fa-envelope"></i>
                            </span>
                            <span class="icon is-small is-right">
                                <i class="fas fa-exclamation-triangle"></i>
                            </span>
                        </div>
                        {/*<p class="help is-danger">This email is invalid</p>*/}
                    </div>

                    <div class="field">
                        <label class="label">Language</label>
                        <div class="control">
                            <div class="select">
                                <select className="form-control"
                                    id="language"
                                    required
                                    value={this.state.language}
                                    onChange={this.onChangelanguage}
                                    name="language">
                                    <option>Francais</option>
                                    <option>Anglais</option>
                                    <option>Espagnole</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <label class="label">Type de plan </label>
                            <label class="radio">
                                <input type="radio" name="question" />
                                Payant
                        </label>
                            <label class="radio">
                                <input type="radio" name="question" />
                                Gratuit
                        </label>
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <label class="checkbox">
                                <input type="checkbox" />
                                I agree to the <a href="#">terms and conditions</a>
                            </label>
                        </div>
                    </div>
                    <div class="container">
                        <div class="field is-grouped">
                            <div class="control">
                                <Link to="/dashboard"><button class="button is-link">Submit</button></Link>
                            </div>
                            <div class="control">
                                <Link to="/"><button class="button is-link is-light" >Cancel</button></Link>
                            </div>
                        </div>
                    </div>
                    <switch>
                        <Route to="/dashboard" component={Dashboard} />
                    </switch>
                </section >
            </Router>
        );
    }
}

export default Home;