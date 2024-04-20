import { useCallback, useEffect, useState, useMemo } from "react";
import { getSuggestions } from "./AppService";
import "./styles.css";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const makeItSync = useCallback((fn) => {
    let count = 0;
    return async (...args) => {
      count = count + 1;
      const tempCount = count;
      const res = await fn(args);
      return new Promise((resolve, reject) => {
        return tempCount != count ? reject() : resolve(res);
      });
    };
  }, []);

  const syncedGetSuggestions = useMemo(() => makeItSync(getSuggestions), []);

  const fetchSuggestions = async (word) => {
    if (!word || word.length == 0) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await syncedGetSuggestions(word);
      console.log(res);
      setSuggestions(res);
    } catch (error) {
      console.log("error");
    }
  };

  const debounce = useCallback((fn) => {
    let timer = null;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(args);
      }, 2000);
    };
  }, []);

  const debouncedFetchSuggestion = useMemo(
    () => debounce(fetchSuggestions),
    []
  );

  const getCurrentWord = (current, previous) => {
    const currentWords = current.split(" ");
    const previousWords = previous.split(" ");
    let changedWord = "";
    currentWords.forEach((word, index) => {
      if (word != previousWords[index]) {
        changedWord = word;
        setCurrentWordIndex(index);
      }
    });
    return changedWord;
  };

  const changeQuery = (suggestion) => {
    const arr = searchQuery.split(" ");
    arr[currentWordIndex] = suggestion;
    setSearchQuery(arr.join(" "));
    setSuggestions([]);
  };

  const onChange = (query) => {
    const completeQuery = query.target.value;
    const currentWord = getCurrentWord(completeQuery, searchQuery);
    setSearchQuery(completeQuery);
    debouncedFetchSuggestion(currentWord);
    // fetchSuggestions(currentWord);
  };
  return (
    <div>
      <input name="search" onChange={onChange} value={searchQuery}></input>
      <ul>
        {suggestions.map((suggestion, index) => {
          return (
            <li key={index} onClick={() => changeQuery(suggestion)}>
              {suggestion}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
