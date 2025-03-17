import React, { useCallback, useEffect, useMemo, useState } from "react";
import '../assets/css/searchSuggetion.css';


export default function SearchSuggestionComponent({ result, onSearchSelection }) {
  
  return (
    <div
      className={`absolute z-10 bg-white shadow-lg rounded-b-[10px] bg-white-500 w-[calc(100%-16px)]  border border-gray-300 focus:outline-none ${
        result && result.length ? "block slideDown-animation" : "hidden"
      }`}
    >{result.map((item) => (
      <p key={item.name} onClick={() => onSearchSelection(item.name)} className="px-2 py-1 cursor-pointer hover:bg-gray-100">
        {item.name}
        {/* <hr className="my-2"/> */}
      </p>
    ))
    }
    </div>
  );
}
