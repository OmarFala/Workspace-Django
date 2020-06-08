import React, { Component } from 'react';


class Footer extends Component {
    render() {
        return (

            <footer class="footer">
                <div class="content has-text-centered is-gapless is-multiline is-mobile">
                    <p><a><button type="button" class="btn btn-fb"><i class="fab fa-facebook-f pr-1"></i> Facebook</button></a>
                        <a><button type="button" class="btn btn-ins"><i class="fab fa-instagram pr-1"></i> Instagram</button></a>
                        <a><button type="button" class="btn btn-git"><i class="fab fa-github pr-1"></i> Github</button></a></p>
                    <p>
                        <strong>Collaboration</strong><a href="https://github.com/OmarFala"> by Fala Omar.</a><br></br>
                        <h3 href="http://opensource.org/licenses/mit-license.php">© Copyright 2020, Tous droits réservés.</h3>
                    </p>
                </div>
            </footer>

        );
    }
}

export default Footer;