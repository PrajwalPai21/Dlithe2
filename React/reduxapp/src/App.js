import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './components/actions';

const App = () => {
  // Get the current count from the Redux store
  const count = useSelector(state => state.count);
  
  // Dispatch function to dispatch actions
  const dispatch = useDispatch();

  return (
    <div>
      <h1>React Redux Counter</h1>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

export default App;
