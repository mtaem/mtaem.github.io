document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const usernameInput = document.querySelector('#username');
    const passwordInput = document.querySelector('#password');
    const loginButton = document.querySelector('button');
    
    loginButton.addEventListener('click', function(event) {
        event.preventDefault(); // 防止表单默认提交
        
        const username = usernameInput.value;
        const password = passwordInput.value;
        
        // 读取 JSON 文件
        fetch('user.json')
            .then(response => response.json())
            .then(data => {
                const users = data.users;
                const user = users.find(user => user.username === username && user.password === password);
                
                if (user) {
                    // 登录成功，保存用户名并重定向到主页
                    localStorage.setItem('username', username);
                    window.location.href = 'index.html'; // 主页
                } else {
                    alert('用户名或密码错误');
                }
            })
            .catch(error => {
                console.error('读取 JSON 文件失败:', error);
                alert('登录失败，请稍后再试');
            });
    });
});
