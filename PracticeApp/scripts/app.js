let submitBtn = document.getElementById("add-task");
let taskInput = document.getElementById("task-text");
let container = document.getElementById("task-container");

let tasks = new Array();

const clearInput = () => {
    taskInput.value = "";
}

const createTaskElement = (task) => {

    return new Promise((success, fail) => {
        if (task) {

            try {
                let item = document.createElement('li');
                item.innerHTML = '<div class="alert alert-primary">' + task.text + '<button type="button" class="close" onclick="remove(' + task.id + ')" aria-label="Remove"><span aria-hidden="true"><i class="far fa-trash-alt"></i></span></button></div>';
                container.appendChild(item);
                success("Element created");
            } catch (e) {
                fail(e.message)
            }

        } else {
            fail("Error creating element");
        }
    });
};

const saveTask = (task) => {
    return new Promise((success, fail) => {
        if (task) {

            try {
                tasks.push(task);
                window.localStorage.setItem('tasks', JSON.stringify(tasks));
                success({text: task, id: tasks.length - 1});
            } catch (e) {
                fail(e.message)
            }

        } else {
            fail("Error saving task");
        }
    });
};

const loadTasks = () => {
    return new Promise((success, fail) => {

        try {
            success(window.localStorage.getItem('tasks'));
        } catch (e) {
            fail(e.message)
        }
    });
};

const removeTask = (index) => {
    return new Promise((success, fail) => {

        if (isNaN(index)) {
            fail("index cannot be null");
        }
        else {

            try {
                let task = tasks[index];
                tasks.splice(index, 1);
                window.localStorage.setItem('tasks', JSON.stringify(tasks));
                success('"' + task + '"' + ' removed')
            } catch (e) {
                fail(e.message);
            }
        }

    });
};

const remove = (id) => {
    removeTask(id)
        .then((message) => {
            console.log(message);
            return initElementTasks(tasks);
        })
        .then((message) => {
            console.log(message);
        })
        .catch((error) => {
            console.log(error);
        });
};

const initElementTasks = (tasks) => {
    return new Promise((success, fail) => {
        if (tasks) {

            try {

                container.innerHTML = "";
                for (let i = 0; i < tasks.length; i++) {
                    let item = document.createElement('li');
                    item.innerHTML = '<div class="alert alert-primary">' + tasks[i] + '<button type="button" class="close" onclick="remove(' + i + ')" aria-label="Remove"><span aria-hidden="true"><i class="far fa-trash-alt"></i></span></button></div>';
                    container.appendChild(item);
                }

                success("items redraw");

            } catch (e) {
                fail(e.message)
            }

        } else {
            fail("tasks are undefined");
        }
    });
};

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
            .then((data) => {
                return createTaskElement(data);
            }).then((message) => {                
                console.log(message);
                clearInput();
            })
            .catch((message) => {
                console.log(message);
            });
        
    }

});


