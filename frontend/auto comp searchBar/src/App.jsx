import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [result, setResult] = useState([]);
  const [text, setText] = useState("");
  const [focus, setFocus] = useState(false);
  const [cache, setCache] = useState(() => {
    return JSON.parse(localStorage.getItem("localRescipe")) || [];
  });

  const fetchData = async () => {
    if (cache[text]) {
      console.log("cache", text);
      setResult(cache[text]);
      return;
    }
    try {
      console.log("api", text);
      const data = await fetch(
        `https://dummyjson.com/recipes/search?q=${text}`
      );
      const res = await data.json();
      setResult(res.recipes);
      setCache((prev) => ({ ...prev, [text]: res.recipes }));
      localStorage.setItem("localRescipe", JSON.stringify(cache));
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (val) => {
    setText(val.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 400);
    return () => {
      clearTimeout(timer);
    };
  }, [text]);
  return (
    <div className="App">
      <h2>Auto complete search bar</h2>
      <input
        type="text"
        onChange={(e) => handleInput(e)}
        className="inputBox"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />

      {focus && (
        <div className="dropdown">
          {result.map((ele) => (
            <span key={ele.id} className="items">
              {" "}
              {ele.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
