import gsap from "gsap";
import {
  todoListElement,
  todoCountNumberElement,
  todoCountTextElement,
  controlButtons,
} from "./todoDom";
import { getState } from "./storage";
import crossIcon from "../images/icon-cross.svg";

export const createTodoElement = function (todo, initialRender = false) {
  const newTodoElement = document.createElement("li");
  newTodoElement.classList.add("todo__item", "card");
  if (todo.status === "completed") {
    newTodoElement.classList.add("todo__item--done");
  }

  newTodoElement.setAttribute("data-id", todo.id);
  newTodoElement.setAttribute("data-original-id", todo.originalId);
  newTodoElement.setAttribute("data-status", todo.status);
  newTodoElement.innerHTML = `        
      <input ${
        todo.status === "completed" ? "checked" : ""
      } aria-label="Mark todo as done" aria-labeledby="tododescription-${
    todo.originalId
  }" type="checkbox" class="checkboxcircle todo__checkbox ignore-dragging" />
          <span class="todo__description-wrapper par"><span id="tododescription-${
            todo.originalId
          }" class="todo__description">${todo.description}</span></span>
          <button class="btn todo__btn-delete ignore-dragging" aria-label="Delete todo">
            <img alt="cross sign for deleting todo" class="img" src="${crossIcon}"/>
            </button>
              `;

  if (!initialRender) {
    gsap.fromTo(
      newTodoElement,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, ease: "power1.out", duration: 0.25 }
    );
  }

  return newTodoElement;
};

export const countTodos = function () {
  const todoCount = document.querySelectorAll(
    ".todo__item[data-status='active']"
  ).length;

  if (todoCount > 1) {
    todoCountNumberElement.textContent = todoCount;
    todoCountTextElement.textContent = "items";
  } else if (todoCount === 1) {
    todoCountNumberElement.textContent = todoCount;
    todoCountTextElement.textContent = "item";
  } else {
    todoCountNumberElement.textContent = "No";
    todoCountTextElement.textContent = "item";
  }
};

export const removeTodoElements = function (todoElements) {
  if (Array.isArray(todoElements)) {
    todoElements.forEach((el) => todoListElement.removeChild(el));
    countTodos();
    return adjustListHeight();
  }
  gsap.to(todoElements, {
    opacity: 0,
    y: -20,
    onComplete: () => {
      todoListElement.removeChild(todoElements);
      countTodos();
      adjustListHeight();
    },
    duration: 0.15,
    ease: "power1.out",
  });
};

export const addMissingTodos = function (initialRender = false) {
  const state = getState();
  let missingTodos = [];
  const filter = state.appliedFilter;

  const existingIds = Array.from(todoListElement.children).map(
    (el) => el.dataset.originalId
  );

  missingTodos = state.todos.filter((el) => {
    return !existingIds.includes(el.originalId);
  });

  if (initialRender) {
    missingTodos = state.todos.filter((el) => {
      if (filter === "all") return true;
      else if (filter === "active") {
        return el.active;
      } else {
        return !el.active;
      }
    });
  }

  missingTodos.forEach((todo) => {
    const previousElement = Array.from(todoListElement.children).find(
      (child) => +child.dataset.id > todo.id
    );

    if (previousElement) {
      todoListElement.insertBefore(
        createTodoElement(todo, initialRender),
        previousElement
      );
      return adjustListHeight();
    }
    todoListElement.appendChild(createTodoElement(todo, initialRender));

    return adjustListHeight();
  });
};

export const adjustListHeight = function () {
  requestAnimationFrame(() => {
    let totalHeight = 0;
    Array.from(todoListElement.children).forEach((child) => {
      const elHeight = child.getBoundingClientRect().height;
      totalHeight += elHeight;
    });

    todoListElement.style.height = `${totalHeight}px`;
  });
};

export const animateInitialTodoLoad = function () {
  return gsap.fromTo(
    "li",
    { opacity: 0, y: -20 },
    {
      opacity: 1,
      y: 0,
      ease: "power1.out",
      stagger: 0.15,
      duration: 0.25,
    }
  );
};

export const removeButtonsActive = function () {
  controlButtons.forEach((btn) => {
    btn.classList.remove("todo__controls-btn--active");
    btn.setAttribute("aria-pressed", "false");
  });
};
