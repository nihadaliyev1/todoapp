import { updateTodoState, getState, updateFilterState } from "./storage";
import { removeTodoElements } from "./todoDomUtils";
import {
  activeButtonElement,
  allButtonElement,
  completedButtonElement,
  clearButtonElement,
} from "./todoDom";
import { renderTodosByFilter } from "./todoFilter";

export const initializeControls = function () {
  allButtonElement.addEventListener("click", function () {
    const state = getState();
    if (state.appliedFilter === "all") return;
    updateFilterState("all");
    renderTodosByFilter("all");
  });

  activeButtonElement.addEventListener("click", function () {
    const state = getState();
    if (state.appliedFilter === "active") return;
    updateFilterState("active");
    renderTodosByFilter("active");
  });

  completedButtonElement.addEventListener("click", function () {
    const state = getState();
    if (state.appliedFilter === "completed") return;
    updateFilterState("completed");
    renderTodosByFilter("completed");
  });

  clearButtonElement.addEventListener("click", function () {
    const state = getState();

    const allCompletedTodos = Array.from(
      document.querySelectorAll(".todo__item[data-status='completed']")
    );
    const completedTodosIds = allCompletedTodos.map((el) => +el.dataset.id);
    newState = state.todos.filter(
      (todo) => !completedTodosIds.includes(todo.id)
    );
    updateTodoState(newState);
    removeTodoElements(allCompletedTodos);
  });
};
