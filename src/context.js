import React from "react";

// Store Context is the global context that is managed by reducers.

const Store = React.createContext({
  // Initial Data
  todos: [],
  selectedToDoID: null,
  selectedColor: null
});

export default Store;
