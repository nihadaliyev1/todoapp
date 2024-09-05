import { updateTodoState, getState } from "./storage";
import {
  createTodoElement,
  removeTodoElements,
  countTodos,
} from "./todoDomUtils";
import { todoListElement, todoFormElement, todoInputElement } from "./todoDom";
import DOMPurify from "dompurify";
import { v4 as uuidv4 } from "uuid";
import { Notyf } from "notyf";
import { adjustListHeight } from "./todoDomUtils";

let errorTimeout;

const markTodo = function (e, originalId) {
  const state = getState();

  if (e.target.type === "checkbox") {
    const newState = state.todos.map((todo) =>
      todo.originalId === originalId
        ? { ...todo, status: todo.status === "active" ? "completed" : "active" }
        : todo
    );
    const todo = state.todos.find((todo) => todo.originalId === originalId);
    const todoElement = e.target.closest("li");
    updateTodoState(newState);

    e.target.toggleAttribute("checked");
    todoElement.classList.toggle("todo__item--done");
    todoElement.setAttribute(
      "data-status",
      todoElement.getAttribute("data-status") === "completed"
        ? "active"
        : "completed"
    );
    countTodos();

    if (state.appliedFilter !== "all") {
      removeTodoElements(todoElement);
    }
  }
};

const removeTodo = function (e, originalId) {
  const state = getState();

  if (e.target.closest(".todo__btn-delete")) {
    newState = state.todos.filter((el) => el.originalId !== originalId);
    updateTodoState(newState);
    const todoElement = e.target.closest("li");
    removeTodoElements(todoElement);
  }
};

export const handleTodoClick = function (e) {
  if (!e.target.closest("li")) return;
  const todoOriginalId = e.target.closest("li").dataset.originalId;

  markTodo(e, todoOriginalId);

  removeTodo(e, todoOriginalId);
};

export const handleFormSubmit = function (e) {
  e.preventDefault();
  const userInput = todoInputElement.value.trim();
  const state = getState();

  if (!userInput) {
    if (errorTimeout) clearTimeout(errorTimeout);
    todoFormElement.classList.add("todo__form--error");
    errorTimeout = setInterval(
      () => todoFormElement.classList.remove("todo__form--error"),
      3000
    );

    return new Notyf({ position: { x: "right", y: "top" } }).error({
      message: "Please enter a task.",
      duration: 3000,
      className: "todo__notification",
    });
  }

  const description = DOMPurify.sanitize(userInput, {
    ALLOW_ARIA_ATTR: false,
    ALLOW_DATA_ATTR: false,
    ALLOWED_TAGS: [""],
    ALLOWED_ATTR: [""],
  });

  const maxId = state.todos?.sort((a, b) => b.id - a.id)[0]?.id + 1;

  const newTodo = {
    description,
    id: maxId || 0,
    originalId: uuidv4(),
    status: "active",
  };
  newState = [...state.todos, newTodo];
  updateTodoState(newState);

  if (state.appliedFilter !== "completed") {
    todoListElement.appendChild(createTodoElement(newTodo));
  }
  adjustListHeight();

  new Notyf({ position: { x: "right", y: "top" } }).success({
    message: "Task successfully added",
    duration: 3000,
    className: "todo__notification",
  });

  countTodos();
  todoInputElement.value = "";
};
