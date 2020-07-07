import React, { useContext, useState } from "react";
import { SketchPicker } from "react-color";
import Store from "../context";

export default function CommentsForm() {
  const { dispatch } = useContext(Store);

  // Creating a local state to have currently writing
  // todo item that will be sent to the global store.
  const [comment, setComment] = useState("");
  const [color, setColor] = useState("#000000");
  const [showPopup, setShowPopup] = useState(false);

  let handlePopup = () => {
    setShowPopup(!showPopup);
  };

  let handleTodoChange = e => {
    setComment(e.target.value);
  };

  let handleTodoAdd = () => {
    dispatch({
      type: "ADD_COMMENT",
      payload: { value: comment, selectedColor: color }
    });
    dispatch({ type: "SELECTED_COLOR", payload: color });
    setComment("");
  };

  let handleSubmitForm = event => {
    if (event.keyCode === 13) handleTodoAdd();
  };

  return (
    <div className="row container-form">
      <br />

      {showPopup ? (
        <div className="d-flex flex-column colorPicker">
          <SketchPicker
            color={color}
            onChangeComplete={color => {
              setColor(color.hex);
            }}
          />
          <button onClick={handlePopup} className="btn btn-outline-success">
            OK
          </button>
        </div>
      ) : null}

      <div className="col-md-12 d-flex pt-3 pb-3">
        <div className="p-2 border mr-2">
          <div
            style={{ backgroundColor: color }}
            className="item-flag m-1"
            onClick={handlePopup}
          ></div>
        </div>

        <div className="input-group">
          <input
            className="form-control h-auto"
            value={comment}
            autoFocus={true}
            placeholder="Enter new comment"
            onKeyUp={handleSubmitForm}
            onChange={handleTodoChange}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" onClick={handleTodoAdd}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
