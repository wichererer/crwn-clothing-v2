import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {PersistGate} from 'redux-persist/integration/react';
import {Elements} from "@stripe/react-stripe-js";

import App from './App';

import './index.scss';
import { persistor, store } from './store/store';
import {stripePromise} from "./utils/stripe/stripe.utils";

const rootElement = document.getElementById('root');

render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <Elements stripe={stripePromise}>

                <App/>
                </Elements>
            </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    rootElement
);
