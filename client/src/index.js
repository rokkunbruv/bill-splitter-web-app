import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';

import reducers from './reducers';

import App from './App';
import './index.css';

import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
