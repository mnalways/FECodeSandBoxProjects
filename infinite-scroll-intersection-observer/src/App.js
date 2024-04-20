import "./styles.css";
import React, { useCallback, useEffect, useRef } from "react";

// given
export function getContent(offset, num) {
  let arr = [];
  for (var i = offset; i < offset + num; i++) {
    arr.push(i);
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(arr);
    }, Math.random() * 2000);
  });
}

const OFFSET = 10;

export default function App() {
  const [elements, setElements] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const ref = useRef();
  ref.current = new IntersectionObserver((entries) => {
    const target = entries[0]?.target;
    if (entries[0]?.isIntersecting && !loading) {
      setLoading(true);
      setPage((prev) => prev + 1);
      getContent(page * OFFSET, OFFSET)
        .then((res) => {
          setElements((prev) => [...prev, ...res]);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  });
  const addRef = useCallback(
    (node) => {
      if (node) {
        ref.current.observe(node);
      }
    },
    [ref]
  );

  useEffect(() => {
    getContent(page, OFFSET)
      .then((res) => {
        setElements(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      {elements.map((e, index) => {
        if (index + 1 === elements.length) {
          return (
            <div key={index} ref={addRef} className="item">
              {index}
            </div>
          );
        }
        return (
          <div key={index} className="item">
            {index}
          </div>
        );
      })}
      {loading ? <p>...loading</p> : null}
    </div>
  );
}
