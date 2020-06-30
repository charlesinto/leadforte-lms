import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import AppRoot from "./AppRoot";


function App() {
  return (
    <Provider store={store}>
          <AppRoot />
    </Provider>
  );
}

export default App;
