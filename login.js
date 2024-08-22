document.getElementById('login-btn').addEventListener('click', function() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (!username || !password) {
        showTooltip('请输入用户名和密码');
        return;
    }

    fetch('users.json')
        .then(response => response.json())
        .then(data => {
            if (data[username] && data[username].password === password) {
                if (data[username].status === 'banned') {
                    showTooltip('此用户已封禁');
                } else {
                    localStorage.setItem('username', username);
                    window.location.href = 'index.html';  // 登录成功后重定向到首页
                }
            } else {
                showTooltip('用户名或密码错误');
            }
        })
        .catch(error => showTooltip('网络错误'));
});
