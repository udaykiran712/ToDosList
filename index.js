let todocontainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let savetodobutton = document.getElementById("savebutton");

function getTodoListFromLocalStorage() {
    let stringifiedlist = localStorage.getItem("todolist");
    let parsedList = JSON.parse(stringifiedlist);

    if (parsedList === null) {
        return [];
    } else {
        return parsedList;
    }
}

let todolist = getTodoListFromLocalStorage();

savetodobutton.onclick = function() {
    localStorage.setItem("todolist", JSON.stringify(todolist));
}

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelIdelement = document.getElementById(labelId);
    labelIdelement.classList.toggle("checked");


    let todoobjectIndex = todolist.findIndex(function(eachtodo) {
        let eachtodoId = "todo" + eachtodo.uniqueNo;

        if (eachtodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });

    let todoobject = todolist[todoobjectIndex];

    if (todoobject.ischecked === true) {
        todoobject.ischecked = false;
    } else {
        todoobject.ischecked = true;
    }


}

function OnDeleteTodo(todoId) {
    let todoIdelement = document.getElementById(todoId);
    todocontainer.removeChild(todoIdelement);

    let deleteElementIndex = todolist.findIndex(function(eachtodo) {
        let eachtodoId = "todo" + eachtodo.uniqueNo;
        if (eachtodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todolist.splice(deleteElementIndex, 1);
}


function createAndAppend(todo) {
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;

    let todoelement = document.createElement("li");
    todoelement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoelement.id = todoId;
    todocontainer.appendChild(todoelement);

    let inputelement = document.createElement("input");
    inputelement.type = "checkbox";
    inputelement.id = checkboxId;
    inputelement.checked = todo.ischecked;
    inputelement.classList.add("checkbox-input");
    todoelement.appendChild(inputelement);
    inputelement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    }

    let labelcontainer = document.createElement("div");
    labelcontainer.classList.add("label-container", "d-flex", "flex-row");
    todoelement.appendChild(labelcontainer);

    let labelelement = document.createElement("label");
    labelelement.setAttribute("for", checkboxId);
    labelelement.classList.add("checkbox-label");
    labelelement.textContent = todo.text;
    if (todo.ischecked === true) {
        labelelement.classList.add("checked");
    }
    labelcontainer.appendChild(labelelement);
    labelelement.id = labelId;

    let deletecontainer = document.createElement("div");
    deletecontainer.classList.add("delete-icon-container");
    labelcontainer.appendChild(deletecontainer);

    let deleteicon = document.createElement("i");
    deleteicon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteicon.onclick = function() {
        OnDeleteTodo(todoId);
    };
    deletecontainer.appendChild(deleteicon);

}
let toDoCount = todolist.length;

function onAddTodo() {
    toDoCount = toDoCount + 1;

    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;

    if (userInputValue === "") {
        alert("Enter Valid Input");
        return;
    }

    let newTodo = {
        text: userInputValue,
        uniqueNo: toDoCount,
        ischecked: false
    };
    todolist.push(newTodo);
    createAndAppend(newTodo);
    userInputElement.value = "";


}
addTodoButton.onclick = function() {
    onAddTodo();
}

for (let eachtodo of todolist) {
    createAndAppend(eachtodo);
}
