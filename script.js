const input = document.querySelector('.form-input');
const list = document.querySelector('.todo-list');
const counter = document.querySelector('.counter');
const footer = document.querySelector('.footer');
const allBtn = document.querySelector('.all');
const activeBtn = document.querySelector('.active');
const completedBtn = document.querySelector('.completed');
const allCompletedBtn = document.querySelector('.form i');
const clearCompleted = document.querySelector('.clear-completed');

let todos = [];
let isAllTodosCompleted;

function setArray(array) {
    todos = array;
    console.log('todos', todos);
    displayTodos(todos);
    updateCounter();
    displayElements();
    showClearBtn();
    isAllTodosCompleted = todos.every(todoItem => todoItem.completed);
}

function completeTodo(id) {
    const newArr = todos.map(item => {
        if (item.id === id) {
            return {
                ...item,
                completed: !item.completed
            }
        }
        else return item;
    })
    setArray(newArr);
}

function displayTodos(todos) {
    list.innerHTML = '';
    todos.forEach(item => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        const todoContent = document.createElement('span');
        const removeBtn = document.createElement('button');
        checkbox.setAttribute('type', 'radio');

        if (item.completed) {
            checkbox.setAttribute("checked", true);
        } else {
            checkbox.removeAttribute("checked")
        }

        if (checkbox.checked) {
            todoContent.style.textDecoration = 'line-through';
            todoContent.style.opacity = '0.3'
        }

        li.setAttribute('id', item.id);
        todoContent.innerText = item.value;
        removeBtn.classList.add('delete');

        checkbox.addEventListener('change', () => {
            completeTodo(item.id);
        })

        todoContent.addEventListener('click', () => {
            todoContent.setAttribute("contentEditable", true);
            if(li.getAttribute('id') === item.id) item.value = span.innerText;
        })

        removeBtn.addEventListener('click', e => {
                const filteredArray = todos.filter(todo => todo.id != e.target.parentElement.id);
                setArray(filteredArray);
        })

        li.appendChild(checkbox);
        li.appendChild(todoContent);
        li.appendChild(removeBtn);
        list.appendChild(li);
    })
}

input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.target.value.trim().length !== 0) {
        let newArr = [...todos, {
            value: e.target.value,
            completed: false,
            id: new Date().toISOString()
        }
        ];
        setArray(newArr);

        e.target.value = '';
    }
})

allCompletedBtn.addEventListener('click', () => {
    if(isAllTodosCompleted) {
        allCompletedBtn.classList.remove('dark-opacity');
        setArray(todos.map(item => {
            return { ...item, completed: false}
        }))
    } else {
        allCompletedBtn.classList.add('dark-opacity');
        setArray(todos.map(item => {
            return { ...item, completed: true}
        }))
    }     
})

completedBtn.addEventListener('click', () => {
    let newArr = todos.filter(item => item.completed === true);
    displayTodos(newArr);
})
activeBtn.addEventListener('click', () => {
    let newArr = todos.filter(item => item.completed === false);
    displayTodos(newArr);
})
allBtn.addEventListener('click', () => {
    setArray(todos)
})
clearCompleted.addEventListener('click', () => {
    setArray(todos.filter(item => item.completed !== true));
})
const updateCounter = () => {
    let activeTodos = todos.filter(item => item.completed === false);
    counter.textContent = activeTodos.length === 1 
        ? `${activeTodos.length} item left` 
        : `${activeTodos.length} items left`;
}

function displayElements() {
    if (todos.length) {
        footer.style.display = 'block';
        allCompletedBtn.style.display = 'block'
    } else {
        footer.style.display = 'none';
        allCompletedBtn.style.display = 'none'
    }
}

function showClearBtn() {
    if(todos.every(item => item.completed === false)) {
        clearCompleted.style.display = 'none';
    } else {
        clearCompleted.style.display = 'inline-block';
    }
}
