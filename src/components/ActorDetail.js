import React from 'react'
import { connect } from "react-redux"
import NotFound from  './NotFound'
import DeleteModal from './DeleteModal'

import {deleteActor} from '../actions/actorActions';
import { Modal, ModalHeader } from 'react-bootstrap'

class MovieDetail extends React.Component{

  constructor(props) {
    super(props)
    this.state= {
      showDeleteModal: false,
      showEditModal: false

    }
  }

  openDeleteModal() {
    this.setState({
      ...this.state,
      showDeleteModal: true,
    });
  }

  openEditModal() {
    this.setState({
      ...this.state,
      showEditModal: true,
    });
  }

  close() {
    this.setState({
      showDeleteModal: false,
      showEditModal: false
    });
  };

  deleteActor(){
    this.props.deleteActor(this.props.params.key);
    this.props.router.push('/');

  }

  updateActor(){
    //this.props.updateActor(actor);
    this.close()

  }

  render(){

    this.actor = this.props.actors[this.props.params.key];

    if(!this.actor) return <NotFound />

    return (
      <div className="actor-detail-container animated fadeIn">
        <h1> {this.actor.firstName} {this.actor.lastName}</h1>
        <section className="actor-details">
          <div className="actor-details-info">
            <img src={process.env.PUBLIC_URL + this.actor.imageURL} alt=""/>
          </div>
          <div className="actor-details-info">
            <span> <strong>{"FIRST NAME: "}</strong> {this.actor.firstName}</span>
            <span> <strong>{"LAST NAME: "}</strong> {this.actor.lastName}</span>
            <span> <strong>{"GENDER: "}</strong> {this.actor.gender}</span>
            <span> <strong>{"BIRTH DATE: "}</strong>

              {this.actor.birthDate.toString().substring(0,10)}
              </span>
            <span>
              <strong>{"Movies: "}</strong>
              {this.actor.movies.map((movieId, index) => {
                const movie = this.props.movies[movieId];
                if(movie){
                  return <a key={movieId} href={`/movies/${movieId}`}>
                    {`${movie.name}, `}
                  </a>
                }
              })
              }
            </span>
            <span>
              <button
                onClick={this.openDeleteModal.bind(this)}
                className="btn btn-danger">
                Delete this Actor
            </button>
            </span>

            <span>
              <button
                onClick={this.openEditModal.bind(this)}
                className="btn btn-primary">
                Edit this Actor
            </button>
            </span>

          </div>

        </section>
        <DeleteModal
          showModal={this.state.showDeleteModal}
          close={this.close.bind(this)}
          deleteEntity={this.deleteActor.bind(this)}
        />

        <Modal show={this.state.showEditModal} onHide={this.close.bind(this)}>
          <ModalHeader closeButton>
            <Modal.Title>Add Actor</Modal.Title>
          </ModalHeader>
          <Modal.Body className="">

            <label> First Name: </label>
            <input
              ref={ input => this.actorFirsNameInput = input}
              className="form-control"
              value={this.actor.firstName}
              type="text"/>

            <label> Last Name: </label>
            <input
              ref={ input => this.actorLastNameInput = input}
              className="form-control"
              value={this.actor.lastName}
              type="text"/>

            <label> Gender </label>
            <select
              ref={ select => this.actorGenderInput = select}
              value={this.actor.gender}
              className="form-control">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            {/*TODO make multiple MOVIES insert*/}
            <label> Movie </label>
            <select
              ref={ select => this.actorMoviesInput = select}
              value={this.actor.movies[0]} //TODO
              className="form-control">
              { this.props.movies.map((movie, index) =>
                <option key={index} value={index}>
                  {movie.name}
                </option>
              )}
            </select>

            <label> Birth Date: </label>
            <input
              ref={ input => this.actorBirthDateInput = input}
              value={this.actor.birthDate.toISOString().substring(0,10)}
              className="form-control"
              type="date"/>

          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={this.updateActor.bind(this)}
              className="btn btn-primary">
              Save
            </button>
          </Modal.Footer>

        </Modal>
      </div>
    )
  }
}

MovieDetail = connect((state) => {

  return {
    movies :state.movies.movies ,
    actors :state.actors.actors
  };
},(dispatch) => {
  return {
    deleteActor: (id) => dispatch(deleteActor(id)),

  }
})(MovieDetail);


export default MovieDetail;