import React from 'react';
import ReactDOM from 'react-dom';


import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import store from './store'


import {Provider} from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

const history = syncHistoryWithStore(browserHistory, store)

import Home from './components/Home';
import App from './components/App';
import NotFound from './components/NotFound';
import MovieDetail from './components/MovieDetail'
import ActorDetail from './components/ActorDetail'


ReactDOM.render(

  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="movies/:key" component={MovieDetail}/>
        <Route path="actors/:key" component={ActorDetail}/>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);


