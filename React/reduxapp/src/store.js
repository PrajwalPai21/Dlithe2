import { createStore } from 'redux';
import rootReducer from './components/reducers'; // ✅ Now importing rootReducer

// Create Redux store
const store = createStore(rootReducer);

export default store;
