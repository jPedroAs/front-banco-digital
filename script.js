const API_BASE_URL = "http://localhost:5000/api";

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
async function loginUser(username, password) {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.Token); // Salvar token no LocalStorage
        alert("Login bem-sucedido!");
        window.location.href = "home.html"; // Redirecionar para dashboard
    } else {
        alert("Usuário ou senha inválidos!");
    }
}

// Função para buscar saldo e extrato
async function loadDashboardData() {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Você precisa estar logado!");
        window.location.href = "index.html";
        return;
    }

    const response = await fetch(`${API_BASE_URL}/history`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
        const transactions = await response.json();
        document.getElementById("accountBalance").textContent = `R$ ${transactions[0]?.balance || 0}`;

        // Atualizando histórico de transações
        const transactionHistory = document.getElementById("transactionHistory");
        transactionHistory.innerHTML = ""; // Limpar lista antes de adicionar novos itens
        transactions.forEach((transacao) => {
            const li = document.createElement("li");
            li.textContent = `${transacao.type} - R$ ${transacao.amount}`;
            transactionHistory.appendChild(li);
        });
    } else {
        alert("Erro ao carregar dados!");
    }
}

// Função para depósito
async function deposit(amount, accountNumber) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/deposito`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ amount, cod: accountNumber }),
    });

    if (response.ok) {
        alert("Depósito realizado com sucesso!");
        loadDashboardData(); // Atualiza os dados do saldo
    } else {
        alert("Erro ao realizar depósito!");
    }
}

// Função para transferência
async function transfer(amount, targetAccount) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/transferencia`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ amount, cod: targetAccount, type: "Transaction" }),
    });

    if (response.ok) {
        alert("Transferência realizada com sucesso!");
        loadDashboardData();
    } else {
        alert("Erro ao realizar transferência!");
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

// Evento para depósito e transferência
document.getElementById("transactionForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const transactionType = document.getElementById("transactionType").value;
    const amount = parseFloat(document.getElementById("transactionValue").value);
    const accountNumber = "123456"; // Você pode definir dinamicamente pelo usuário logado

    if (transactionType === "deposit") {
        deposit(amount, accountNumber);
    } else if (transactionType === "transfer") {
        const targetAccount = prompt("Digite o número da conta de destino:");
        transfer(amount, targetAccount);
    }
});

// Evento de logout
document.getElementById("logoutButton").addEventListener("click", function () {
    localStorage.removeItem("token");
    alert("Logout realizado!");
    window.location.href = "index.html";
});

// Carrega os dados ao entrar na home
if (window.location.pathname.includes("home.html")) {
    loadDashboardData();
}
