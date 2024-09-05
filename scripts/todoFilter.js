import {
  controlButtons,
  dragTextInfoElement,
  todoListElement,
} from "./todoDom";
import {
  removeTodoElements,
  addMissingTodos,
  countTodos,
  removeButtonsActive,
} from "./todoDomUtils";

import { sortable } from "./todoDom";

export const renderTodosByFilter = function (
  filterType,
  initialRender = false
) {
  const filterButton = Array.from(controlButtons).find(
    (el) => filterType === el.dataset.filterType
  );
  const filteredItems = Array.from(todoListElement.children).filter(
    (el) => el.dataset.status !== filterType
  );

  const dragText =
    filterType === "all"
      ? "Drag and drop to reorder list"
      : "Drag and drop is disabled in this view";

  addMissingTodos(initialRender);
  if (filterType !== "all") {
    removeTodoElements(filteredItems);

    todoListElement.classList.add("todo__filtered");
    sortable.option("disabled", true);
  }

  if (filterType === "all") {
    todoListElement.classList.remove("todo__filtered");
    sortable.option("disabled", false);
  }
  countTodos();

  dragTextInfoElement.textContent = dragText;
  removeButtonsActive();
  filterButton.classList.add("todo__controls-btn--active");
  filterButton.setAttribute("aria-pressed", true);
};
