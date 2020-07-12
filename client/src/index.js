import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducers from './reducers'
import setUpSocket from './socket'
import handleNewMessage from './saga'
import username from './utils/name'
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
	reducers,
	applyMiddleware(sagaMiddleware)
)
const socket = setUpSocket(store.dispatch, username)
sagaMiddleware.run(handleNewMessage, {socket, username})
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, 
	document.getElementById('root')
);


