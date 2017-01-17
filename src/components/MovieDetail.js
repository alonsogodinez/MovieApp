import React from 'react'
import { connect } from "react-redux"
import NotFound from  './NotFound'
import {updateMovie, deleteMovie} from '../actions/movieActions'

import DeleteModal from './DeleteModal';
import { Modal, ModalHeader } from 'react-bootstrap'

class MovieDetail extends React.Component{

  constructor(props) {
    super(props)
    this.state= {
      showDeleteModal: false,
      showEditModal: false,

    }
  }

  openDeleteModal() {
    this.setState({
      ...this.state,
      showDeleteModal: true
    });
  }

  openEditModal() {
    this.setState({
      ...this.state,
      showEditModal: true
    });
  }

  close() {
    this.setState({
      showDeleteModal: false,
      showEditModal: false
    });
  };

  deleteMovie(){
    this.props.deleteMovie(this.props.params.key);
    this.props.router.push('/');

  }

  updateMovieRate(e){
    const prevRate = this.movie.previusRate || 0;
    const userRate = Number(e.target.value);
    const newVotes = this.movie.previusRate? this.movie.votes : this.movie.votes+1;
    const rating = this.movie.rating ? this.movie.rating : 0;
    const newRating = (((rating*this.movie.votes) - prevRate + userRate)
      /(newVotes))
    const movie = {
      id: this.props.params.key,
      rating: newRating.toFixed(1),
      votes: newVotes,
      previusRate:userRate,
    };
    return this.props.updateMovie(movie)
  }

  updateMovie(e){
    //TODO
    // this.props.updateMovie()
    this.close()
  }

  render(){
    console.log(this.state)

    this.movie = this.props.movies[this.props.params.key];
    if(!this.movie) return <NotFound />
    let rateOptions = [];

    for (let i=1; i<11; i++){
      rateOptions.push(<option key={i} value={i}>{i}</option>)
    }

    return (
      <div className="movie-detail-container animated fadeIn">
        <h1> {this.movie.name}</h1>
        <section className="movie-details">
          <div className="movie-details-info">
            <img src={process.env.PUBLIC_URL + this.movie.imageURL} alt=""/>
            <strong className="rateMovie-label"> Rate this movie</strong>
            <select
              id="rateMovie"
              className="form-control"

              onChange={this.updateMovieRate.bind(this)}
            >
              {rateOptions}
            </select>
          </div>
          <div className="movie-details-info">

            <span className="movie-rating" key={this.movie.id}>
              <strong>RATING:</strong> {this.movie.rating} ({this.movie.votes} votes)
            </span>
            <span> <strong>GENRE:</strong> {this.movie.genre}</span>
            <span> <strong>RELEASE YEAR:</strong> {this.movie.releasYear}</span>
            <span> <strong>GROSS INCOME:</strong> {this.movie.grossIncome}</span>
            <span> <strong>DIRECTOR NAME:</strong> {this.movie.directorName}</span>
            <span>
              <strong>ACTORS:</strong>
              {this.movie.actors.map((actorId, index) => {
                const _actor = this.props.actors[actorId];
                if(_actor){
                  return <a key={actorId} href={`/actors/${actorId}`}>
                    {`${_actor.firstName} ${_actor.lastName}, `}
                  </a>
                }
              }) }
            </span>
            <span>
              <button
                onClick={this.openDeleteModal.bind(this)}
                className="btn btn-danger">
                Delete this movie
              </button>
            </span>
            <span>
              <button
                onClick={this.openEditModal.bind(this)}
                className="btn btn-primary">
                Edit this movie
              </button>
            </span>



          </div>
        </section>
        <DeleteModal
          showModal={this.state.showDeleteModal}
          close={this.close.bind(this)}
          deleteEntity={this.deleteMovie.bind(this)}
        />

        {/*//TODO REFACTOR THIS MODAL TO COMPONENT*/}
        <Modal show={this.state.showEditModal} onHide={this.close.bind(this)}>
          <ModalHeader closeButton>
            <Modal.Title>Edit Movie</Modal.Title>
          </ModalHeader>
          <Modal.Body className="">

            <label> Name: </label>
            <input
              ref={ input => this.movieNameInput = input}
              className="form-control"
              type="text"
              value={this.movie.name}
            />

            <label> Release Year: </label>
            <input
              ref={ input => this.movieReleaseYearInput = input}
              className="form-control"
              type="number"
              value={this.movie.releaseYear}
            />



            <label> Gross income: </label>
            <input
              ref={ input => this.movieGrossIncomeInput = input}
              className="form-control"
              value={this.movie.grossIncome}
              type="text"/>

            <label> Director name: </label>
            <input
              ref={ input => this.movieDirectorNameInput = input}
              className="form-control"
              value={this.movie.directorName}
              type="text"/>

            <label> Genre: </label>
            <input
              ref={ input => this.movieGenreInput = input}
              className="form-control"
              value={this.movie.genre}
              type="text"/>

            {/*TODO make multiple MOVIES insert*/}
            <label> Actor </label>
            <select
              ref={ select => this.movieActorsInput = select}
              value={this.movie.actors[0]} //TODO
              className="form-control">

              { this.props.actors.map((actor, index) =>
                <option key={index} value={index}>
                  {`${actor.firstName} ${actor.lastName}` }
                </option>
              )}
            </select>

          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={this.updateMovie.bind(this)}
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
    movies :state.movies.movies,
    actors :state.actors.actors
  };
},(dispatch) => {
  return {
    deleteMovie: (id) => dispatch(deleteMovie(id)),
    updateMovie: (movie) => dispatch(updateMovie(movie)),
  }
})(MovieDetail);


export default MovieDetail;