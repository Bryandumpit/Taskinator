var tasksInProgressEl = document.querySelector("#tasks-in-progress");

var tasksCompletedEl = document.querySelector("#tasks-completed");

var pageContentEl=document.querySelector("#page-content");

var taskIdCounter = 0;

var formEl = document.querySelector("#task-form")

var tasksToDoEl = document.querySelector("#tasks-to-do"); //points to element id tasks-to-do. This element is ul in index.html

var tasks = [];


var taskFormHandler = function (event) {
        event.preventDefault();

        var taskNameInput = document.querySelector("input[name='task-name']").value;
        console.log(taskNameInput);

        var taskTypeInput = document.querySelector("select[name='task-type']").value;
        console.log(taskTypeInput);

        //check if input values are empty strings
        if (!taskNameInput || !taskTypeInput) {
                alert("You need to fill our the task form!");
                return false;
        }

        formEl.reset ();
        
        
        //send it as an argument to createTaskEl
        var isEdit=formEl.hasAttribute("data-task-id");
        //has data attribute so get task id and call function to complete edit process
        if(isEdit) {
                var taskId = formEl.getAttribute("data-task-id");
                completeEditTask(taskNameInput, taskTypeInput, taskId);
        }
        //no data attribute, so create object as normal and pass to createTaskEl function
        else {
                var taskDataObj = {
                        name: taskNameInput,
                        type: taskTypeInput,
                        status: "to do"
                
                };

                createTaskEl(taskDataObj);

        }

       
        
};

var completeEditTask = function (taskName, taskType, taskId) {
        //find the matching task list item
        var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

        //set new values
        taskSelected.querySelector("h3.task-name").textContent = taskName;
        taskSelected.querySelector("span.task-type").textContent = taskType;

        //loop through tasks array and task object with new content
        for (var i = 0; i < tasks.length; i++) {
                if (tasks[i].id === parseInt(taskId)) {
                        tasks[i].name = taskName;
                        tasks[i].type = taskType;
                }
        };

        alert("Task Updated!");

        formEl.removeAttribute("data-task-id");
        document.querySelector("#save-task").textContent = "Add Task";
}

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

        taskDataObj.id=taskIdCounter;

        tasks.push(taskDataObj);
        

        //listItemEl.textContent = taskNameInput; //assigns content (text); this code was commented out because task name input is appended
        tasksToDoEl.appendChild(listItemEl); //appends a child element to tasksTodoEl. the child element is listItemEl

        //increase task counter for next unique id
        taskIdCounter++;

        console.log(taskDataObj);
        console.log(taskDataObj.status);

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
        deleteButtonEl.className ="btn delete-btn";
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

formEl.addEventListener("submit", taskFormHandler);

var deleteTask = function(taskId){
        var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
        taskSelected.remove();
};

var taskButtonHandler = function (event) {
        //get target element from event
        var targetEl = event.target

        //edit button was clicked
        if (targetEl.matches(".edit-btn")){
                var taskId= targetEl.getAttribute("data-task-id");
                editTask(taskId);
        }
        // delete button was clicked.
        else if (targetEl.matches(".delete-btn")){
                var taskId = event.target.getAttribute("data-task-id");
                deleteTask(taskId);
        }
};

var editTask = function (taskId){
        console.log("editing task #" + taskId);

        //get task list item element
        var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

        //get content fromt ask name and type
        var taskName = taskSelected.querySelector("h3.task-name").textContent;
        document.querySelector("input[name='task-name']").value = taskName

        var taskType = taskSelected.querySelector("span.task-type").textContent;
        document.querySelector("select[name='task-type']").value = taskType;

        document.querySelector("#save-task").textContent = "Save Task";//changes button to save task. UI improvement

        formEl.setAttribute("data-task-id", taskId);
}

var taskStatusChangeHandler = function(event) {
        //get the task item's id
        var taskId = event.target.getAttribute("data-task-id");

        //get the currently selected option's value and convert to lowercase
        var statusValue = event.target.value.toLowerCase();

        //find the parent task item element based on the id
        var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

        if (statusValue === "to do") {
                tasksToDoEl.appendChild(taskSelected);
        }
        else if (statusValue === "in progress") {
                tasksInProgressEl.appendChild(taskSelected);
        }
        else if (statusValue === "completed") {
                tasksCompletedEl.appendChild(taskSelected);
        }

        //update task's in tasks array
        for (var i =o; i < tasks.length; i++){
                if (tasks[i].id===parseInt(taskId)){
                        tasks[i].status = statusValue;
                }
        }
};




pageContentEl.addEventListener("click", taskButtonHandler);//think: triggers the event which calls function taskbuttonhandler.
//taskbuttonhandler then calls other functions (edit or delete) based on which button was clicked. event.target allows us to identify that.
pageContentEl.addEventListener("change", taskStatusChangeHandler);