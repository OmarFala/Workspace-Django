import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Adduser from "../GererUser/add-user.component";
import user from "../GererUser/user.component";
import usersList from "../GererUser/users-list.component";
import Adddoc from "../GererDocs/add-doc.component";
import doc from "../GererDocs/doc.component";
import docsList from "../GererDocs/docs-list.component";
import Agenda from "../component/Agenda";
class Dashboard extends Component {
    render() {
        return (
            <div>
                <div class="w3-top">
                    <div class="w3-bar w3-theme-d2 w3-left-align w3-large">
                        <a class="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2" href="javascript:void(0);" onclick="openNav()"><i class="fa fa-bars"></i></a>
                        <a href="#" class="w3-bar-item w3-button w3-padding-large w3-theme-d4"><i class="fa fa-home w3-margin-right"></i>Logo</a>
                        <a href="#" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="News"><i class="fa fa-globe"></i></a>
                        <a href="#" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Account Settings"><i class="fa fa-user"></i></a>
                        <a href="#" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Messages"><i class="fa fa-envelope"></i></a>
                        <div class="w3-dropdown-hover w3-hide-small">
                            <button class="w3-button w3-padding-large" title="Notifications"><i class="fa fa-bell"></i><span class="w3-badge w3-right w3-small w3-green">3</span></button>
                            <div class="w3-dropdown-content w3-card-4 w3-bar-block" >
                                <a href="#" class="w3-bar-item w3-button">One new friend request</a>
                                <a href="#" class="w3-bar-item w3-button">John Doe posted on your wall</a>
                                <a href="#" class="w3-bar-item w3-button">Jane likes your post</a>
                            </div>
                        </div>
                        <a href="#" class="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-white" title="Déconnecter">
                            <button className={'button is-primary'} onClick={this.submitForm}>Déconnecter</button>
                        </a>
                    </div>
                </div>
                <Router>
                    <nav class="w3-sidebar w3-collapse w3-white w3-animate-left" id="mySidebar"><br />
                        <div class="w3-container w3-row">
                            <div class="w3-col s8 w3-bar">
                                <span>Bienvennu, Monsieur <strong>Omar Fala</strong></span><br />
                            </div>
                        </div>
                        <hr />
                        <div class="w3-container">
                            <h5>tableau de bord</h5>
                        </div>
                        <hr />
                        <div class="w3-bar-block">
                            <a href="#" class="w3-bar-item w3-button w3-padding-16 w3-hide-large w3-dark-grey w3-hover-black" onclick="w3_close()" title="close menu"><i class="fa fa-remove fa-fw"></i>  Close Menu</a>
                            <Link to={"/users"} className="nav-link"><i class="fa fa-users fa-fw"></i>  liste des utilisateurs </Link>
                            <Link to={"/adduser"} className="nav-link"><i class="fa fa-eye fa-fw"></i>  Ajouter utilisateur </Link>
                            <Link to={"/docs"} className="nav-link"><i class="fa fa-bullseye fa-fw"></i>  Liste des documents </Link>
                            <Link to={"/adddoc"} className="nav-link"><i class="fa fa-history fa-fw"></i> ajouter document </Link>
                            <Link to={"/agenda"} className="nav-link"><i class="fa fa-bell fa-fw"></i>  Agenda partager </Link><br></br><hr />
                            <a href="#" class="w3-bar-item w3-button w3-padding"><i class="fa fa-cog fa-fw"></i>  Réglage</a><br /><br /><hr />
                            <a href="#" class="w3-bar-item w3-button w3-padding"><i class="fa fa-users fa-fw"></i> Créer une équipe </a>
                        </div>
                    </nav>
                    <div className="container mt-3">
                        <Switch>
                            <Route exact path={["/users"]} component={usersList} />
                            <Route exact path="/adduser" component={Adduser} />
                            <Route path="/users/:id" component={user} />
                            <Route exact path={["/docs"]} component={docsList} />
                            <Route exact path="/adddoc" component={Adddoc} />
                            <Route path="/docs/:id" component={doc} />
                            <Route path="/agenda" component={Agenda} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default Dashboard;