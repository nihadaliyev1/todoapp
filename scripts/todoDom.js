import { countTodos, addMissingTodos } from "./todoDomUtils";
import Sortable, { get } from "sortablejs";
import { getState, updateDarkMode, updateTodoState } from "./storage";
import darkIconImg from "../images/icon-sun.svg";
import lightIconImg from "../images/icon-moon.svg";

export const todoListElement = document.querySelector(".todo__list");
export const todoFormElement = document.querySelector(".todo__form");
export const todoInputElement = document.querySelector(".todo__input");
export const allButtonElement = document.querySelector(
  "#todo__controls-btn-all"
);
export const activeButtonElement = document.querySelector(
  "#todo__controls-btn-active"
);
export const completedButtonElement = document.querySelector(
  "#todo__controls-btn-completed"
);
export const controlButtons = document.querySelectorAll(".todo__controls-btn");
export const todoCountNumberElement = document.querySelector(
  ".todo__count-number"
);
export const todoCountTextElement = document.querySelector(".todo__count-text");
export const clearButtonElement = document.querySelector(
  "#todo__controls-btn-clear"
);
export const dragTextInfoElement = document.querySelector(".todo__text-info");

export const darkModeBtnElement = document.querySelector(".darkmode-btn");

export const darkModeBtnImage = document.querySelector(".img-darkmode");

export const renderTodos = function () {
  addMissingTodos(true);

  countTodos();
};

export const sortable = new Sortable(todoListElement, {
  dataIdAttr: "data-id",
  animation: 150,
  onEnd: function () {
    const state = getState();
    const allListElements = Array.from(todoListElement.children);
    const newTodos = state.todos.map((todo) => {
      const todoElement = allListElements.find(
        (el) => el.dataset.originalId === todo.originalId
      );
      if (todoElement) {
        const newId = allListElements.indexOf(todoElement);
        todoElement.setAttribute("data-id", newId);
        return { ...todo, id: newId };
      }
      return todo;
    });
    updateTodoState(newTodos);
  },
});

darkModeBtnElement.addEventListener("click", function () {
  const state = getState();
  const darkMode = state.darkMode;
  document.body.classList.add(darkMode ? "light" : "dark");
  document.body.classList.remove(darkMode ? "dark" : "light");
  darkModeBtnImage.src = darkMode ? lightIconImg : darkIconImg;
  darkModeBtnElement.setAttribute("aria-pressed", !state.darkMode);

  updateDarkMode(!darkMode);
});

export const initializeDarkMode = function () {
  const state = getState();
  document.body.classList.add(state.darkMode ? "dark" : "light");
  document.body.classList.remove(state.darkMode ? "light" : "dark");
  darkModeBtnImage.src = state.darkMode ? darkIconImg : lightIconImg;
  darkModeBtnElement.setAttribute("aria-pressed", state.darkMode);
};
