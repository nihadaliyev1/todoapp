import { v4 as uuidv4 } from "uuid";

export const initializeStorage = function () {
  const state = {
    todos: [
      {
        description: "Complete online JavaScript course",
        id: 0,
        originalId: uuidv4(),
        active: false,
        status: "completed",
      },
      {
        description: "Jog around the park 3x",
        id: 1,
        originalId: uuidv4(),
        active: true,
        status: "active",
      },
      {
        description: "10 minutes meditation",
        id: 2,
        originalId: uuidv4(),
        active: true,
        status: "active",
      },
      {
        description: "Read for 1 hour",
        id: 3,
        originalId: uuidv4(),
        active: true,
        status: "active",
      },
      {
        description: "Pick up groceries",
        id: 4,
        originalId: uuidv4(),
        active: true,
        status: "active",
      },
      {
        description: "Complete Todo App",
        id: 5,
        originalId: uuidv4(),
        active: true,
        status: "active",
      },
    ],
    appliedFilter: "all",
    darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches
      ? true
      : false,
  };

  if (!localStorage.getItem("state")) {
    localStorage.setItem("state", JSON.stringify(state));
  }
};

export const updateFilterState = function (filterType) {
  const oldState = JSON.parse(localStorage.getItem("state"));
  localStorage.setItem(
    "state",
    JSON.stringify({ ...oldState, appliedFilter: filterType })
  );
};

export const updateTodoState = function (newState) {
  const oldState = JSON.parse(localStorage.getItem("state"));
  localStorage.setItem(
    "state",
    JSON.stringify({ ...oldState, todos: newState })
  );
};

export const updateDarkMode = function (darkMode) {
  const oldState = JSON.parse(localStorage.getItem("state"));
  localStorage.setItem(
    "state",
    JSON.stringify({ ...oldState, darkMode: darkMode })
  );
};

export const getState = function () {
  return JSON.parse(localStorage.getItem("state"));
};
