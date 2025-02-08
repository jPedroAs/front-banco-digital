const API_BASE_URL = "https://api-gateway-pay.onrender.com/api";

// Função para registrar um usuário
async function registerUser(username, email, password) {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
        alert("Usuário cadastrado com sucesso!");
        registerModal.style.display = "none"; // Fecha o modal
    } else {
        alert("Erro ao cadastrar. Tente novamente.");
    }
}

// Função para login
async function loginUser(email, password) {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); // Salvar token no LocalStorage
        alert("Login bem-sucedido!");
        window.location.href = "home.html"; // Redirecionar para dashboard
    } else {
        alert("Usuário ou senha inválidos!");
    }
}

// Evento de envio do formulário de registro
document.querySelector("#registerModal form").addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    registerUser(username, email, password);
});

// Evento de envio do formulário de login
document.querySelector("#loginModal form").addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    loginUser(username, password);
});