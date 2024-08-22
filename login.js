document.getElementById('login-btn').addEventListener('click', function() {
    // 获取用户名和密码
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // 读取 users.json 文件
    fetch('users.json')
        .then(response => response.json())
        .then(data => {
            var users = data.users;
            var userFound = false;

            // 验证用户名和密码
            for (var i = 0; i < users.length; i++) {
                if (users[i].username === username) {
                    if (users[i].password === password) {
                        userFound = true;

                        if (users[i].role === 'banned') {
                            // 显示提示信息
                            showTooltip('此用户已封禁');
                            return;
                        }

                        // 登录成功，重定向到首页
                        window.location.href = 'index.html';
                        return;
                    } else {
                        // 密码错误
                        showTooltip('密码错误');
                        return;
                    }
                }
            }

            // 用户名未找到
            showTooltip('用户名不存在');
        })
        .catch(error => {
            console.error('Error:', error);
            showTooltip('发生错误，请重试');
        });
});
