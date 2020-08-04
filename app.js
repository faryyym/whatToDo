const form = document.getElementById('form')
const input = document.getElementById('todo')
const ulList = document.getElementById('list')
const finList = document.getElementById('finList')

// FUNCTIONS




function addTask(task) {
    if (task === '') {
        alert('Please enter a task')
    } else {
        getTasks(task);
        getTasktoLS(task);
    }
}

function getTasks(task) {
    const li = document.createElement('li');
    li.classList.add('list-item')
    li.innerHTML = `${task}<span><i class="fa fa-check"></i><i class="fa fa-times"></i></span>`;
    ulList.appendChild(li)
    input.value = '';
}

function getTasktoLS(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromLS() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task => {
        getTasks(task);
    });
}

function removeTaskFromLS(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task, index) => {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))

}

function finTaskToLS(fintask) {
    let fintasks;
    if (localStorage.getItem('fintasks') === null) {
        fintasks = [];
    } else {
        fintasks = JSON.parse(localStorage.getItem('fintasks'));
    }

    fintasks.push(fintask);

    localStorage.setItem('fintasks', JSON.stringify(fintasks))
}

function getFinTasksFromLS() {
    let fintasks;
    if (localStorage.getItem('fintasks') === null) {
        fintasks = [];
    } else {
        fintasks = JSON.parse(localStorage.getItem('fintasks'))
    }

    fintasks.forEach(fintask => {
        finList.innerHTML += `<li class="list-item">${fintask}<span id="icons">
        <i class="fa fa-times"></i></span></li>`;
    })

    localStorage.setItem('fintasks', JSON.stringify(fintasks));

}

function removeFinTaskFromLS(fintaskItem) {
    let fintasks;
    if (localStorage.getItem('fintasks') === null) {
        fintasks = [];
    } else {
        fintasks = JSON.parse(localStorage.getItem('fintasks'));
    }

    fintasks.forEach((fintask, index) => {
        if (fintaskItem.textContent.trim() === fintask.trim()) {
            fintasks.splice(index, 1)
        }
    })

    localStorage.setItem('fintasks', JSON.stringify(fintasks));
}

const removeAndCompleteTasks = function (e) {
    if (e.target.classList.contains('fa-times')) {
        e.target.parentElement.parentElement.remove();
        removeTaskFromLS(e.target.parentElement.parentElement);
    }

    if (e.target.classList.contains('fa-check')) {

        finList.appendChild(e.target.parentElement.parentElement);
        finTaskToLS(e.target.parentElement.parentElement.textContent);
        removeTaskFromLS(e.target.parentElement.parentElement);
        e.target.remove();
    }
}



// EVENT LISTENERS
form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask(input.value);
})

ulList.addEventListener('click', removeAndCompleteTasks);

finList.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-times')) {

        removeFinTaskFromLS(e.target.parentElement.parentElement);
        e.target.parentElement.parentElement.remove();


    }
})

window.addEventListener('DOMContentLoaded', getTasksFromLS);
window.addEventListener('DOMContentLoaded', getFinTasksFromLS);



// const date = new Date(Date.now());
// const fulldate = date.toDateString().split(' ').slice(1).join(' ')
// console.log(fulldate);




