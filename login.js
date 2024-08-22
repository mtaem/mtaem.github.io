document.getElementById('login-btn').addEventListener('click', function() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    // 发送 AJAX 请求
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'users.json', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(JSON.stringify({ username: username, password: password }));

    xhr.onload = function() {
        if (xhr.status === 200) {
            var users = JSON.parse(xhr.responseText).users;
            var user = users.find(u => u.username === username && u.password === password);

            if (user) {
                if (user.role === 'banned') {
                    showTooltip('此用户已封禁');
                } else {
                    // 设置 cookie
                    document.cookie = "username=" + encodeURIComponent(username) + "; path=/";
                    // 重定向到首页
                    window.location.href = 'index.html';
                }
            } else {
                showTooltip('用户名或密码不正确');
            }
        } else {
            showTooltip('请求失败，请稍后再试');
        }
    };
});
