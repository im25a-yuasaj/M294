const loginBtn = document.getElementById('login')
const loginDial = document.getElementById('loginDialog')
const loginForm = document.forms.loginForm
const logoutBtn = document.getElementById('logout')
let authToken
let loginData
let taskList

loginBtn.addEventListener('click', (e) => {
    e.preventDefault()
    loginDial.showModal()
})

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formEmail = loginForm.email.value
    const pw = loginForm.pw.value
    loginData = {email: formEmail, password: 'm294'}
    const token = await getLogin(loginData)
    authToken = token
    alert(authToken)
    await getAuthStatus(token)
    loginForm.reset()
    loginDial.close()
    taskList = await listTasks(token)
})

const addTask = document.forms.addTask
addTask.addEventListener('submit', async (e) => {
    e.preventDefault()
    let newId
    if (taskList.length == 0) {
        newId = 0
    } else {
        newId = taskList.at(-1).id + 1
    }
        
    taskList.push({id: newId, title: addTask.title.value, completed: false })
    await postTask(authToken, { title: addTask.title.value, completed: false })
    renderList(taskList)
    addTask.reset()
})

async function renderList(list, token) {
    const tasklist = document.getElementById('tasklist')
    tasklist.replaceChildren()
    for (const task of list) {
            console.log(task)
            const li = document.createElement('li')
            const delBtn = document.createElement('button')
            delBtn.innerText = 'Delete Task'
            delBtn.addEventListener('click', async (e) => {
                e.stopPropagation()
                await deleteTask(token, task.id)
                taskList = await listTasks(token)
            })
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

async function getLogin(data) {
    const response = await fetch(`http://localhost/auth/jwt/sign`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    const result = (await response.json()).token
    console.log(result)
    return result
}



async function getAuthStatus(token) {
    const response = await fetch(`http://localhost/auth/jwt/verify`,{
        method: 'GET',
        headers: {'Authorization': `Bearer ${token}`},
    })
    const status = await response.json()
    console.log(status)
}

async function getTask(token, id='') {
    let response;
    if (id === '') {
        response = await fetch(`http://localhost/auth/jwt/tasks`, {
        headers: {'Authorization': `Bearer ${token}`},
        method: 'GET',
    })
    } else {
        response = await fetch(`http://localhost/auth/jwt/tasks/${id}`, {
        method: 'GET',
        headers: {'Authorization': `Bearer ${token}`},
    })
    }
    const result = await response.json()
    return result
}

async function postTask(token, data) {
    const response = await fetch(`http://localhost/auth/jwt/tasks`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json','Authorization': `Bearer ${token}`},
        body: JSON.stringify(data)
    })
    const status = response.status
    console.log(status)
    await listTasks(token)
}

async function updateTask(url, data) {
    const response = await fetch(`http://localhost/${url}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        body: JSON.stringify(data)
    })
    const status = response.status
    console.log(status)
}

async function deleteTask(token, id) {
    const response = await fetch(`http://localhost/auth/jwt/task/${id}`, {
        method: 'DELETE',
        headers: {'Authorization': `Bearer ${token}`},
    })
    const status = response.status
    console.log(status)
}


async function listTasks(token) {
    const tasks = await getTask(token)
    let list = []
    for (const i of tasks){
        list.push(i)
    }
    renderList(list, token)
    return list
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
