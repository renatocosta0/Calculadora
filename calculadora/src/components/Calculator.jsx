import React from 'react'
import { useState } from 'react';
import './Calculator.css'

const Calculator = () => {
    let result;
    let blocked = "=";

    const [currentValue, setCurrentValue] = useState('0');
    const [pendingOperation, setPendingOperation] = useState(null);
    const [pendingValue, setPendingValue] = useState(null);
    const [completeOperation, setCompleteOperation] = useState("");

    const keypadNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const operations = ['+', '-', '*', '/'];
    const clearOperations = ['CE', 'AC'];
    const [displayClear, setDisplayClear] = useState(clearOperations[0])
      
    const handleClick = (val) => {

        setDisplayClear(clearOperations[0])

        setCurrentValue(prevValue => {
          if (prevValue === '0') {
            return val;
          } else {
            return prevValue + val;
          }
        });

        setCompleteOperation(prevOperation => {
            if (prevOperation.includes(blocked)) {
                return prevOperation;
            } else {
                    return prevOperation + val;
                  }
        });
    };
    
    const handleOperation = (operation) => {
      setDisplayClear(clearOperations[0])
      setCompleteOperation(currentValue + " " + operation);
      setPendingOperation(operation);
      setPendingValue(currentValue);
      setCurrentValue('0');
    };
    
    const handleCalculate = () => {

        setDisplayClear(clearOperations[1])
    
    if (!pendingOperation || !pendingValue) {
      return;
    }

    
    const num1 = parseFloat(pendingValue);
    const num2 = parseFloat(currentValue);
    
    
    switch (pendingOperation) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        if (num2 !== 0) {
          result = num1 / num2;
        } else {
          setCurrentValue("Error");
          setCompleteOperation("Error");
          setPendingOperation(null);
          setPendingValue(null);
          return;
        }
        break;
      default:
        return;
    }
    
    setCompleteOperation(pendingValue + " " + pendingOperation + " " + currentValue + " = " + result);
    setCurrentValue(result.toString());
    setPendingOperation(null);
    setPendingValue(null);
    };
    
      
    
      const handleClear = () => {

        if (displayClear === clearOperations[1]) {
            setCurrentValue('0');
           setPendingOperation(null);
           setPendingValue(null);
          setCompleteOperation('');
        } else {

            if (currentValue === '0') {
                const valueE = completeOperation.slice(0, -1)
                setCompleteOperation(valueE);
                return;
           }

           if (currentValue.length === 1) {
             setCurrentValue('0');
             setPendingOperation(null);
             setPendingValue(null);
            setCompleteOperation('');
          }

            if (currentValue.length > 1) {
                const novoCurrentValue = currentValue.slice(0, -1);
                setCurrentValue(novoCurrentValue);

                if (!pendingOperation || !pendingValue) {
                    return setCompleteOperation(novoCurrentValue)
                  } else {
                    return setCompleteOperation(pendingValue + " " + pendingOperation + " " + novoCurrentValue);
                  }

            }
        }
    


      };
    

  return (
    <div className="bod">
    <div className='calculator'>
        <div className="complete-operation">{completeOperation}</div>
        <div className="display">{currentValue}</div>
        <div className="buttons">
              <button onClick={handleClear}>{displayClear}</button>
            {keypadNumbers.map((num) => (
              <button key={num} onClick={() => handleClick(num)}>{num}</button>
            ))}
             {operations.map((operation) => (
              <button key={operation} onClick={() => handleOperation(operation)}>{operation}</button>
            ))}
        <button onClick={handleCalculate}>=</button>
        </div>

    </div>
    </div>
  )
}

export default Calculator