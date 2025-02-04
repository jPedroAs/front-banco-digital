const API_BASE_URL = "http://localhost:5269/api";


// Função para decodificar JWT
function parseJwt(token) {
    try {
        return JSON.parse(atob(token.split(".")[1])); // Decodifica a payload do JWT
    } catch (error) {
        console.error("Erro ao decodificar JWT:", error);
        return null;
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

        // Atualizando histórico de transações
        const transactionHistory = document.getElementById("transactionHistory");
        transactionHistory.innerHTML = ""; // Limpar lista antes de adicionar novos itens
        transactions.forEach((transacao) => {
            const li = document.createElement("li");
            li.textContent = `${transacao.type == 1 ? "Depósito" : transacao.type == 0 ? "Cash Out" : transacao.type == 3 ? "Transação" : transacao.type == 2 ? "Poupança" : "" } - R$ ${transacao.amount}`;
            transactionHistory.appendChild(li);
        });
    } else {
        alert("Erro ao carregar dados!");
    }
}

async function balanceAccount(){
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Você precisa estar logado!");
        window.location.href = "index.html";
        return;
    }

    const response = await fetch(`${API_BASE_URL}/balance`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
        const transactions = await response.json();
        document.getElementById("Balance").textContent = `R$ ${transactions || 0}`;
    }
}

// Função para exibir nome do usuário na home
function showUserName() {
    const token = localStorage.getItem("token");
    const userName = parseJwt(token)
    document.getElementById("Name").textContent = `Olá, ${userName.Name}`;
    document.getElementById("userName").textContent = `${userName.Name}`;
}

// Função para depósito
async function deposit(amount, accountNumber) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/deposito`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ amount, cod: accountNumber, Type: 1 }),
    });

    if (response.ok) {
        alert("Depósito realizado com sucesso!");
        document.getElementById("transactionType").value  = ""
        document.getElementById("transactionValue").value = ""
        loadDashboardData();
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
        body: JSON.stringify({ amount, cod: targetAccount, type: 3 }),
    });

    if (response.ok) {
        alert("Transferência realizada com sucesso!");
        loadDashboardData();
    } else {
        alert("Erro ao realizar transferência!");
    }
}

// Evento para depósito e transferência
document.getElementById("transactionForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const transactionType = document.getElementById("transactionType").value;
    const amount = parseFloat(document.getElementById("transactionValue").value);
    const token = localStorage.getItem("token");
    const tokenData = parseJwt(token);
    const accountNumber = tokenData.Account; // Você pode definir dinamicamente pelo usuário logado

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
    localStorage.removeItem("userName");
    alert("Logout realizado!");
    window.location.href = "index.html";
});

// Carrega os dados ao entrar na home
if (window.location.pathname.includes("home.html")) {
    showUserName();
    loadDashboardData();
    balanceAccount();
}


// Função para mostrar a tela de Início
function showDashboard() {
    // Esconde a tela de cartões
    document.getElementById("cardsScreen").style.display = "none";
    
    // Mostra a tela de início
    document.getElementById("dashboardScreen").style.display = "block";
}

// Função para mostrar a tela de Cartões
function showCards() {
    // Esconde a tela de início
    document.getElementById("dashboardScreen").style.display = "none";
    
    // Mostra a tela de cartões
    document.getElementById("cardsScreen").style.display = "block";
}

// Inicializa a tela de Início ao carregar a página
window.onload = showDashboard;

