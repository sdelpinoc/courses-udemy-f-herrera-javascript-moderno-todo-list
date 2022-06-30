import { Todo } from "../classes";
import { todoList } from "../index";

// HTML references
const divTodoList = document.querySelector('.todo-list');
const inputNewTodo = document.querySelector('.new-todo');
const btnClearCompleted = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters');
const anchorFilters = document.querySelectorAll('.filtro');
const todoCount = document.querySelector('.todo-count strong');

export const newTodoHtml = todo => {

    const htmlTodo = `
        <li class="${(todo.completed) ? 'completed' : ''}" data-id="${todo.id}">
            <div class="view">
                <input class="toggle" type="checkbox" ${(todo.completed) ? 'checked' : ''}>
                <label>${todo.task}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>
    `;

    // insertAdjacentHTML:
    // beforebegin: before the element
    // afterbegin: inside the element, before the first child element
    // beforeend: inside the element, after the last child element
    // afterend: after the element
    divTodoList.insertAdjacentHTML('afterbegin', htmlTodo);

    // const li = document.querySelector(`[data-id="${todo.id}"]`);

    // li.addEventListener('click', e => {
    //     // console.log(e.target);
    //     if (e.target.classList == 'toggle') {
    //         todoList.changeStatus(li.dataset.id);

    //         if (todo.completed) {
    //             li.classList.add('completed');
    //         } else {
    //             li.classList.remove('completed');
    //         }
    //     }
    // });

    todoCount.textContent = todoList.countPending();

    return htmlTodo;
};

// Events
inputNewTodo.addEventListener('keyup', e => {
    // console.log(e);
    // console.log(inputNewTodo.value);
    // console.log(e.keyCode);
    if (e.keyCode === 13 && inputNewTodo.value.length > 0) {
        const newTodo = new Todo(inputNewTodo.value);

        todoList.newTodo(newTodo);

        newTodoHtml(newTodo);

        inputNewTodo.value = '';

        todoCount.textContent = todoList.countPending();
    }
});

divTodoList.addEventListener('click', e => {
    const elementName = e.target.localName; // input, label, name
    const todoElement = e.target.parentElement.parentElement; // li
    const todoId = todoElement.dataset.id;

    if (elementName.includes('input')) {
        todoList.changeStatus(todoId);
        todoElement.classList.toggle('completed');
    } else if (elementName.includes('button')) {
        todoList.deleteTodo(todoId);
        // todoElement.remove();
        divTodoList.removeChild(todoElement);
    }

    todoCount.textContent = todoList.countPending();
});

btnClearCompleted.addEventListener('click', () => {
    todoList.clearAllCompletions();
    // console.log(divTodoList.children);

    // for (let i = divTodoList.children.length - 1; i >= 0; i--) {
    //     if (divTodoList.children[i].classList.contains('completed')) {
    //         divTodoList.removeChild(divTodoList.children[i]);
    //     }
    // }

    for (const element of divTodoList.children) {
        if (element.classList.contains('completed')) {
            divTodoList.removeChild(element);
        }
    }

    todoCount.textContent = todoList.countPending();
});

ulFilters.addEventListener('click', e => {
    console.log(e.target.text);
    const filter = e.target.text;

    if (!filter) {
        return;
    } else {

        // for (const element of ulFilters.children) {
        //     element.querySelector('a').classList.remove('selected');
        // }

        anchorFilters.forEach(element => element.classList.remove('selected'));

        // console.log(e.target.parentElement);
        
        for (const element of divTodoList.children) { // li

            element.classList.remove('hidden');

            if (filter === 'Completados') {
                if (!element.classList.contains('completed')) {
                    element.classList.add('hidden');
                };
            } else if (filter === 'Pendientes') {
                if (element.classList.contains('completed')) {
                    element.classList.add('hidden');
                };
            }
        }

        e.target.classList.add('selected');
    }
});