import { useSelector, useDispatch } from "react-redux";
import './App.css';


import { ADD_COUNT, SUBTRACT_COUNT, RESET } from "./store/redux-store";

function App() {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  function addOne(){
    dispatch({ type: ADD_COUNT, payload: 1 });
  }

  function subtractOne(){
    dispatch({ type: SUBTRACT_COUNT, payload: 1 });
  }

  function reset(){
    dispatch({ type: RESET });
  }

  return (
    <div className="App">
      <h1>React Redux</h1>
      <button onClick={addOne}>+</button>
      <span>{counter}</span>
      <button onClick={subtractOne}>-</button>
      <div>
        <button onClick={reset}>Reset</button>
      </div>
        <hr>
        <MojaKomponenta />
        <MojaKomponenta2 />
        </hr>
    </div>
  );
}

export default App;
