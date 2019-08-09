import React,{Suspense} from 'react';
import {Provider} from 'react-redux'
import store from './ht/store'
import Router from './ht/router'
import './ht/index.scss'
function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<div>Loading......</div>}>
      <Router></Router>
      </Suspense>
    </Provider>
  );
}

export default App;
