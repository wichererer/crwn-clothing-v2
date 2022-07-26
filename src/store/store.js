import { compose, createStore, applyMiddleware } from 'redux';
import logger  from 'redux-logger';

import { rootReducer } from './root-reducer';

const middleWares = [logger];
const composedEnhancesr = compose(applyMiddleware(...middleWares));
export const store = createStore(rootReducer, undefined, composedEnhancesr);