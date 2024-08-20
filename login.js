document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.querySelector('button');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    // 加载 JSON 数据
    function loadUsers() {
        return fetch('users.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => data.users)
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                return []; // 如果有问题，返回一个空数组
            });
    }
    
    // 验证用户
    function validateUser(users) {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        for (const user of users) {
            if (user.username === username && user.password === password) {
                alert('登录成功');
                return;
            }
        }
        
        alert('用户名或密码错误');
    }
    
    // 处理登录点击事件
    loginButton.addEventListener('click', function() {
        loadUsers().then(users => validateUser(users));
    });
});
