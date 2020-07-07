import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productReducer from './productReducer';
import menuReducer from './menuReducer';
import listingReducer from './listingReducer';
import userReducer from './userReducer';
import globalErrorReducer from './globalErrorReducer';
import otherReducer from './otherReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  authentication: authReducer,
  products: productReducer,
  menu: menuReducer,
  listing: listingReducer,
  user: userReducer,
  globalError: globalErrorReducer,
  other: otherReducer,
  cart: cartReducer
});

export default rootReducer;
