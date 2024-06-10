document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const emergencyButton = document.getElementById('emergencyButton');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const menuToggle = document.getElementById('mobile-menu');
    const nav = document.querySelector('nav ul');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            localStorage.setItem('user', JSON.stringify({ username, email, password }));
            window.location.href = 'confirmation.html?message=Cadastro realizado com sucesso!';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.email === email && user.password === password) {
                console.log('Login bem-sucedido!', user);
                localStorage.setItem('loggedInUser', JSON.stringify(user)); // Renomeei a chave para evitar conflitos
                window.location.href = 'dashboard.html';
            } else {
                document.getElementById('loginMessage').textContent = 'Credenciais inválidas!';
            }
            
        });
    }

    if (emergencyButton) {
        emergencyButton.addEventListener('click', function() {
            const user = JSON.parse(localStorage.getItem('user'));
            document.getElementById('user').textContent = user.username;
            const history = JSON.parse(localStorage.getItem('history')) || [];
            history.push({ date: new Date().toLocaleString(), status: 'Ambulância a caminho' });
            localStorage.setItem('history', JSON.stringify(history));
            document.getElementById('emergencyMessage').textContent = 'Ambulância a caminho!';
        });
    }

    if (confirmationMessage) {
        const params = new URLSearchParams(window.location.search);
        confirmationMessage.textContent = params.get('message');
    }

    const userRequests = document.getElementById('userRequests');
    if (userRequests) {
        const history = JSON.parse(localStorage.getItem('history')) || [];
        history.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `Data: ${item.date}, Status: ${item.status}`;
            userRequests.appendChild(li);
        });
    }

    const historyList = document.getElementById('historyList');
    if (historyList) {
        const history = JSON.parse(localStorage.getItem('history')) || [
            { date: '10/06/2023 14:35', status: 'Concluída' },
            { date: '15/07/2023 11:20', status: 'Concluída' },
            { date: '22/08/2023 16:10', status: 'Cancelada' }
        ];
        history.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `Data: ${item.date}, Status: ${item.status}`;
            historyList.appendChild(li);
        });
    }
});
// Verifica se o usuário está logado ao carregar a página e redireciona para o dashboard
document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        window.location.href = 'dashboard.html';
    }
});
