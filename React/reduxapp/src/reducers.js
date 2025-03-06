import { combineReducers } from 'redux';
import { INCREMENT, DECREMENT } from './components/actions';

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

// Combine reducers
const rootReducer = combineReducers({
  counter: counterReducer, // Store as `counter`
});

export default rootReducer;
