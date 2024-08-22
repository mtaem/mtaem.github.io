document.getElementById('login-btn').addEventListener('click', function() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    console.log('Attempting to fetch users.json');

    fetch('users.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('网络响应不是 OK');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data fetched:', data);
            var user = data.users.find(user => user.username === username && user.password === password);
            if (user) {
                if (user.role === 'banned') {
                    showTooltip('此用户已封禁');
                } else {
                    document.cookie = "username=" + encodeURIComponent(username) + "; path=/";
                    window.location.href = 'index.html';
                }
            } else {
                showTooltip('用户名或密码不正确');
            }
        })
        .catch(error => {
            console.error('请求失败:', error);
            showTooltip('请求失败，请稍后再试');
        });
});
