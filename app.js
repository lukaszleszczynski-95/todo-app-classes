
class TaskManager {
    constructor(){
        this.tasks = Storage.loadLocally();

        this.titleElement = document.querySelector('.js-title');
        this.descriptionElement = document.querySelector('.js-description');
        this.dateElement = document.querySelector('.js-date');
        this.addBtn = document.querySelector('.js-button')

        this.addBtn.addEventListener('click', () => {
        const todo = new Todo(this.titleElement.value, this.descriptionElement.value, this.dateElement.value);
        this.addTodo(todo);
        
        this.titleElement.value = '';
        this.descriptionElement.value = '';
        this.dateElement.value = '';

})
    }

    addTodo(todo){
        this.tasks.push(todo);
        console.log(this.tasks);
        Storage.saveLocally(this.tasks);
        UI.renderTodo(this.tasks);

    }
}





class Todo {
    constructor(title, description, date){
        this.title = title;
        this.description = description;
        this.date = date;
        this.completed = false;
    }
}

class UI {
    static renderTodo(tasks){
        const displayList = document.querySelector('.js-display');
        //displayList.innerHTML = '';
        while(displayList.firstChild){
            displayList.removeChild(displayList.firstChild)
        };
        
        tasks.forEach((todo) => {
            const {title, description, date} = todo;

            const div = document.createElement('div')

            div.innerHTML = `
                                    <div class="js-task">
                                        <h3>${title}</h3>
                                        <p>${description}</p>
                                        <p>${date}</p>
                                        </div>
                                        `
            displayList.appendChild(div);
        });   

        
    }
}

class Storage{
    static saveLocally(tasks){
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    static loadLocally(){
        return JSON.parse(localStorage.getItem('tasks')) || []
    }
}

const newApp = new TaskManager();

UI.renderTodo(newApp.tasks)













