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
                        // 登录成功，重定向到首页并更新按钮文本
                        window.location.href = "index.html";
                        updateLoginButton(username);
                    }
                } else {
                    showTooltip('用户名或密码错误');
                }
            } else {
                showTooltip('用户数据格式不正确');
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            showTooltip('用户数据格式不正确');
        });
});

function updateLoginButton(username) {
    // 更新首页的登录按钮文本
    fetch('index.html')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const loginButton = doc.querySelector('.login-btn');
            if (loginButton) {
                loginButton.innerHTML = username;
                loginButton.classList.remove('login-btn'); // 移除登录按钮的样式类
                document.querySelector('.navbar').appendChild(loginButton);
            }
        })
        .catch(error => console.error('Error updating login button:', error));
}
