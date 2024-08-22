function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('users.json')
        .then(response => response.json())
        .then(data => {
            const user = data.users.find(user => user.username === username && user.password === password);

            if (user) {
                localStorage.setItem('username', username);
                showTooltip('登录成功！');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                showTooltip('用户名或密码错误');
            }
        })
        .catch(error => {
            showTooltip('用户数据加载失败');
        });
}
