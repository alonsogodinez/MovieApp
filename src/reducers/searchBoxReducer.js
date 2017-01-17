export default function reducer(state={
  searchText: ""
}, action) {

  switch (action.type) {

    case "UPDATE_FILTER_TEXT": {
      return {
        ...state,
        filterText: action.payload,
      }
    }
    default:
      return state
  }

}