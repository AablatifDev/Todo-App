//Getting All Required Elements
let inputBox = document.querySelector('.inputField input'),
    addBtn = document.querySelector('.inputField button'),
    todoList = document.querySelector('.todoList'),
    deleteAllBtn = document.querySelector('.footer button')


inputBox.onkeyup = () => {
    let userData = inputBox.value;  //User Input
    if (userData.trim() != 0) {  //If User Input is not Only Spaces
        addBtn.classList.add('active');  //Active the Add Button
    } else {
        addBtn.classList.remove('active');  //Unactive the Add Button
    }
}

showTasks(); //Calling showTasks Function

//If User Click on Add Button
addBtn.onclick = () => {
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem('New Todo');  //Getting Localstorage

    if (getLocalStorage == null) {  //If Localstorage is Null
        listArr = [];  //Create Empty Array
    } else {
        listArr = JSON.parse(getLocalStorage);  //Convert JSON String to JS Object
    }

    listArr.push(userData);  //Add User Data
    localStorage.setItem("New Todo", JSON.stringify(listArr));  //Convert JS Object to JSON String

    showTasks(); //Calling showTasks Function
    addBtn.classList.remove('active');  //Unactive the Add Button

}

//Function To Add Task List Inside ul
function showTasks() {

    let getLocalStorage = localStorage.getItem('New Todo');  //Getting Localstorage

    if (getLocalStorage == null) {  //If Localstorage is Null
        listArr = [];  //Create Empty Array
    } else {
        listArr = JSON.parse(getLocalStorage);  //Convert JSON String to JS Object
    }

    let pendingNum = document.querySelector('.pendingNum');
    pendingNum.textContent = listArr.length;  //Passing the Length Value in pendingNum
    if (listArr.length > 0) {  //If There are Tasks
        deleteAllBtn.classList.add('active')  //Make Clear All Button Active
    } else {  //If There are No Tasks 
        deleteAllBtn.classList.remove('active')  //Make Clear All Button Unactive
    }
    let newLiTag = '';

    listArr.forEach((element, index) => {
        newLiTag += `<li class="task"> ${element} <span onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`
    });

    todoList.innerHTML = newLiTag;  //Adding New li Tag Inside ul Tag
    inputBox.value = '';  //Make Input Field Empty After Adding Task
    inputBox.focus();
}


//Delete Task Function
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem('New Todo');  //Getting Localstorage
    listArr = JSON.parse(getLocalStorage);  //Convert JSON String to JS Object
    listArr.splice(index, 1);
    localStorage.setItem("New Todo", JSON.stringify(listArr));  //Convert JS Object to JSON String
    showTasks();
}


//Delete All Tasks
deleteAllBtn.onclick = () => {
    listArr = [];  //Empty an Array
    //Update the Localstorage After Deleting All Tasks
    localStorage.setItem("New Todo", JSON.stringify(listArr));  //Convert JS Object to JSON String
    showTasks();
}

//Finished Tasks
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('task')) {  //If Element has Class "task"
        e.target.classList.toggle('finished');  //Make Line Through the Finished Task
        e.target.classList.toggle('colored');  //Change the Color of the Finished Task
    }

})

