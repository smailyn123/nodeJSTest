let submitBtn = document.getElementById("add-task");
let taskInput = document.getElementById("task-text");
let container = document.getElementById("task-container");

let tasks = new Array();

const clearInput = () => { taskInput.value = ""; }

const createTaskElement = (text) => {

    return new Promise((success, fail) => {
        if (text) {

            try {
                let item = document.createElement('li');
                item.innerHTML = '<div class="alert alert-primary">' + text + '</div>';
                container.appendChild(item);
                success("Element created");
            } catch (e) {
                fail(e.message)
            }

        } else {
            fail("Error creating element");
        }
    });
}

const saveTask = (task) => {
    return new Promise((success, fail) => {
        if (task) {

            try {
                tasks.push(task);
                window.localStorage.setItem('tasks', JSON.stringify(tasks));
                success("Task saved");
            } catch (e) {
                fail(e.message)
            }

        } else {
            fail("Error saving task");
        }
    });
}

const loadTasks = () => {
    return new Promise((success, fail) => {

        try {
            success(window.localStorage.getItem('tasks'));
        } catch (e) {
            fail(e.message)
        }
    });
}

const initElementTasks = (tasks) => {
    return new Promise((success, fail) => {
        if (tasks) {

            try {

                for (let i = 0; i < tasks.length; i++) {
                    let item = document.createElement('li');
                    item.innerHTML = '<div class="alert alert-primary">' + tasks[i] + '</div>';
                    container.appendChild(item);
                }

            } catch (e) {
                fail(e.message)
            }

        } else {
            fail("tasks are undefined");
        }
    });
}

loadTasks().then((data) => {
    if (data) {
        tasks = JSON.parse(data);
    }
    return initElementTasks(tasks);
})
.then((data) => {
    console.log(data);
})
.catch((data) => {
    console.log(data);
});

submitBtn.addEventListener('click', (event) => {
    let task = taskInput.value;
    if (task) {

        saveTask(task)
            .then((message) => {                
                console.log(message);
                return createTaskElement(task);
            }).then((message) => {                
                console.log(message);
                clearInput();
            })
            .catch((message) => {
                console.log(message);
            });
        
    }

});


