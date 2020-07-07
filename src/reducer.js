import Store from "./context";

export default function reducer(state = Store, action) {
  switch (action.type) {
    case "ADD_TODO":
      // return current state if empty
      if (!action.payload) {
        return state;
      }
      // return current state if duplicate
      if (state.todos.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };

    case "ADD_COMMENT":
      const indexToDo = state.todos
        .map((item) => {
          return item.id;
        })
        .indexOf(state.selectedToDoID);

      const selectedToDo = state.todos[indexToDo];
      if (selectedToDo) {
        selectedToDo.comments.push(action.payload);
        const newTodos = [
          ...state.todos.slice(0, indexToDo),
          selectedToDo,
          ...state.todos.slice(indexToDo + 1)
        ];

        return {
          ...state,
          todos: newTodos
        };
      }

      return {
        ...state
      };
    case "DELETE":
      return {
        ...state,
        todos: state.todos.filter((t) => t.value !== action.payload)
      };
    case "SELECTED_COLOR":
      return {
        ...state,
        selectedColor: action.payload
      };
    case "SELECTED_TO_DO":
      return {
        ...state,
        selectedToDoID: action.payload.id
      };
    default:
      return state;
  }
}
