export class Todo {

    static fromJson({ id, task, completed, created }) {
        const todoTemp = new Todo(task);
        todoTemp.id = id;
        todoTemp.completed = completed;
        todoTemp.created = created;

        return todoTemp;
    }

    constructor(task) {
        this.task = task;

        this.id = new Date().getTime(); // 123456123
        this.completed = false;
        this.created = new Date();
    }

    printClass() {
        console.log(`Task: ${this.task} - Id: ${this.id}`);
    }
}