import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/App';
import { rootReducer } from './reducers';

const store = createStore(rootReducer);

export default class UdaciCards extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
