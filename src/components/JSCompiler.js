import React, { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, Copy, Download } from 'lucide-react';
import './JSCompiler.css';

const JSCompiler = () => {
  const [code, setCode] = useState(`// Welcome to the JavaScript Compiler!
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
  const textareaRef = useRef(null);

  const runCode = () => {
    setIsRunning(true);
    setOutput('');
    
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

  const clearCode = () => {
    setCode('');
    setOutput('');
  };

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
            onChange={(e) => setCode(e.target.value)}
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
        </div>
      </div>
    </div>
  );
};

export default JSCompiler;
