import React, { Component } from 'react';
import { connect } from "react-redux"
import '../css/App.css';
import {updateFilterText} from '../actions/searchBoxActions';
import {addActor} from '../actions/actorActions';
import {addMovie} from '../actions/movieActions';

import SearchBox from './SearchBar';
import MovieList from './MovieList';

import { Modal, ModalHeader } from 'react-bootstrap';


class Home extends Component {

  constructor(props) {
    super(props)
    this.state= {
      showModalActor: false,
      showModalAMovie: false
    }
  }

  openModalActor() {
    this.setState({
        ...this.state,
      showModalActor: true
    });
  }

  close() {
    this.setState({
      showModalActor: false,
      showModalMovie: false
    });
  };

  openModalMovie() {
    this.setState({
      ...this.state,
      showModalMovie: true
    });
  };

  addActor(){

    //TODO REFACTOR THIS VALIDATION
    if(!(this.actorFirsNameInput.value &&
      this.actorLastNameInput.value &&
      this.actorGenderInput.value &&
      this.actorBirthDateInput.value))
      return alert("Fill all the fields please");

    const newActor = {
      imageURL: "/img/godfather1.png",
      firstName: this.actorFirsNameInput.value,
      lastName: this.actorLastNameInput.value,
      gender:this.actorGenderInput.value,
      birthDate: this.actorBirthDateInput.value,
      movies: [this.actorMoviesInput.value]
    };
    this.props.addActor(newActor);
    this.close();
  };


  addMovie(){
    //TODO REFACTOR THIS VALIDATION
    if(!(this.movieNameInput.value &&
      this.movieReleaseYearInput.value &&
      this.movieGrossIncomeInput.value &&
      this.movieDirectorNameInput.value &&
      this.movieGenreInput.value))
      return alert("Fill all the fields please");

    const newMovie = {
      imageURL: "/img/streetfighter.png",
      name: this.movieNameInput.value.toUpperCase(),
      releaseYear: this.movieReleaseYearInput.value,
      grossIncome:this.movieGrossIncomeInput.value,
      directorName: this.movieDirectorNameInput.value,
      genre: [this.movieGenreInput.value],
      actors: [this.movieActorsInput.value],
      votes: 0,
    };

    this.props.addMovie(newMovie);
    this.close();
  }




  render() {

    /*
    * MODALS
    */
    //TODO REFACTOR THE MODALS TO COMPONENTS
    const modalActor = (
      <Modal show={this.state.showModalActor} onHide={this.close.bind(this)}>
        <ModalHeader closeButton>
          <Modal.Title>Add Actor</Modal.Title>
        </ModalHeader>
        <Modal.Body className="">

          <label> First Name: </label>
          <input
            ref={ input => this.actorFirsNameInput = input}
            className="form-control"
            type="text"/>

          <label> Last Name: </label>
          <input
            ref={ input => this.actorLastNameInput = input}
            className="form-control"
            type="text"/>

          <label> Gender </label>
          <select
            ref={ select => this.actorGenderInput = select}
            className="form-control">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          {/*TODO make multiple MOVIES insert*/}
          <label> Movie </label>
          <select
            ref={ select => this.actorMoviesInput = select}
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
            className="form-control"
            type="date"/>

        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={this.addActor.bind(this)}
            className="btn btn-primary">
            Save
          </button>
        </Modal.Footer>

      </Modal>
    );

    const modalMovie = (
      <Modal show={this.state.showModalMovie} onHide={this.close.bind(this)}>
        <ModalHeader closeButton>
          <Modal.Title>Add Movie</Modal.Title>
        </ModalHeader>
        <Modal.Body>
          <label> Name: </label>
          <input
            ref={ input => this.movieNameInput = input}
            className="form-control"
            type="text"/>

          <label> Release Year: </label>
          <input
            ref={ input => this.movieReleaseYearInput = input}
            className="form-control"
            type="number"/>



          <label> Gross income: </label>
          <input
            ref={ input => this.movieGrossIncomeInput = input}
            className="form-control"
            type="number"/>

          <label> Director name: </label>
          <input
            ref={ input => this.movieDirectorNameInput = input}
            className="form-control"
            type="text"/>

          <label> Genre: </label>
          <input
            ref={ input => this.movieGenreInput = input}
            className="form-control"
            type="text"/>

          {/*TODO make multiple MOVIES insert*/}
          <label> Actor </label>
          <select
            ref={ select => this.movieActorsInput = select}
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
            onClick={this.addMovie.bind(this)}
            className="btn btn-primary">
            Save
          </button>
        </Modal.Footer>
      </Modal>
    )


    /*
    * Compoment Template
    */
    return (
      <div className="Home">
        <header className="Home-header">
          <h1> JS MOVIE APP</h1>
          <div className="add-entity-btn-container">
            <button
              onClick={this.openModalMovie.bind(this)}
              className="add-entity btn"> Add Movie</button>
            <button
              onClick={this.openModalActor.bind(this)}
              className="add-entity btn">Add Actor</button>
          </div>

          <SearchBox
            searchText={this.props.searchText}
            updateFilterText={this.props.updateFilterText}
          />
        </header>

        { !this.props.movies.length &&
          <p className="no-movies animated fadeIn"> No movies founded</p>
        }

        { this.props.movies &&
          <MovieList movies={this.props.movies} actors={this.props.actors}/>}


        {modalActor}
        {modalMovie}

      </div>
    );
  }
}


/*
* React - reduX
*/

Home = connect((state) => {

  const {searchBox: {filterText}} = state;
  const {movies} = state.movies;
  const {actors} = state.actors

  const filterMovies = (movies, filter) => {
    if(!filter) return movies;
    return movies.filter( movie =>{
      const isExactName = movie.name === filter.toUpperCase();
      const isLikeName = movie.name.indexOf(filter.toUpperCase()) !== -1;
      //TODO improve performace with no repeated actors in an array instead
      const actorsString = movie.actors.map(actorId => {
        return actors[actorId].firstName + ' '+ actors[actorId].lastName;
      }).join(' ').toLowerCase();

      const isActor = actorsString.indexOf(filter.toLowerCase()) !== -1;
      return  isExactName || isLikeName || isActor;
      //TODO filter by actors
    });
  };

  return {
    filterText,
    movies : filterMovies(movies, filterText),
    actors,

  };
}, (dispatch) => {
  return {
    addActor: (actor) => dispatch(addActor(actor)),
    addMovie: (movie) => dispatch(addMovie(movie)),
    updateFilterText: (filterText) => dispatch(updateFilterText(filterText)),
  }
})(Home);

export default Home;
