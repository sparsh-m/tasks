const form  = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load event listeners
loadEventListeners();

//loadEventListeners
function loadEventListeners(){
    
    //add task
    form.addEventListener('submit', addTask);
    //remove task event
    taskList.addEventListener('click', removeTask)
    //clear all tasks
    clearBtn.addEventListener('click', clearTasks);
    //filter tasks
    filter.addEventListener('keyup', filterTasks)
    //Dom load event
    document.addEventListener('DOMContentLoaded', getTasks)

}

//get tasks from ls
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
         //Create li element
    const li = document.createElement('li');
    //li Class
    li.className = 'collection-item';
    //Add text to li
    li.appendChild(document.createTextNode(task));
    //Create link
    const link = document.createElement('a');
    //link Class
    link.className = 'delete-item secondary-content';
    //Add image
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    //Add link to li
    li.appendChild(link);
    //Add li to ul
    taskList.appendChild(li)
    });
}

function addTask(e){

    //Create li element
    const li = document.createElement('li');
    //li Class
    li.className = 'collection-item';
    //Add text to li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create link
    const link = document.createElement('a');
    //link Class
    link.className = 'delete-item secondary-content';
    //Add image
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    //Add link to li
    li.appendChild(link);
    //Add li to ul
    taskList.appendChild(li)
    // Store in LS
    saveInLocal(taskInput.value);
    //clear taskInput field
    taskInput.value = "";
    
    e.preventDefault()
}

//store in local storage
function saveInLocal(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    console.log(tasks);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//delete in local storage
function removeTaskFromLocal(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1)
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear all in local storage
function clearLocal(){
    localStorage.clear();
}

//Remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        e.target.parentElement.parentElement.remove();
    }

    //remove from ls
    removeTaskFromLocal(e.target.parentElement.parentElement);

    e.preventDefault();
}

//clear tasks
function clearTasks(e){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    clearLocal();

    e.preventDefault();
}

//filter tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    listItems = document.querySelectorAll('.collection-item');
    listItems.forEach(function(task){
        const item = task.firstChild.textContent.toLowerCase();
        if(item.indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    });
}

