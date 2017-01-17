import { applyMiddleware, createStore } from "redux"


import reducer from "./reducers"

//Degug middleware
import logger from "redux-logger"

//Redux persistance middleware with localStorage
const saver = store => next => action => {
  let result = next(action);
  const currState = store.getState();
  const savingState = {
    movies : currState.movies,
    actors: currState.actors
  };

  localStorage.setItem('MovieApp', JSON.stringify(savingState))
  return result;
}


const middleware = applyMiddleware(logger(),saver);

export default createStore(reducer, middleware)