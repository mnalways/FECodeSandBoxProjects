import "./styles.css";
import { useEffect, useState } from "react";
import { getContent } from "./AppService";
import Style from "./App.module.scss";

const BUCKET_NUMBER = 10;
export default function App() {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(1);
  const [isLoading, setLoading] = useState(false);
  // const [count, setCount] = useState(0);
  const getElements = async (inc, number) => {
    // let tempCount = count + 1;
    // setCount(tempCount);
    try {
      setLoading(true);
      const res = await getContent(inc, number);
      // console.log("count", count, tempCount);
      // if (tempCount === count) {
      setData((prev) => [...prev, ...res]);
      // }
      setOffset(inc + number);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  // console.log("count on", count);

  useEffect(() => {
    getElements(offset, 31);
    // setOffset(51);
  }, []);

  const onScroll = (e) => {
    console.log("scrollHeight", e.target.scrollHeight);
    console.log("scrollTop", e.target.scrollTop);
    console.log("clientHeight", e.target.clientHeight);
    const E = e.target;
    // && !isLoading
    if (E.clientHeight + E.scrollTop + 10 >= E.scrollHeight && !isLoading) {
      getElements(offset, BUCKET_NUMBER);
      // setOffset(offset + BUCKET_NUMBER);
    }
  };

  return (
    <div className={Style.Container} onScroll={onScroll}>
      {data.map((item) => {
        return (
          <div key={item} className={Style.box}>
            {item}
          </div>
        );
      })}
      <div hidden={!isLoading}>Loading...</div>
    </div>
  );
}
