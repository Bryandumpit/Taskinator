//var buttonEl = document.querySelector("#save-task"); //points to element with id save-task. This element is a button in index.html
var taskIdCounter = 0;

var formEl = document.querySelector("#task-form")

var tasksToDoEl = document.querySelector("#tasks-to-do"); //points to element id taskts-to-do. This element is ul in index.html



var taskFormHandler = function (event) {
        event.preventDefault();

        var taskNameInput = document.querySelector("input[name='task-name']").value;
        console.log(taskNameInput);

        var taskTypeInput = document.querySelector("select[name='task-type']").value;
        console.log(taskTypeInput)

        //check if input values are empty strings
        if (!taskNameInput || !taskTypeInput) {
                alert("You need to fill our the task form!")
                return false;
        }

        formEl.reset ();
        
        //package up data as an object
        var taskDataObj = {
                name: taskNameInput,
                type: taskTypeInput,
        };

        //send it as an argument to createTaskEl

        createTaskEl(taskDataObj);

        
};

//holds code that creates new task HTML element
var createTaskEl = function(taskDataObj) {

        //create list item
        
        var listItemEl = document.createElement("li");
        listItemEl.className = "task-item"; //assigns a class (can be cross-referenced with a css file linked to the same HTML)

        //add task id as a custom attribute
        listItemEl.setAttribute("data-task-id", taskIdCounter)


        //create div to hold task info and add to list item
        var taskInfoEl = document.createElement("div");
        
        //give it a class name
        taskInfoEl.className = "task-info";
        
        //add HTML content to div
        taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
        
        listItemEl.appendChild(taskInfoEl);

        var taskActionsEl = createTaskActions(taskIdCounter);
        listItemEl.appendChild(taskActionsEl);
        

        //listItemEl.textContent = taskNameInput; //assigns content (text); this code was commented out because task name input is appended
        tasksToDoEl.appendChild(listItemEl); //appends a child element to tasksTodoEl. the child element is listItemEl

        //increase task counter for next unique id
        taskIdCounter++;

}

var createTaskActions = function(taskId) {
        var actionContainerEl=document.createElement("div");
        actionContainerEl.className = "task-actions";
        //create edit button
        var editButtonEl = document.createElement("button");
        editButtonEl.textContent = "Edit";
        editButtonEl.className = "btn edit-btn";
        editButtonEl.setAttribute ("data-task-id", taskId);
        
        actionContainerEl.appendChild(editButtonEl);

        //create delete button
        var deleteButtonEl = document.createElement("button");
        deleteButtonEl.textContent = "Delete";
        deleteButtonEl.className ="btn edit-btn";
        deleteButtonEl.setAttribute ("data-task-id", taskId);

        actionContainerEl.appendChild (deleteButtonEl);
        //create status select
        var statusSelectEl = document.createElement("select");
        statusSelectEl.className = "select-status";
        statusSelectEl.setAttribute("name", "status-change");
        statusSelectEl.setAttribute("data-task-id", taskId);

        var statusChoices = ["To Do", "In Progress", "Completed"]
        for (var i=0; i<statusChoices.length; i++){
            //create option element
            var statusOptionEl = document.createElement ("option")
            statusOptionEl.textContent = statusChoices[i];
            statusOptionEl.setAttribute("value", statusChoices[i]);
            
            //append to select
            statusSelectEl.appendChild(statusOptionEl);
        }

        actionContainerEl.appendChild(statusSelectEl)

        return actionContainerEl;
};

formEl.addEventListener("submit",taskFormHandler);