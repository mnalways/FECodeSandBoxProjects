import "./styles.css";

export default function App() {
  const f1 = () => {
    return new Promise((resolve, reject) => {
      return setTimeout(() => {
        resolve("promise1 resolved");
      }, 5000);
    });
  };
  const f2 = () => {
    return new Promise((resolve, reject) => {
      return setTimeout(() => {
        resolve("promise2 resolved");
      }, 6000);
    });
  };
  const f3 = () => {
    return new Promise((resolve, reject) => {
      return setTimeout(() => {
        resolve("promise3 resolved");
        // reject("promise3 error out");
      }, 7000);
    });
  };

  const PromiseMyAll = async (arr: any) => {
    const ans: any = [];
    for (let i = 0; i < arr.length; i++) {
      try {
        const res = await arr[i];
        ans.push(res);
      } catch (err) {
        return new Promise((resolve, reject) => {
          return reject(err);
        });
      }
    }
    return new Promise((resolve, reject) => {
      return resolve(ans);
    });
  };

  const PromiseMyAllSettled = async (arr: any) => {
    const ans: any = [];
    for (let i = 0; i < arr.length; i++) {
      try {
        const res = await arr[i];
        ans.push(res);
      } catch (err) {
        ans.push(err);
      }
    }
    return new Promise((resolve, reject) => {
      return resolve(ans);
    });
  };

  const arr = [f1(), f2(), f3()];
  PromiseMyAll(arr).then((re) =>
    console.log("PollyFill Promise.all response:: ", re)
  );
  PromiseMyAllSettled(arr).then((re) =>
    console.log("PollyFill Promise.allSettled : ", re)
  );
  // Promise.all(arr).then((re) => console.log("Normal promise.all : ", re));

  return <h1>hi</h1>;
}
