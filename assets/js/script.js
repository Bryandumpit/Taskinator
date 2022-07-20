//var buttonE1 = document.querySelector("#save-task"); //points to element with id save-task. This element is a button in index.html
var formE1 = document.querySelector("#task-form")

var tasksToDoE1 = document.querySelector("#tasks-to-do"); //points to element id taskts-to-do. This element is ul in index.html

var createTaskHandler = function (event) {
        event.preventDefault();

        var taskNameInput = document.querySelector("input[name='task-name']").value;
        console.log(taskNameInput);

        var taskTypeInput = document.querySelector("select[name='task-type']").value;
        console.log(taskTypeInput)

        //create list item
        
        var listItemE1 = document.createElement("li");
        listItemE1.className = "task-item"; //assigns a class (can be cross-referenced with a css file linked to the same HTML)

        //create div to hold task info and add to list item
        var taskInfoE1 = document.createElement("div");
        //give it a class name
        taskInfoE1.className = "task-info";
        //add HTML content to div
        taskInfoE1.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
        
        listItemE1.appendChild(taskInfoE1);

        //add entire list item to list

        //listItemE1.textContent = taskNameInput; //assigns content (text); this code was commented out because task name input is appended
        tasksToDoE1.appendChild(listItemE1); //appends a child element to tasksTodoE1. the child element is listItemE1
};


formE1.addEventListener("submit",createTaskHandler);