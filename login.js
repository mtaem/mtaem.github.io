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
                        window.location.href = "index.html";
                    }
                } else {
                    alert('用户名或密码错误');
                }
            } else {
                console.error('用户数据格式不正确');
            }
        })
        .catch(error => console.error('Error fetching user data:', error));
});
