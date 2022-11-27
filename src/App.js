
import './App.css';
import OperationButton from './components/OperationButton';
import DigitButton from './components/DigitButton';
import { useReducer } from 'react'

// initial state
// const initState = {}

// actions
export const actions = {
  ADD_DIGIT: 'add_digit',
  CHOOSE_OPERATION: 'choose_operation',
  CLEAR: 'clear_all',
  DELETE_DIGIT: 'delete_digit',
  EVALUATE: 'evaluate'
}

// reducer
const reducer = (state, { type, payload }) => {
  switch (type) {
    case (actions.ADD_DIGIT):
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false
        }
      }
      if (payload.digit === '0' && state.currentOperand === '0') {
        return state
      }

      if (payload.digit === '.' && state.currentOperand.includes('.')) {
        return state
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`
      }

    case (actions.CLEAR):
      return {}

    case (actions.CHOOSE_OPERATION):
      if (state.previousOperand == null && state.currentOperand == null) {
        return state
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        }
      }
      if (state.currentOperand == null) 
      return {
           ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null
      }

    case (actions.EVALUATE):
      if (state.previousOperand == null || state.currentOperand == null || state.operation == null) {
        return state
      }
      return {
        ...state,
        previousOperand: null,
        currentOperand: evaluate(state),
        operation: null,
        overwrite: true
      }

    case (actions.DELETE_DIGIT):
      if (state.overwrite) {
        return state
      }

      if (state.currentOperand == null) {
        return state
      }

      if (state.currentOperand.length == 1) {
        return {
          ...state,
          currentOperand: null
        }
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
      
  }
}

const evaluate = ({ previousOperand, currentOperand, operation }) => {
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(current)) return ""

  let result = ""
  switch (operation) {
    case (':'):
      result = prev / current
      break
    case ('*'):
      result = prev * current
      break
    case ('+'):
      result = prev + current
      break
    case ('-'):
      result = prev - current
      break
  }

  return result.toString()
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})

  return (
    <div className="App">
      <div className='calculator-grid'>
        <div className='output'>
          <div className='previousOperand'>{previousOperand}{operation}</div>
          <div className='currentOperand'>{currentOperand}</div>
        </div>

        <button className='span-two' onClick={() => dispatch({ type: actions.CLEAR })}>AC</button>
        <button onClick={() => dispatch({ type: actions.DELETE_DIGIT })}>DEL</button>
        <OperationButton dispatch={dispatch} operation=':' />
        <DigitButton dispatch={dispatch} digit='1' />
        <DigitButton dispatch={dispatch} digit='2' />
        <DigitButton dispatch={dispatch} digit='3' />
        <OperationButton dispatch={dispatch} operation='*' />
        <DigitButton dispatch={dispatch} digit='4' />
        <DigitButton dispatch={dispatch} digit='5' />
        <DigitButton dispatch={dispatch} digit='6' />
        <OperationButton dispatch={dispatch} operation='+' />
        <DigitButton dispatch={dispatch} digit='7' />
        <DigitButton dispatch={dispatch} digit='8' />
        <DigitButton dispatch={dispatch} digit='9' />
        <OperationButton dispatch={dispatch} operation='-' />
        <DigitButton dispatch={dispatch} digit='.' />
        <DigitButton dispatch={dispatch} digit='0' />
        <button className='span-two' onClick={() => dispatch({ type: actions.EVALUATE })}>=</button>
      </div>
    </div>
  );
}

export default App;
