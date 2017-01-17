export function addMovie(movie) {
  return {
    type: 'ADD_MOVIE',
    payload: movie
  }
}

export function updateMovie(props) {
  return {
    type: 'UPDATE_MOVIE',
    payload: props,
  }
}

export function deleteMovie(id) {
  return { type: 'DELETE_MOVIE', payload: id}
}

