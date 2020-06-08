import React, { Component } from "react";
import {
    HashRouter as Router,
    Route,
    Link,
} from 'react-router-dom';
import SignupPage from '../SignupPage/SignupPage';
import chifrer from './chifrer.png';
import strategie from './strategie.png';
import rationaliser from './rationaliser.jpg';
class App extends Component {
    render() {
        {/*console.log(localStorage.getItem('auth_token'));*/ }
        return (
            <Router>
                <div>
                    <div class="tile">
                        <div class="tile is-parent is-vertical">
                            <article class="tile is-child notification is-primary">
                                <p class="title">Collaborez avec toutes les équipes
                                    Que ce soit pour votre travail, pour un projet parallèle ou même pour vos prochaines vacances en famille,<br></br> <strong>Collaboration</strong> aide votre équipe à rester organisée.</p>
                                <Link class="button is-danger is-outlined is-large" to="/signup">>>> Inscrivez-vous, C'est gratuit !</Link>
                            </article>
                        </div>
                    </div>
                    <div class="footer card-group">
                        <div class="card">
                            <img class="card-img-top" src={strategie} alt="Card image cap" />
                            <div class="card-body">
                                <h5 class="card-title">Les stratégies de l'équipe</h5>
                                <p class="card-text">Il est facile de mettre en œuvre <strong>COLLABORATION</strong> pour votre équipe. Nous avons recueilli tous les tableaux et outils dont vous avez besoin pour réussir vos premiers pas grâce à une seule ressource pratique.</p>
                            </div>
                        </div>
                        <div class="card">
                            <img class="card-img-top" src={chifrer} alt="Card image cap" width="100" height="100" />
                            <div class="card-body">
                                <h5 class="card-title">CHIFFRÉ</h5>
                                <p class="card-text">Les contenus que vous partagez, ainsi que la liste des projets auxquels vous participez sont chiffrés "end-to-end"</p>
                            </div>
                        </div>
                        <div class="card">
                            <img class="card-img-top" src={rationaliser} alt="Card image cap" />
                            <div class="card-body">
                                <h5 class="card-title">Rationalisez le flux de travail</h5>
                                <p class="card-text">Flexibilité pour soutenir, gérer et suivre l'approche de travail de votre équipe.<br></br>modèle planifié, cohérent et répétable d'activités ou d'étapes.<br></br> Un flux de travail de projet commun détaille la façon dont les livrables terminés sont approuvés et acceptés.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Route path="/signup" component={SignupPage} />
            </Router>
        );
    }
}

export default App;