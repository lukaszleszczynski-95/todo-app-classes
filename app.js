class TaskManager {
    constructor(){
        this.tasks = [];

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
        this.tasks.push(todo);
        console.log(this.tasks)
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

    static renderTodo(todo){
        const displayList = document.querySelector('.js-display');
        
            const div = document.createElement('div')

            div.innerHTML = `
                                    <div class="js-task">
                                        <h3>${todo.title}</h3>
                                        <p>${todo.description}</p>
                                        <p>${todo.date}</p>
                                        </div>
                                        `
            displayList.appendChild(div);
            
            
       
            
        
        
    }
}

const newApp = new TaskManager();







