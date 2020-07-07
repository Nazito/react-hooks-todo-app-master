import React, { useContext, useReducer } from "react";
import ReactDOM from "react-dom";

import Store from "./context";
import reducer from "./reducer";

import { usePersistedContext, usePersistedReducer } from "./usePersist";

import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import CommentsForm from "./components/CommentsForm";
import CommentsList from "./components/CommentsList";

function App() {
  // create a global store to store the state
  const store = usePersistedContext(useContext(Store), "state");

  // `todos` will be a state manager to manage state.
  const [state, dispatch] = usePersistedReducer(
    useReducer(reducer, store),
    "state" // The localStorage key
  );

  return (
    // State.Provider passes the state and dispatcher to the down
    <Store.Provider value={{ state, dispatch }}>
      <div className="row d-flex justify-content-around pt-5">
        <div className="col-md-5 card pb-3">
          <TodoForm />
          <TodoList />
        </div>
        <div className="col-md-5 card pb-3">
          <CommentsForm />
          <CommentsList />
        </div>
      </div>
    </Store.Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
