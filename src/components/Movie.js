import React from 'react'
import {Link} from 'react-router'


export default class Movie extends  React.Component {

  render (){

    return (
      <li
        className="movie-list-item animated fadeInUp" >

        <img
          className="movie-list-item-img"
          src={process.env.PUBLIC_URL + this.props.imageURL } alt=""/>

        <span className="movie-list-item-rate">{this.props.rating}</span>

        <Link to={`/movies/${this.props.id}`}>
          <h4>{this.props.name} </h4>
        </Link>

        <p> <strong>Genre: </strong> {this.props.genre}</p>
        <p> <strong>DIrector Name: </strong> {this.props.directorName}</p>
        <p>
          <strong>Actors: </strong>

          {this.props.actorIds.map((actorId, index) => {
            const _actor = this.props.actors[actorId]
            return <a key={actorId} href={`/actors/${actorId}`}>
              {`${_actor.firstName} ${_actor.lastName}, `}
            </a>

          })}
        </p>
      </li>
    )
  }


}