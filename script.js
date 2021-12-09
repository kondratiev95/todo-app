const input = document.querySelector('.form input');
const list = document.querySelector('ul');
const counter = document.querySelector('.counter');
const footer = document.querySelector('.footer');
const allBtn = document.querySelector('.all');
const activeBtn = document.querySelector('.active');
const completedBtn = document.querySelector('.completed');
const allCompletedBtn = document.querySelector('.form i');
const clearCompleted = document.querySelector('.clear-completed');

let todos = [];

footer.style.display = 'none'

const updateCounter = () => {
    let activeTodos = todos.filter(item => item.completed === false);
    counter.innerText = activeTodos.length + ' items left';
}
updateCounter();

function displayFooter() {
    if (todos.length) {
        footer.style.display = 'block'
    } else {
        footer.style.display = 'none'
    }
}

function setArray(array) {
    todos = array;
    console.log('todos', todos);
    displayTodos(todos);
    updateCounter();
    displayFooter();
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
        const span = document.createElement('span');
        const removeBtn = document.createElement('button');
        checkbox.setAttribute('type', 'checkbox');

        if (item.completed) {
            checkbox.setAttribute("checked", true);
        } else {
            checkbox.removeAttribute("checked")
        }

        if (checkbox.checked) {
            span.style.textDecoration = 'line-through'
        }

        li.setAttribute('id', item.id)
        span.innerText = item.value;
        removeBtn.innerText = 'x';
        removeBtn.classList.add('delete');

        checkbox.addEventListener('change', () => {
            completeTodo(item.id);
        })

        span.addEventListener('click', () => {
            span.setAttribute("contentEditable", true);
            item.value = span.innerText;
        })

        li.appendChild(checkbox);
        li.appendChild(span);
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

list.addEventListener('click', e => {
    if (e.target.className === 'delete') {
        const filteredArray = todos.filter(todo => todo.id != e.target.parentElement.id);
        setArray(filteredArray);
    }
})

allCompletedBtn.addEventListener('click', () => {
    allCompletedBtn.style.opacity = '1'
    if (todos.some(item => item.completed === false)) {
        const newTodoList = todos.map(item => {
            return {
                ...item,
                completed: true,
            }
        })
        setArray(newTodoList);
    } else {
        allCompletedBtn.style.opacity = '0.3'
        const newTodoList = todos.map(item => {
            return {
                ...item,
                completed: false,
            }
        })
        setArray(newTodoList);
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
