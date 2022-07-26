import { combineReducers } from 'redux';
import {userReducer} from './user/user.reducer'
import { categoriesReudcer } from './categories/category.reducer';

export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReudcer
});