
// Class taskmanager
class TaskManager {
    constructor(){
        // Getting array of todo object from localStorage of settting it as an empty array
        this.tasks = Storage.loadLocally();

        // Setting all needed inputs and buttons
        this.titleElement = document.querySelector('.js-title');
        this.descriptionElement = document.querySelector('.js-description');
        this.dateElement = document.querySelector('.js-date');
        this.addBtn = document.querySelector('.js-button');
        this.todoContainer = document.querySelector('.js-display');

        // Adding event listener to the whole containers that hold all the todo items
        this.todoContainer.addEventListener('click', (e) => {
            // Cheking if target is the icon and removing it
            if(e.target.classList.contains('icon')){
                UI.deleteTodo(e.target);
            }
        })

        // Adding event listener to add new todo
        this.addBtn.addEventListener('click', () => {
         
        //  Creating new object by means of class Todo, and passing all required parameters    
        const todo = new Todo(this.titleElement.value, this.descriptionElement.value, this.dateElement.value);

        // Checking if any input value is empty
        if(this.titleElement.value === '' || this.descriptionElement.value === '' || this.dateElement.value === ''){
            // Alert and returning when one of the fields is empty
            alert('Please fill in all fields');
            return
        } else {
            // Creating new todo
            this.addTodo(todo);
        }
        

       
        
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
        tasks.forEach((todo, index) => {
            // Destructuring todo object to get values out of it
            const {title, description, date} = todo;

            // Creating a div that stores / displays 1 todo
            const div = document.createElement('div');
            div.classList.add('todo-div');
            div.setAttribute('data-index', index)

            // Creating HTML dynamically for the div
            div.innerHTML = `
                                    <div class="js-task">
                                        <h3>${title}</h3>
                                        <p>${description}</p>
                                        <p>${date}</p>
                                        <div class="div-i">
                                            <i class="fa-solid fa-trash fa-lg icon"></i>
                                        </div>
                                    </div>
                                        `
            // Appending div to the container that displays all todos
            displayList.appendChild(div);
        });     
    }

    // Static method to remove tod that takes in el parameter which is targeted delete button
    static deleteTodo(el){
        // Displaying modal, to make sure user want to delte the todo
        document.querySelector('.modal-container').classList.add('active');
        document.querySelector('body :not(.modal-container)').style.pointerEvents = 'none';
        console.log(el)

        // Getting two buttons that are present in modal
        const yesBtn = document.querySelector('.js-yes');
        const noBtn = document.querySelector('.js-no');

        // Handling and removing todo after confirming by click yes button
        yesBtn.addEventListener('click', () => {
            // Checking if el is null or undefined e.g. when clicked a few times NO button
            if(el === undefined || el === null){
                return
            } else {
                // Traversing and removing the element that has to be removed based on the 'el' parameter which is a delete button.
                el.parentElement.parentElement.parentElement.remove();
                // Making modal disappear after clicking the button
                document.querySelector('.modal-container').classList.remove('active');
                document.querySelector('body :not(.modal-container)').style.pointerEvents = 'all';
                // Getting the index of removed element
                const index = el.parentElement.parentElement.parentElement.getAttribute('data-index');
                // Calling static fiunction that takes in index parameter and removes element from local storage
                Storage.removeLocally(index); 
            }
             
        })

        // Handling no button
        noBtn.addEventListener('click', () => {
            // Maing modal disappear and returning as the removing is denied.
            document.querySelector('.modal-container').classList.remove('active');
            // Setting el as undefined, otherwise when we click a few times no on a different todos, and then we click yes on only one, it will be removed all of them as it is tored in this variable, so the goal is to clear this value
            el = undefined;
            document.querySelector('body :not(.modal-container)').style.pointerEvents = 'all';
            
            return
        })
          
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

    // Static method that removes / updates todo list(tasks) in local storage.
    static removeLocally(index){
        const tasks = newApp.tasks;
        tasks.splice(index, 1);
        Storage.saveLocally(tasks);
    }

}

// Creating new object by means of class TaskManager
const newApp = new TaskManager();


// Calling a static method that take in the array of todo object from main object TaskManager to render todo list in the beginning, and after refreshing.
UI.renderTodo(newApp.tasks)














