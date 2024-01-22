import "./style.css";
import {useReducer} from "react";

// Define the initial state
const initialState = {
  currentOperand: '',
  previousOperand: '',
  operation: null,
}

// Define the reducer function
function reducer(state, action){
  switch(action.type){
    case 'CLEAR':
      return initialState;
    case 'DELETE':
      // Remove the last character from the current operand
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case 'ENTER':
      // Perform the operation on the previous and current operands
      // and update the state with the result
      return {
        ...state,
        previousOperand: '',
        currentOperand: eval(`${state.previousOperand} ${state.operation} ${state.currentOperand}`),
        operation: null,
      };
    case 'CHOOSE_OPERATION':
      // Update the state with the new operation
      return {
        ...state,
        previousOperand: state.currentOperand,
        currentOperand: '',
        operation: action.payload,
      };
    case 'NUMBER':
      // Add the number to the current operand
      return {
        ...state,
        currentOperand: `${state.currentOperand}${action.payload}`,
      };
    default:
      throw new Error();
  }
}

function App(){ 
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className='previous-operand'>{state.previousOperand} {state.operation}</div>
        <div className="current-operand">{state.currentOperand}</div>
      </div>
      <button className="span-two" onClick={() => dispatch({type: 'CLEAR'})}>AC</button>
      <button onClick={() => dispatch({type: 'DELETE'})}>DEL</button>
      <button onClick={() => dispatch({type: 'CHOOSE_OPERATION', payload: '/'})}>/</button>
      <button onClick={() => dispatch({type: 'NUMBER', payload: '1'})}>1</button>
      <button onClick={() => dispatch({type: 'NUMBER', payload: '2'})}>2</button>
      <button onClick={() => dispatch({type: 'NUMBER', payload: '3'})}>3</button>
      <button onClick={() => dispatch({type: 'CHOOSE_OPERATION', payload: '*'})}>*</button>
      <button onClick={() => dispatch({type: 'NUMBER', payload: '4'})}>4</button>
      <button onClick={() => dispatch({type: 'NUMBER', payload: '5'})}>5</button>
      <button onClick={() => dispatch({type: 'NUMBER', payload: '6'})}>6</button>
      <button onClick={() => dispatch({type: 'CHOOSE_OPERATION', payload: '+'})}>+</button>
      <button onClick={() => dispatch({type: 'NUMBER', payload: '7'})}>7</button>
      <button onClick={() => dispatch({type: 'NUMBER', payload: '8'})}>8</button>
      <button onClick={() => dispatch({type: 'NUMBER', payload: '9'})}>9</button>
      <button onClick={() => dispatch({type: 'CHOOSE_OPERATION', payload: '-'})}>-</button>
      <button className="span-two" onClick={() => dispatch({type: 'ENTER'})}>=</button>
      <button className="span-two" onClick={() => dispatch({type: 'NUMBER', payload: '0'})}>0</button>
    </div>
  )
}

export default App;