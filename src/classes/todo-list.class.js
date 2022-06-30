import { Todo } from './todo.class';

export class TodoList {
    constructor() {
        // this.aTodos = [];
        this.loadLocalStorage();
    }

    newTodo(task) {
        this.aTodos.push(task);

        this.saveLocalStorage();
    }

    deleteTodo(id) {
        // const index = this.aTodos.findIndex(element => element.id === parseInt(id, 10));
        // this.aTodos.splice(index, 1);

        this.aTodos = this.aTodos.filter(element => element.id != id);

        this.saveLocalStorage();
    }

    changeStatus(id) {
        // console.log({id});
        const index = this.aTodos.findIndex(element => element.id === parseInt(id, 10));
        // console.log({index});

        if (index !== -1) {
            console.log('this.aTodos[index].completed: ', this.aTodos[index].completed);
            // if (this.aTodos[index].completed) {
            //     this.aTodos[index].completed = false;
            // } else {
            //     this.aTodos[index].completed = true;
            // }
            this.aTodos[index].completed = !this.aTodos[index].completed;

            this.saveLocalStorage();
        }
    }

    clearAllCompletions() {
        this.aTodos = this.aTodos.filter(element => element.completed != true);

        this.saveLocalStorage();
    }

    saveLocalStorage() {
        this.countPending();
        localStorage.setItem('todo', JSON.stringify(this.aTodos));
    }

    loadLocalStorage() {
        // if (localStorage.getItem('todo')) {
        //     this.aTodos = JSON.parse(localStorage.getItem('todo'));
        // } else {
        //     this.aTodos = [];
        // }

        this.aTodos = (localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem('todo')) : [];

        this.countPending();

        this.aTodos = this.aTodos.map(Todo.fromJson);
    }

    countPending() {
        this.todoPending = 0;
        for (const { completed } of this.aTodos) {
            if (!completed) {
                this.todoPending++;
            }
        }

        return this.todoPending;
    }
}