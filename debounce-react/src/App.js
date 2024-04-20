import "./styles.css";

export default function App() {
  function getData(value) {
    console.log("value is ", value.target.value);
  }
function debounce(fn, d) {
  let timer;
  const fun = fn.bind(this);
  return function (arg) {
    clearTimeout(timer);
    timer = setTimeout(function () {
      fun(arg);
    }, d);
  };
}

const getSuggestions = debounce(getData, 200);

  return (<input type={'text'} onChange={getSuggestions} />);
}
