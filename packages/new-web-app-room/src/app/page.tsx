'use client';

import { useState } from 'react';
import ThemeToggle from './components/ThemeToggle';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const toggleSign = () => {
    if (display !== '0') {
      setDisplay(display.charAt(0) === '-' ? display.slice(1) : '-' + display);
    }
  };

  const percentage = () => {
    const value = parseFloat(display) / 100;
    setDisplay(String(value));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-4 transition-colors">
      <ThemeToggle />
      <div className="bg-gray-100 dark:bg-black rounded-3xl p-6 shadow-2xl border border-gray-300 dark:border-gray-800 transition-colors">
        {/* Display */}
        <div className="bg-white dark:bg-black rounded-2xl p-6 mb-4 border border-gray-200 dark:border-gray-700 transition-colors">
          <div className="text-right text-black dark:text-white text-6xl font-light leading-none min-h-[80px] flex items-end justify-end overflow-hidden transition-colors">
            {display.length > 9 ? display.slice(0, 9) : display}
          </div>
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <button
            onClick={clear}
            className="bg-gray-400 hover:bg-gray-300 text-black text-2xl font-medium rounded-full h-20 w-20 transition-colors"
          >
            AC
          </button>
          <button
            onClick={toggleSign}
            className="bg-gray-400 hover:bg-gray-300 text-black text-2xl font-medium rounded-full h-20 w-20 transition-colors"
          >
            ±
          </button>
          <button
            onClick={percentage}
            className="bg-gray-400 hover:bg-gray-300 text-black text-2xl font-medium rounded-full h-20 w-20 transition-colors"
          >
            %
          </button>
          <button
            onClick={() => performOperation('÷')}
            className={`text-white text-3xl font-light rounded-full h-20 w-20 transition-colors ${
              operation === '÷' ? 'bg-white text-blue-600 dark:text-orange-500' : 'bg-blue-600 dark:bg-orange-500 hover:bg-blue-500 dark:hover:bg-orange-400'
            }`}
          >
            ÷
          </button>

          {/* Row 2 */}
          <button
            onClick={() => inputNumber('7')}
            className="bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-black dark:text-white text-2xl font-light rounded-full h-20 w-20 transition-colors border border-gray-300 dark:border-gray-600"
          >
            7
          </button>
          <button
            onClick={() => inputNumber('8')}
            className="bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-black dark:text-white text-2xl font-light rounded-full h-20 w-20 transition-colors border border-gray-300 dark:border-gray-600"
          >
            8
          </button>
          <button
            onClick={() => inputNumber('9')}
            className="bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-black dark:text-white text-2xl font-light rounded-full h-20 w-20 transition-colors border border-gray-300 dark:border-gray-600"
          >
            9
          </button>
          <button
            onClick={() => performOperation('×')}
            className={`text-white text-3xl font-light rounded-full h-20 w-20 transition-colors ${
              operation === '×' ? 'bg-white text-blue-600 dark:text-orange-500' : 'bg-blue-600 dark:bg-orange-500 hover:bg-blue-500 dark:hover:bg-orange-400'
            }`}
          >
            ×
          </button>

          {/* Row 3 */}
          <button
            onClick={() => inputNumber('4')}
            className="bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-black dark:text-white text-2xl font-light rounded-full h-20 w-20 transition-colors border border-gray-300 dark:border-gray-600"
          >
            4
          </button>
          <button
            onClick={() => inputNumber('5')}
            className="bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-black dark:text-white text-2xl font-light rounded-full h-20 w-20 transition-colors border border-gray-300 dark:border-gray-600"
          >
            5
          </button>
          <button
            onClick={() => inputNumber('6')}
            className="bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-black dark:text-white text-2xl font-light rounded-full h-20 w-20 transition-colors border border-gray-300 dark:border-gray-600"
          >
            6
          </button>
          <button
            onClick={() => performOperation('-')}
            className={`text-white text-3xl font-light rounded-full h-20 w-20 transition-colors ${
              operation === '-' ? 'bg-white text-blue-600 dark:text-orange-500' : 'bg-blue-600 dark:bg-orange-500 hover:bg-blue-500 dark:hover:bg-orange-400'
            }`}
          >
            −
          </button>

          {/* Row 4 */}
          <button
            onClick={() => inputNumber('1')}
            className="bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-black dark:text-white text-2xl font-light rounded-full h-20 w-20 transition-colors border border-gray-300 dark:border-gray-600"
          >
            1
          </button>
          <button
            onClick={() => inputNumber('2')}
            className="bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-black dark:text-white text-2xl font-light rounded-full h-20 w-20 transition-colors border border-gray-300 dark:border-gray-600"
          >
            2
          </button>
          <button
            onClick={() => inputNumber('3')}
            className="bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-black dark:text-white text-2xl font-light rounded-full h-20 w-20 transition-colors border border-gray-300 dark:border-gray-600"
          >
            3
          </button>
          <button
            onClick={() => performOperation('+')}
            className={`text-white text-3xl font-light rounded-full h-20 w-20 transition-colors ${
              operation === '+' ? 'bg-white text-blue-600 dark:text-orange-500' : 'bg-blue-600 dark:bg-orange-500 hover:bg-blue-500 dark:hover:bg-orange-400'
            }`}
          >
            +
          </button>

          {/* Row 5 */}
          <button
            onClick={() => inputNumber('0')}
            className="bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-black dark:text-white text-2xl font-light rounded-full h-20 w-40 col-span-2 transition-colors border border-gray-300 dark:border-gray-600"
          >
            0
          </button>
          <button
            onClick={inputDecimal}
            className="bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-black dark:text-white text-2xl font-light rounded-full h-20 w-20 transition-colors border border-gray-300 dark:border-gray-600"
          >
            .
          </button>
          <button
            onClick={handleEquals}
            className="bg-blue-600 dark:bg-orange-500 hover:bg-blue-500 dark:hover:bg-orange-400 text-white text-3xl font-light rounded-full h-20 w-20 transition-colors"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}









