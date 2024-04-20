import "./styles.css";
import { useState, useEffect } from "react";

const myDebounce = (fn, timeout) => {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, timeout);
  };
};

export default function App() {
  const [input, setInput] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(input);
    }, 1000);
    return () => clearTimeout(timer);
  }, [input]);
  const debouncedLog = myDebounce(() => console.log(input), 1000);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <input type="text" onChange={(e) => setInput(e.target.value)} />
    </div>
  );
}
