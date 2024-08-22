document.getElementById('login-btn').addEventListener('click', function() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    fetch('users.json')
        .then(response => response.json())
        .then(data => {
            if (data.users) {
                const user = data.users.find(u => u.username === username && u.password === password);
                if (user) {
                    if (user.role === 'banned') {
                        showTooltip('此用户已封禁');
                    } else {
                        // 登录成功，重定向到首页并传递用户名
                        window.location.href = `index.html?username=${encodeURIComponent(username)}`;
                    }
                } else {
                    showTooltip('用户名或密码错误');
                }
            } else {
                showTooltip('用户数据格式不正确');
            }
        })
        .catch(error => showTooltip('加载用户数据失败'));
});
