import React from 'react'
import Movie from './Movie';


export default class MovieList extends  React.Component {

  render (){
    return (
      <ul className="movie-list-list" >
        {this.props.movies && this.props.movies.map( (movie, index) =>
          <Movie
            key={index}
            id={index}
            name={movie.name}
            directorName={movie.directorName}
            genre={movie.genre}
            actorIds={movie.actors}
            actors={this.props.actors}
            rating={movie.rating}
            imageURL={movie.imageURL}/>
        )}
      </ul>
    )
  }


}