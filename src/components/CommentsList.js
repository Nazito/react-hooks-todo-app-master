import React, { useContext } from "react";
import "./CommentsList.css";
import Store from "../context";

export default function CommentsList() {
  const { state } = useContext(Store);

  const selectedToDo = state.todos.find(item => {
    return item.id === state.selectedToDoID;
  });

  let header = !selectedToDo ? (
    <h4>No selected todo!</h4>
  ) : (
    <h4 className="d-flex">
      {!selectedToDo.comments.length
        ? `No comments for this todos!`
        : `Comments for  #${selectedToDo.id}`}
    </h4>
  );
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-12">{header}</div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ul className="list-group">
              {selectedToDo &&
                selectedToDo.comments &&
                selectedToDo.comments.map((t, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex align-items-center p-0"
                  >
                    <div
                      className="item-flag m-1 ml-3"
                      style={{ backgroundColor: t.selectedColor }}
                    ></div>
                    <div className="col-10 p-3">{t.value}</div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
