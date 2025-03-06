import { combineReducers } from 'redux';
import { INCREMENT, DECREMENT } from './actions';

// Initial state
const initialState = {
  count: 0,
};

// Reducer function
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

// Combine reducers (even if it's only one)
const rootReducer = combineReducers({
  counter: counterReducer, // Ensure "counter" is used correctly in `useSelector`
});

export default rootReducer;
