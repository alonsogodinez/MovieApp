
import { combineReducers } from "redux"

import movies from "./movieReducer"
import actors from "./actorsReducer"
import searchBox from "./searchBoxReducer"
import { routerReducer } from 'react-router-redux'

export default combineReducers({
  movies,
  actors,
  searchBox,
  routing: routerReducer
})