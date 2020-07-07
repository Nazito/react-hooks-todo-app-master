import React, { useContext } from "react";
import Store from "../context";
import "./TodoList.css";
import { TodoHeader } from "./TodoHeader";

export default function TodoList() {
  const { state, dispatch } = useContext(Store);

  const pluralize = count =>
    count > 1 ? `There are ${count} todos.` : `There is ${count} todo.`;

  let header =
    state.todos.length === 0 ? (
      <h4 className="ml-3">Yay! All todos are done! Take a rest!</h4>
    ) : (
      <TodoHeader>
        <span className="float-right">{pluralize(state.todos.length)}</span>
      </TodoHeader>
    );
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-12">
            <br />
            {header}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ul className="list-group">
              {state.todos.map((t, index) => (
                <li
                  key={index}
                  className={
                    state.selectedToDoID === t.id
                      ? "list-group-item d-flex align-items-center p-0 borderLeft5"
                      : "list-group-item d-flex align-items-center p-0"
                  }
                >
                  <div
                    className="col-md-8 p-3"
                    style={{ wordWrap: "break-word" }}
                    onClick={() =>
                      dispatch({ type: "SELECTED_TO_DO", payload: t })
                    }
                  >
                    {t.value}
                  </div>

                  <div
                    onClick={() =>
                      dispatch({ type: "SELECTED_TO_DO", payload: t })
                    }
                    className="col-md-1 btn-primary btn-sm p-0 mb-3 mt-3 mr-0 ml-0 justify-content-center d-flex rounded-circle"
                  >
                    {t.comments ? t.comments.length : "0"}
                  </div>

                  <button
                    className="float-right btn btn-outline-danger btn-sm p-1 pr-3 pl-3"
                    style={{ marginLeft: 15 }}
                    onClick={() =>
                      dispatch({ type: "DELETE", payload: t.value })
                    }
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
