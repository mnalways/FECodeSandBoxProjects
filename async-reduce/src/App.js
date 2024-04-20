import { useEffect } from "react";
import "./styles.css";

export default function App() {
  const getNum = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(10);
      }, 1000);
    });
  };

  const run = async () => {
    const p = [1, 2, 3, 4, 5];
    const answer = await p.reduce(async (acc, item) => {
      // new Promise((resolve, reject) => resolve(ans));
      const ans = await acc;
      const variable = await getNum();
      ans.push(variable + item);
      return Promise.resolve(ans);
    }, Promise.resolve([]));
    console.log("answer", answer);
  };

  useEffect(() => run(), []);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
