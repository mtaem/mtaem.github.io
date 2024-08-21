document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();  // 阻止表单的默认提交行为
        
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        
        fetch('users.json')
            .then(response => response.json())
            .then(users => {
                var user = users.find(u => u.username === username && u.password === password);
                if (user) {
                    if (user.role === 'banned') {
                        showTooltip('此用户已封禁');
                    } else {
                        // 保存用户名到 localStorage 并重定向到首页
                        localStorage.setItem('username', username);
                        window.location.href = 'https://mtaem.github.io';
                    }
                } else {
                    showTooltip('用户名或密码错误');
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                showTooltip('登录失败，请稍后重试');
            });
    });
});
