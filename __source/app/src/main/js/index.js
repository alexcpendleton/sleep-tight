import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import routes from './routes';
import { AppContainer } from 'react-hot-loader';
import Root from './routes'

import store from './store'

import Main from './components/main.js'

const render = (Component) => {
	ReactDOM.render(
		<Main/>,
		document.getElementById('root')
	)
}

render(Root)

if (module.hot) {
  module.hot.accept('./routes.js', () => {
	  const newRoot = require('./routes').default;
	  render(newRoot)
  })
}