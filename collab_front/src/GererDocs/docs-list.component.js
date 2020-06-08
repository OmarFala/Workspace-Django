import React, { Component } from "react";
import documentDataService from "../services/document.service";
import { Link } from "react-router-dom";

export default class documentsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchtitre = this.onChangeSearchtitre.bind(this);
    this.retrievedocuments = this.retrievedocuments.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivedocument = this.setActivedocument.bind(this);
    this.removeAlldocuments = this.removeAlldocuments.bind(this);
    this.searchtitre = this.searchtitre.bind(this);

    this.state = {
      documents: [],
      currentdocument: null,
      currentIndex: -1,
      searchtitre: ""
    };
  }

  componentDidMount() {
    this.retrievedocuments();
  }

  onChangeSearchtitre(e) {
    const searchtitre = e.target.value;

    this.setState({
      searchtitre: searchtitre
    });
  }

  retrievedocuments() {
    documentDataService.getAll()
      .then(response => {
        this.setState({
          documents: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievedocuments();
    this.setState({
      currentdocument: null,
      currentIndex: -1
    });
  }

  setActivedocument(document, index) {
    this.setState({
      currentdocument: document,
      currentIndex: index
    });
  }

  removeAlldocuments() {
    documentDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchtitre() {
    documentDataService.findBytitre(this.state.searchtitre)
      .then(response => {
        this.setState({
          documents: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchtitre, documents, currentdocument, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by titre"
              value={searchtitre}
              onChange={this.onChangeSearchtitre}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchtitre}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>documents List</h4>

          <ul className="list-group">
            {documents &&
              documents.map((document, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActivedocument(document, index)}
                  key={index}
                >
                  {document.titre}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAlldocuments}
          >
            suprimer tout
          </button>
        </div>
        <div className="col-md-6">
          {currentdocument ? (
            <div>
              <h4>document: {currentdocument.code}</h4>
              <div>
                <label>
                  <strong>titre:</strong>
                </label>{" "}
                {currentdocument.titre}
              </div>
              <div>
                <label>
                  <strong>version:</strong>
                </label>{" "}
                {currentdocument.version}
              </div>
              <div>
                <div>
                  <label>
                    <strong>doc:</strong>
                  </label>{" "}
                  {currentdocument.doc}
                </div>
              </div>
              <div>
                <label>
                  <strong>type:</strong>
                </label>{" "}
                {currentdocument.published ? "public" : "private"}
              </div>

              <Link
                to={"/documents/" + currentdocument.id}
                className="badge badge-warning"
              >
                Modifier
              </Link>
              <br></br>
              <Link
                to={"/documents/" + currentdocument.id}
                className="badge badge-warning"
              >
                exporter
              </Link>
            </div>
          ) : (
              <div>
                <br />
                <p>S'il vous plait, appuyer sur un document...</p>
              </div>
            )}
        </div>
      </div>
    );
  }
}
