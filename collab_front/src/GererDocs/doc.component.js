import React, { Component } from "react";
import documentDataService from "../services/document.service";

export default class document extends Component {
  constructor(props) {
    super(props);
    this.onChangecode = this.onChangecode.bind(this);
    this.onChangetitre = this.onChangetitre.bind(this);
    this.onChangeversion = this.onChangeversion.bind(this);
    this.getdocument = this.getdocument.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updatedocument = this.updatedocument.bind(this);
    this.deletedocument = this.deletedocument.bind(this);

    this.state = {
      currentdocument: {
        id: null,
        code: "",
        titre: "",
        version: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getdocument(this.props.match.params.id);
  }

  onChangecode(e) {
    const code = e.target.value;

    this.setState(function (prevState) {
      return {
        currentdocument: {
          ...prevState.currentdocument,
          code: code
        }
      };
    });
  }
  onChangeversion(e) {
    const version = e.target.value;

    this.setState(function (prevState) {
      return {
        currentdocument: {
          ...prevState.currentdocument,
          version: version
        }
      };
    });
  }

  onChangetitre(e) {
    const titre = e.target.value;

    this.setState(prevState => ({
      currentdocument: {
        ...prevState.currentdocument,
        titre: titre
      }
    }));
  }

  getdocument(id) {
    documentDataService.get(id)
      .then(response => {
        this.setState({
          currentdocument: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentdocument.id,
      code: this.state.currentdocument.code,
      titre: this.state.currentdocument.titre,
      version: this.state.currentdocument.version,
      published: status
    };

    documentDataService.update(this.state.currentdocument.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentdocument: {
            ...prevState.currentdocument,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatedocument() {
    documentDataService.update(
      this.state.currentdocument.id,
      this.state.currentdocument
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The document was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deletedocument() {
    documentDataService.delete(this.state.currentdocument.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/documents')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentdocument } = this.state;

    return (
      <div>
        {currentdocument ? (
          <div className="edit-form">
            <h2>Modifier document :</h2>
            <form>
              <div className="form-group">
                <label htmlFor="code">code</label>
                <input
                  type="text"
                  className="form-control"
                  id="code"
                  value={currentdocument.code}
                  onChange={this.onChangecode}
                />
              </div>
              <div className="form-group">
                <label htmlFor="titre">titre</label>
                <input
                  type="text"
                  className="form-control"
                  id="titre"
                  value={currentdocument.titre}
                  onChange={this.onChangetitre}
                />
              </div>
              <div className="form-group">
                <label htmlFor="version">version</label>
                <input
                  type="version"
                  className="form-control"
                  id="version"
                  value={currentdocument.version}
                  onChange={this.onChangeversion}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Type:</strong>
                </label>
                {currentdocument.published ? "public" : "private"}
              </div>
            </form>

            {currentdocument.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                public
              </button>
            ) : (
                <button
                  className="badge badge-primary mr-2"
                  onClick={() => this.updatePublished(true)}
                >
                  privé
                </button>
              )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deletedocument}
            >
              suprimer
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updatedocument}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
            <div>
              <br />
              <p>S'il vous plait, appuyer sur un document...</p>
            </div>
          )}
      </div>
    );
  }
}
