import { TodoList } from './classes/'; // if you don't have a specific file, look for the index.js
import { newTodoHtml } from './js/components';

import './styles.css';

export const todoList = new TodoList();

// const task = new Todo('Learn Javascript');
// // const task2 = new Todo('Learn PHP');

// todoList.newTodo(task);
// // todoList.newTodo(task2);

// newTodoHtml(task);
// // newTodoHtml(task2);

// todoList.aTodos.forEach(element => {
//     newTodoHtml(element);
// });

// todoList.aTodos.forEach(element => newTodoHtml(element));

// Can be called only if an argumente and is a line of code
todoList.aTodos.forEach(newTodoHtml);

console.log(todoList.aTodos);