const formInput = document.querySelector('.form-input');
const list = document.querySelector('.todo-list');
const counter = document.querySelector('.counter');
const footer = document.querySelector('.footer');
const allBtn = document.querySelector('.all');
const activeBtn = document.querySelector('.active');
const completedBtn = document.querySelector('.completed');
const allCompletedBtn = document.querySelector('.form i');
const clearCompleted = document.querySelector('.clear-completed');
const inputItem = document.createElement('input');

let todos = [];
let type = 'all';
let isAllTodosCompleted = false;

function setTodosArray(array) {
    todos = array;
    updateCounter();
    displayElements();
    showClearBtn();
    displayTodos();
    isAllTodosCompleted = todos.every(todoItem => todoItem.completed)
    checkIsAllCompleted()
}

function displayTodos() {
    list.innerHTML = '';
    const filteredTodos = filteredArray();
    filteredTodos.forEach(item => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        const todoContent = document.createElement('span');
        const removeBtn = document.createElement('button');
        const label = document.createElement('label');
        label.htmlFor = item.id;
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('id', 'item-checkbox');
        li.setAttribute('id', item.id);
        li.setAttribute('class', 'list-item')
        todoContent.innerText = item.value;
        todoContent.setAttribute('class', 'todo-content')
        removeBtn.classList.add('delete');
        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(todoContent);
        li.appendChild(removeBtn);
        list.appendChild(li);

        checkbox.addEventListener('change', () => {
            completeTodo(item.id);
        })

        label.addEventListener('click', () => {
            completeTodo(item.id);
        })

        if (item.completed) {
            checkbox.setAttribute("checked", true);
            todoContent.classList.add('toggle-checkbox');
        } 
        else {
            checkbox.removeAttribute("checked")
            todoContent.classList.remove('toggle-checkbox');
        }

        li.addEventListener('dblclick' , () => {
            changeTodoContent(li, todoContent, item);
        })

        removeBtn.addEventListener('click', () => {
            const filteredArray = todos.filter(todo => todo.id != item.id);
            setTodosArray(filteredArray);
        });
    })
}

formInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.target.value.trim().length !== 0) {
        let newArr = [...todos, {
                value: e.target.value,
                completed: false,
                id: new Date().toISOString()
            }
        ];
        setTodosArray(newArr);
        e.target.value = '';
    }
})

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
    setTodosArray(newArr);
}

function filteredArray() {
    if(type === 'completed') {
        return todos.filter(item => item.completed === true);
    } else if (type === 'active') {
        return todos.filter(item => item.completed === false);
    } else {
        return todos;
    }
}

completedBtn.addEventListener('click', e => {
    setType(e.target.className);
})

activeBtn.addEventListener('click', e => {
    setType(e.target.className);
})

allBtn.addEventListener('click', e => {
    setType(e.target.className);
})

function setType(newType) {
    type = newType;
    displayTodos();
}

clearCompleted.addEventListener('click', () => {
    setTodosArray(todos.filter(item => item.completed !== true));
});

function checkIsAllCompleted() {
    allCompletedBtn.classList[isAllTodosCompleted ? "add" : 'remove']('dark-opacity');
}

allCompletedBtn.addEventListener('click', () => {
    if(isAllTodosCompleted) {
        setTodosArray(todos.map(item => {
            return { ...item, completed: false}
        }))
    } else {
        setTodosArray(todos.map(item => {
            return { ...item, completed: true}
        }))
    }     
})

const updateCounter = () => {
    let activeTodos = todos.filter(item => item.completed === false);
    counter.textContent = activeTodos.length === 1 
        ? `${activeTodos.length} item left` 
        : `${activeTodos.length} items left`;
}

function displayElements() {
    if (todos.length) {
        footer.classList.add('block');
        allCompletedBtn.classList.add('block');
    } else {
        footer.classList.remove('block');
        allCompletedBtn.classList.remove('block');
    }
}

function showClearBtn() {
    let isTodoItemCompleted = todos.some(todoItem => todoItem.completed);
    if(isTodoItemCompleted) {
        clearCompleted.classList.add('inline')
        clearCompleted.classList.remove('none');
    } else {
        clearCompleted.classList.add('none');
        clearCompleted.classList.remove('inline')
    }
}

function updateTodoItem(itemId, newValue) {
    let newTodos = todos.map(todo => {
        if(todo.id === itemId) {
            return {
                ...todo, 
                value: newValue
            }
        } else {
            return todo
        }
    })
    setTodosArray(newTodos);
}

function changeTodoContent(li, todoContent, item) {
    li.innerHTML = '';
    inputItem.classList.add('style-block');
    inputItem.value = todoContent.textContent;
    inputItem.setAttribute('class', 'input-edit') 
    li.appendChild(inputItem);
    li.classList.add('default-padding');
    inputItem.focus();
    inputItem.addEventListener('keydown', e => {
        if(e.key === 'Enter') {
            updateTodoItem(item.id, e.target.value) 
        }
    })
    inputItem.addEventListener('blur', e => {
        updateTodoItem(item.id, e.target.value) 
    })
}

 

 