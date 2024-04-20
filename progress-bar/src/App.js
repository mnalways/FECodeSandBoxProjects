import { useState, useRef, useEffect } from "react";
import "./styles.css";

// for /u/BobbyJenkins1212
// https://www.reddit.com/r/reactjs/comments/qgg66y/help_me_fix_my_progress_bar_component/

export default function App() {
  const [percent, setPercent] = useState(0);
  let callback = useRef();

  useEffect(() => {
    if (percent < 100) {
      callback.current = () => {
        setPercent(percent + 1);
      };
    }
  }, [percent]);

  useEffect(() => {
    const interval = setInterval(() => {
      callback.current();
      console.log("hi");
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h1> Automatic Progress Bar</h1>
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${percent}%` }}>
          {" "}
        </div>
      </div>
    </div>
  );
}
