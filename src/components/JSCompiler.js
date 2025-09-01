import React, { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, Copy, Download, CheckCircle, XCircle } from 'lucide-react';
import './JSCompiler.css';

const JSCompiler = ({ initialCode = '', onCodeChange, testCases = [], functionName = '', showTestResults = false }) => {
  const [code, setCode] = useState(initialCode || `// Welcome to the JavaScript Compiler!
// Write your JavaScript code here and click Run to execute it.

console.log("Hello, World!");

// Try some examples:
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log("Fibonacci of 7:", fibonacci(7));

// Array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log("Doubled numbers:", doubled);`);
  
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const textareaRef = useRef(null);

  const runCode = () => {
    setIsRunning(true);
    setOutput('');
    setTestResults([]);
    
    // Capture console output
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    let capturedOutput = '';

    const captureLog = (...args) => {
      capturedOutput += args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ') + '\n';
      originalLog(...args);
    };

    const captureError = (...args) => {
      capturedOutput += 'ERROR: ' + args.map(arg => String(arg)).join(' ') + '\n';
      originalError(...args);
    };

    const captureWarn = (...args) => {
      capturedOutput += 'WARNING: ' + args.map(arg => String(arg)).join(' ') + '\n';
      originalWarn(...args);
    };

    console.log = captureLog;
    console.error = captureError;
    console.warn = captureWarn;

    try {
      // Create a function to execute the code in a controlled environment
      const func = new Function(code);
      func();
      
      // Run test cases if provided
      if (testCases.length > 0 && functionName) {
        runTestCases();
      }
      
      if (capturedOutput.trim() === '') {
        capturedOutput = 'Code executed successfully (no output)';
      }
    } catch (error) {
      capturedOutput += `ERROR: ${error.message}\n`;
    } finally {
      // Restore original console methods
      console.log = originalLog;
      console.error = originalError;
      console.warn = captureWarn;
      
      setOutput(capturedOutput);
      setIsRunning(false);
    }
  };

  const runTestCases = () => {
    const results = [];
    
    try {
      // Execute the user's code to define the function
      const func = new Function(code);
      func();
      
      // Get the function from the global scope
      const userFunction = eval(functionName);
      
      if (typeof userFunction !== 'function') {
        setTestResults([{ error: `Function '${functionName}' not found or not a function` }]);
        return;
      }
      
      testCases.forEach((testCase, index) => {
        try {
          // Parse the input - handle different input formats
          let args;
          if (testCase.input.startsWith('[') || testCase.input.startsWith('{')) {
            // Array or object input
            args = [JSON.parse(testCase.input)];
          } else if (testCase.input.includes(',')) {
            // Multiple arguments
            args = testCase.input.split(',').map(arg => {
              arg = arg.trim();
              if (arg.startsWith('"') && arg.endsWith('"')) {
                return arg.slice(1, -1); // Remove quotes for strings
              }
              if (arg.startsWith('[') || arg.startsWith('{')) {
                return JSON.parse(arg);
              }
              return isNaN(arg) ? arg : Number(arg);
            });
          } else {
            // Single argument
            let arg = testCase.input.trim();
            if (arg.startsWith('"') && arg.endsWith('"')) {
              args = [arg.slice(1, -1)];
            } else if (arg.startsWith('[') || arg.startsWith('{')) {
              args = [JSON.parse(arg)];
            } else {
              args = [isNaN(arg) ? arg : Number(arg)];
            }
          }
          
          const result = userFunction(...args);
          const resultStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
          const expectedStr = testCase.expected;
          
          results.push({
            index: index + 1,
            input: testCase.input,
            expected: expectedStr,
            actual: resultStr,
            passed: resultStr === expectedStr
          });
        } catch (error) {
          results.push({
            index: index + 1,
            input: testCase.input,
            expected: testCase.expected,
            actual: `Error: ${error.message}`,
            passed: false
          });
        }
      });
      
      setTestResults(results);
    } catch (error) {
      setTestResults([{ error: `Failed to run test cases: ${error.message}` }]);
    }
  };

  const clearCode = () => {
    setCode('');
    setOutput('');
    setTestResults([]);
  };

  // Update code when initialCode prop changes
  useEffect(() => {
    if (initialCode && initialCode !== code) {
      setCode(initialCode);
    }
  }, [initialCode]);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code.js';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newValue = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newValue);
      
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div className="js-compiler">
      <div className="compiler-header">
        <h2>JavaScript Compiler</h2>
        <div className="compiler-actions">
          <button onClick={copyCode} className="action-btn" title="Copy Code">
            <Copy size={16} />
          </button>
          <button onClick={downloadCode} className="action-btn" title="Download Code">
            <Download size={16} />
          </button>
          <button onClick={clearCode} className="action-btn" title="Clear Code">
            <RotateCcw size={16} />
          </button>
          <button 
            onClick={runCode} 
            className="run-btn"
            disabled={isRunning}
          >
            <Play size={16} />
            {isRunning ? 'Running...' : 'Run Code'}
          </button>
        </div>
      </div>

      <div className="compiler-content">
        <div className="code-editor">
          <div className="editor-header">
            <span>Code Editor</span>
          </div>
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              if (onCodeChange) {
                onCodeChange(e.target.value);
              }
            }}
            onKeyDown={handleKeyDown}
            className="code-textarea"
            placeholder="Write your JavaScript code here..."
            spellCheck={false}
          />
        </div>

        <div className="output-panel">
          <div className="output-header">
            <span>Output</span>
          </div>
          <pre className="output-content">
            {output || 'Click "Run Code" to see output here...'}
          </pre>
          
          {testResults.length > 0 && (
            <div className="test-results">
              <div className="test-results-header">
                <span>Test Results</span>
                <span className="test-summary">
                  {testResults.filter(r => r.passed).length}/{testResults.length} passed
                </span>
              </div>
              <div className="test-cases">
                {testResults.map((result, index) => (
                  result.error ? (
                    <div key={index} className="test-case error">
                      <XCircle size={16} color="#ef4444" />
                      <span>{result.error}</span>
                    </div>
                  ) : (
                    <div key={index} className={`test-case ${result.passed ? 'passed' : 'failed'}`}>
                      {result.passed ? (
                        <CheckCircle size={16} color="#10b981" />
                      ) : (
                        <XCircle size={16} color="#ef4444" />
                      )}
                      <div className="test-details">
                        <div className="test-input">Input: {result.input}</div>
                        <div className="test-expected">Expected: {result.expected}</div>
                        <div className="test-actual">Actual: {result.actual}</div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JSCompiler;
