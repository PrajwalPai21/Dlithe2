import { createStore } from 'redux';
import rootReducer from './reducers'; // Make sure this matches your file name

// Create Redux store
const store = createStore(rootReducer);

export default store;
