document.addEventListener('DOMContentLoaded', function() {
    // 获取登录表单和输入框
    const form = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const messageDiv = document.getElementById('message');

    // 添加表单提交事件监听器
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // 阻止表单的默认提交行为

        // 获取输入的用户名和密码
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // 校验用户名和密码是否非空
        if (!username || !password) {
            showTooltip('用户名和密码不能为空');
            return;
        }

        // 从用户数据文件中获取用户数据
        fetch('users.json')
            .then(response => response.json())
            .then(data => {
                // 查找用户
                const user = data.users.find(u => u.username === username && u.password === password);

                if (user) {
                    // 登录成功
                    onLoginSuccess(username);
                } else {
                    // 登录失败
                    showTooltip('用户名或密码错误');
                }
            })
            .catch(error => {
                // 处理错误
                console.error('获取用户数据失败:', error);
                showTooltip('登录失败，请稍后再试');
            });
    });

    // 显示提示框
    function showTooltip(message) {
        if (!messageDiv) return;
        messageDiv.textContent = message;
        messageDiv.style.display = 'block';
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 3000); // 3秒后隐藏提示框
    }

    // 处理登录成功后的逻辑
    function onLoginSuccess(username) {
        // 登录成功后，重定向到首页，并传递用户名作为查询参数
        window.location.href = `index.html?username=${encodeURIComponent(username)}`;
    }
});