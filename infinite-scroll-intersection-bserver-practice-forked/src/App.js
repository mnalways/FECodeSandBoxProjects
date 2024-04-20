import "./styles.css";
import { useState, useRef } from "react";
import Styles from "./app.module.scss";
import { getNumbers } from "./app.util";
const OFFSET = 10;
export default function App() {
  const [items, setItems] = useState([0]);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);

  ref.current = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (entry.isIntersecting && !loading) {
      setLoading(true);
      const res = getNumbers(items.length, OFFSET);
      setItems([...items, ...res]);
      setLoading(false);
    }
  });

  const addRef = (reference) => {
    if (reference) {
      ref?.current?.observe(reference);
    }
  };

  return (
    <div className={Styles.container}>
      {items.map((item, index) => {
        if (items.length == index + 1) {
          return (
            <div key={index} ref={addRef} className={Styles.box}>
              {item}
            </div>
          );
        }
        return (
          <div key={index} className={Styles.box}>
            {item}
          </div>
        );
      })}
    </div>
  );
}
