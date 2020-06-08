import React, { Component } from "react";
import documentDataService from "../services/document.service";

export default class Adddocument extends Component {
  constructor(props) {
    super(props);
    this.onChangecode = this.onChangecode.bind(this);
    this.onChangetitre = this.onChangetitre.bind(this);
    this.onChangeversion = this.onChangeversion.bind(this);
    this.onChangedoc = this.onChangedoc.bind(this);
    this.savedocument = this.savedocument.bind(this);
    this.newdocument = this.newdocument.bind(this);


    this.state = {
      id: null,
      code: "",
      titre: "",
      version: "",
      doc: "",
      published: false,

      submitted: false
    };
  }

  onChangecode(e) {
    this.setState({
      code: e.target.value
    });
  }
  onChangeversion(e) {
    this.setState({
      version: e.target.value
    });
  }

  onChangetitre(e) {
    this.setState({
      titre: e.target.value
    });
  }
  onChangedoc(e) {
    this.setState({
      doc: e.target.value
    });
  }

  savedocument() {
    var data = {
      code: this.state.code,
      titre: this.state.titre,
      version: this.state.version,
      doc: this.state.doc,
    };

    documentDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          code: response.data.code,
          titre: response.data.titre,
          version: response.data.version,
          doc: response.data.version,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newdocument() {
    this.setState({
      id: null,
      code: "",
      titre: "",
      version: "",
      doc: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>document ajouté avec succés!</h4>
            <button className="btn btn-success" onClick={this.newdocument}>
              Confirmer !
            </button>
          </div>
        ) : (
            <div>
              <h2>Ajouter nouvel document :</h2>
              <hr></hr>
              <div className="form-group">
                <label htmlFor="code">Code document</label>
                <input
                  type="text"
                  className="form-control"
                  id="code"
                  required
                  value={this.state.code}
                  onChange={this.onChangecode}
                  name="code"
                />
              </div>

              <div className="form-group">
                <label htmlFor="titre">Titre document</label>
                <input
                  type="text"
                  className="form-control"
                  id="titre"
                  required
                  value={this.state.titre}
                  onChange={this.onChangetitre}
                  name="titre"
                />
              </div>
              <div className="form-group">
                <label htmlFor="version">version</label>
                <input
                  type="text"
                  className="form-control"
                  id="version"
                  required
                  value={this.state.version}
                  onChange={this.onChangeversion}
                  name="version"
                />
              </div><div className="form-group">
                <form>
                  <div class="form-group">
                    <label for="browsefile">Télécharger le document :</label>
                    <input type="file" value={this.state.doc} onChange={this.onChangedoc} class="form-control-file" id="browsefile" />
                  </div>
                </form>
              </div>
              <button onClick={this.savedocument} className="btn btn-success">
                Valider
            </button>
            </div>
          )}
      </div>
    );
  }
}
