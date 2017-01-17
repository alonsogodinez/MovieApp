
export function addActor(newActor) {
  return {
    type: 'ADD_ACTOR',
    payload: newActor
  }
}

export function updateActor(props) {
  return {
    type: 'UPDATE_ACTOR',
    payload: props,
  }
}

export function deleteActor(id) {
  return { type: 'DELETE_ACTOR', payload: id}
}

