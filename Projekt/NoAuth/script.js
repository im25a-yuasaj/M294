listTasks()


async function getTask(url, id='') {
    let response;
    if (id === '') {
        response = await fetch(`http://127.0.0.1/${url}`, {
        method: 'GET',
    })
    } else {
        response = await fetch(`http://127.0.0.1/${url}/${id}`, {
        method: 'GET',
    })
    }
    const result = await response.json()
    return result
}

async function postTask(url, data) {
    const response = await fetch(`http://127.0.0.1/${url}`, {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    const status = response.status
    console.log(status)
}

async function updateTask(url, data) {
    const response = await fetch(`http://127.0.0.1/${url}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    const status = response.status
    console.log(status)
    location.reload()
}

async function deleteTask(url, id) {
    const response = await fetch(`http://127.0.0.1/${url}/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    })
    const status = response.status
    console.log(status)
    if (response.ok) location.reload()
}

async function listTasks() {
    const taskTask = await getTask('tasks')
    const tasklist = document.getElementById('tasklist')
    console.log(taskTask)
    for (const task of taskTask) {
        const li = document.createElement('li')
        const delBtn = document.createElement('button')
        delBtn.innerText = 'Delete Task'
        delBtn.addEventListener('click', (e) => deleteTask('task', task.id))
        li.innerText = task.title
        li.id = task.id
        if (task.completed) {
            li.classList.toggle('completed')
        }
        li.onclick = () => {UpdateDialog(li)}
        tasklist.append(li)
        tasklist.append(delBtn)
    }
}


const dialog = document.getElementById('updateDialog')
const dialogForm = dialog.querySelector('form')
let selectedTaskId

function UpdateDialog(element) {
    const selectedTaskId = element.id
    const title = element.innerText
    dialog.showModal()
    dialogForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        let newTitle = dialogForm.elements.title.value
        const checked = dialogForm.elements.completed.checked
        if (newTitle == '') {
            newTitle = title
        }
        await updateTask('tasks', {
            id: selectedTaskId,
            title: newTitle,
            completed: checked,
            })
        dialogForm.reset()
        dialog.close()
    })
}

const addTask = document.forms.addTask
addTask.addEventListener('submit', async (e) => {
    e.preventDefault()
    await postTask('tasks', { title: addTask.title.value, completed: false })
    addTask.reset()
    location.reload()
})