import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import App from './components/App';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>
, document.getElementById('root'));

registerServiceWorker();
