import React, { useCallback, useEffect, useMemo, useState } from "react";
import '../assets/css/SearchSuggetion.css';
export default function SearchSuggestionComponent({ result }) {
  const [prev_result, setPrevResult] = useState([]);

  // Use useCallback to memoize the click handler function
  const onSearchItemClick = useCallback((name) => {
    alert(name);
  }, []);

  // Use useMemo to memoize the search items
  const search_items = useMemo(() => {
    return result.map((item) => (
      <p
        key={item.name}
        onClick={() => onSearchItemClick(item.name)}
        style={{ cursor: "pointer", marginBottom: "5px" ,background: "white"}}
        className="bg-white-500 p-2"
      >
        {item.name}
      </p>
    ));
  }, [result, onSearchItemClick]);

  useEffect(() => {
    if (prev_result.length === 0 && result.length > 0) {
      const timer = setTimeout(() => {
        setPrevResult(result);
      }, 500); // Wait for animation to complete (0.5s in this case)
      return () => clearTimeout(timer);
    } else {
      setPrevResult(result);
    }
  }, [result, prev_result]);

  return (
    <div
      className={`absolute shadow-lg rounded-b-[10px] bg-white-500 w-[calc(100%-16px)]  border border-gray-300 focus:outline-none ${
        result && result.length ? "block slideDown-animation" : "hidden"
      }`}
    >
      {search_items}
    </div>
  );
}
