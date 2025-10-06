
function getPosts(callback) {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(data => {
            const sorted = data.sort((a, b) => b.title.length - a.title.length);
            callback(sorted);
        })
        .catch(err => console.error('Ошибка при получении постов:', err));
}

function getComments(callback) {
    fetch('https://jsonplaceholder.typicode.com/comments')
        .then(res => res.json())
        .then(data => {
            const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
            callback(sorted);
        })
        .catch(err => console.error('Ошибка при получении комментариев:', err));
}
getPosts(sortedPosts => {
    console.log('Колбэк: Отсортированные посты -');
    console.log(sortedPosts.slice(0, 3)); 
});

getComments(sortedComments => {
    console.log('Колбэк: Отсортированные комментарии -');
    console.log(sortedComments.slice(0, 3));
});


function getUsers() {
    return fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(data => data.map(user => ({
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone
        })));
}

function getTodos() {
    return fetch('https://jsonplaceholder.typicode.com/todos')
        .then(res => res.json())
        .then(data => data.filter(todo => !todo.completed));
}

getUsers().then(users => {
    console.log('Промис: Пользователи с нужными полями -');
    console.log(users.slice(0, 3));
});

getTodos().then(todos => {
    console.log('Промис: Незавершённые задачи -');
    console.log(todos.slice(0, 3));
});


// -----------------------------------------
// ЧАСТЬ 3. Работа с async/await
// -----------------------------------------

async function asyncOperations() {
    try {
        // /posts (сортировка по длине title)
        const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await postsResponse.json();
        const sortedPosts = posts.sort((a, b) => b.title.length - a.title.length);

        // /comments (сортировка по имени)
        const commentsResponse = await fetch('https://jsonplaceholder.typicode.com/comments');
        const comments = await commentsResponse.json();
        const sortedComments = comments.sort((a, b) => a.name.localeCompare(b.name));

        // /users (оставляем нужные поля)
        const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await usersResponse.json();
        const shortUsers = users.map(u => ({
            id: u.id,
            name: u.name,
            username: u.username,
            email: u.email,
            phone: u.phone
        }));

        // /todos (фильтруем по completed == false)
        const todosResponse = await fetch('https://jsonplaceholder.typicode.com/todos');
        const todos = await todosResponse.json();
        const filteredTodos = todos.filter(t => !t.completed);

        console.log('=== Async/Await результаты ===');
        console.log('Посты:', sortedPosts.slice(0, 3));
        console.log('Комментарии:', sortedComments.slice(0, 3));
        console.log('Пользователи:', shortUsers.slice(0, 3));
        console.log('Незавершённые задачи:', filteredTodos.slice(0, 3));

    } catch (error) {
        console.error('Ошибка в async/await блоке:', error);
    }
}

// Запуск async/await функции
asyncOperations();
