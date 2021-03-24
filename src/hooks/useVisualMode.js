import { useState } from "react";

//functions to maintain current mode of form in state
export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  //sets current slected mode into state
  const transition = function (newMode, replace) {
    setMode(newMode);
    replace ?
      setHistory(prev => [...prev.slice(0, -1), newMode])
    : setHistory(prev => [...prev, newMode]);
  }

  //returns to previous mode
  const back = function () {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(prev => prev.slice(0, prev.length - 1));
    }
  };

  return { mode, transition, back };
};