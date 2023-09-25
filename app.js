class TaskManager {
    constructor(){
        this.tasks = Storage.getTodos();

        const titleElement = document.querySelector('.js-title');
        const descriptionElement = document.querySelector('.js-description');
        const dateElement = document.querySelector('.js-date');
        const addBtn = document.querySelector('.js-button')

        addBtn.addEventListener('click', () => {
        const todo = new Todo(titleElement.value, descriptionElement.value, dateElement.value);
        this.addTodo(todo);
        titleElement.value = '';
        descriptionElement.value = '';
        dateElement.value = '';

        
        
})



    }

    addTodo(todo){
        this.tasks = Storage.getTodos()
        this.tasks.push(todo);
        console.log(this.tasks);
      localStorage.setItem('todo', JSON.stringify(todo));
        UI.renderTodo(todo);

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

    static displayTodos(){
        
    }

    static renderTodo(todo){
        const displayList = document.querySelector('.js-display');

        
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
        
        
     
        
    }
}

class Storage {
    
    static getTodos(){
        let todos;
        if(localStorage.getItem('todos') === null){
            todos = [];
        } else {
            JSON.parse(localStorage.getItem('todos'));
        }
        return todos
    }
}

const newApp = new TaskManager();

UI.renderTodo()










