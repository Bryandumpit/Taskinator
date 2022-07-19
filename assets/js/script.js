var buttonE1 = document.querySelector("#save-task"); //points to element with id save-task. This element is a button in index.html

var tasksToDoE1 = document.querySelector("#task-to-do"); //points to element id taskts-to-do. This element is ul in index.html

var createTaskHandler = function () {   
        var listItemE1 = document.createElement("li");
        listItemE1.className = "task-item"; //assigns a class (can be cross-referenced with a css file linked to the same HTML)
        listItemE1.textContent = "This is a new task."; //assigns content (text)
        tasksToDoE1.appendChild(listItemE1); //appends a child element to tasksTodoE1. the child element is listItemE1
};


buttonE1.addEventListener("click", createTaskHandler);