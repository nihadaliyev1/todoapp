import {
  renderTodos,
  todoListElement,
  todoFormElement,
  initializeDarkMode,
} from "./todoDom";
import { handleTodoClick, handleFormSubmit } from "./todoEventHandlers";
import { initializeControls } from "./todoControls";
import { adjustListHeight, animateInitialTodoLoad } from "./todoDomUtils";
import "notyf/notyf.min.css";
import { getState, initializeStorage } from "./storage";

import { renderTodosByFilter } from "./todoFilter";

// Initialize state with localstorage
initializeStorage();

// Initialize dark or light mode of website

initializeDarkMode();

// Get Application State
const state = getState();

// Render  todos that are stored in localstorage or empty and not added yet
// takes into account also filter

renderTodosByFilter(state.appliedFilter, true);

// Adjust the height of the list for the sake of smooth animation
// throughout the app

adjustListHeight();

// Run list animation when all DOM content is rendered
document.addEventListener("DOMContentLoaded", animateInitialTodoLoad);

// Handle all todo related events
todoListElement.addEventListener("click", handleTodoClick);

// Handle all form related events
todoFormElement.addEventListener("submit", handleFormSubmit);

// Initialize and handle all filter events
initializeControls();
