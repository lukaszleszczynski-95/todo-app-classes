
// Class taskmanager
class TaskManager {
    constructor(){
        // Getting array of todo object from localStorage of settting it as an empty array
        this.tasks = Storage.loadLocally();

        // Setting all needed inputs and buttons
        this.titleElement = document.querySelector('.js-title');
        this.descriptionElement = document.querySelector('.js-description');
        this.dateElement = document.querySelector('.js-date');
        this.addBtn = document.querySelector('.js-button')

        // Adding event listener to add new todo
        this.addBtn.addEventListener('click', () => {
         
        //  Creating new object by means of class Todo, and passing all required parameters    
        const todo = new Todo(this.titleElement.value, this.descriptionElement.value, this.dateElement.value);

        // Calling Taskmanager method to add todo
        this.addTodo(todo);
        
        // Clearing all inputs after adding and rendering new todo for better UI
        this.titleElement.value = '';
        this.descriptionElement.value = '';
        this.dateElement.value = '';

})
    }
    // Method for adding todo by passing newly created object as a parameter
    addTodo(todo){
        // Pushing new todo to the array that stores alle todos (objects)
        this.tasks.push(todo);
        console.log(this.tasks);
        // Saving udpated array in localStoarga by calling static method from Storage class
        Storage.saveLocally(this.tasks);
        // Rendering todo list updated with new todo object. We are passing current array as a parameter.
        UI.renderTodo(this.tasks);

    }
}




// Creating a new class Todo
class Todo {
    constructor(title, description, date){
        // Setting all properties
        this.title = title;
        this.description = description;
        this.date = date;
        this.completed = false;
    }
}

// Creating new class responsible for updating UI
class UI {

    // Creating method that renders todo list and takes in a parameter task which is a current array of all todos.
    static renderTodo(tasks){
        // Getting a container where all todos will be displayed
        const displayList = document.querySelector('.js-display');
        
        // Removing all existing todo before rendering the udpdated todo list by removing every first child untill the container is totally empty
        while(displayList.firstChild){
            displayList.removeChild(displayList.firstChild)
        };
        
        // Lopping through an array of todo objects
        tasks.forEach((todo) => {
            // Destructuring todo object to get values out of it
            const {title, description, date} = todo;

            // Creating a div that stores / displays 1 todo
            const div = document.createElement('div')

            // Creating HTML dynamically for the div
            div.innerHTML = `
                                    <div class="js-task">
                                        <h3>${title}</h3>
                                        <p>${description}</p>
                                        <p>${date}</p>
                                        </div>
                                        `
            // Appending div to the container that displays all todos
            displayList.appendChild(div);
        });   

        
    }
}


// Creating new class Storage
class Storage{

    // Static method that in tasks array as a parameter and save it in localStorage
    static saveLocally(tasks){
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

// Static method that returns an array from localStorage of empty array if localStorage is empty.
    static loadLocally(){
        return JSON.parse(localStorage.getItem('tasks')) || []
    }
}

// Creating new object by means of class TaskManager
const newApp = new TaskManager();


// Calling a static method that take in the array of todo object from main object ofmTskManager to render todo list in the beginning, and after refreshing.
UI.renderTodo(newApp.tasks)













