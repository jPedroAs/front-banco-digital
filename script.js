// Seletores dos modais
const registerModal = document.getElementById('registerModal');
const loginModal = document.getElementById('loginModal');
const openRegisterModal = document.getElementById('openRegisterModal');
const openLoginModal = document.getElementById('openLoginModal');
const closeRegisterModal = document.getElementById('closeRegisterModal');
const closeLoginModal = document.getElementById('closeLoginModal');

// Abrir modal de registro
openRegisterModal.addEventListener('click', () => {
    registerModal.style.display = 'flex';
});

// Fechar modal de registro
closeRegisterModal.addEventListener('click', () => {
    registerModal.style.display = 'none';
});

// Abrir modal de login
openLoginModal.addEventListener('click', () => {
    loginModal.style.display = 'flex';
});

// Fechar modal de login
closeLoginModal.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

// Fechar modal ao clicar fora do conteúdo
window.addEventListener('click', (event) => {
    if (event.target === registerModal) {
        registerModal.style.display = 'none';
    }
    if (event.target === loginModal) {
        loginModal.style.display = 'none';
    }
});

// Informações dinâmicas (nome do usuário e data)
document.getElementById("userName").textContent = "João Teodozo"; // Nome dinâmico
document.getElementById("accountBalance").textContent = "R$ 3750"; // Saldo dinâmico
document.getElementById("currentDate").textContent = new Date().toLocaleDateString("pt-BR", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
});

// Alternância entre telas (Início e Cartões)

// Seletores dos links do menu
const dashboardLink = document.getElementById("dashboardLink");
const cardsLink = document.getElementById("cardsLink");

// Seletores das telas
const dashboardScreens = document.querySelectorAll(".welcome, .transaction"); // Telas da seção inicial
const cardsScreen = document.getElementById("cardsScreen"); // Tela da seção de cartões

// Função para exibir a tela inicial e ocultar a de cartões
dashboardLink.addEventListener("click", (e) => {
    e.preventDefault();

    // Exibe todas as seções da tela inicial
    dashboardScreens.forEach((screen) => {
        screen.style.display = "block";
    });

    // Oculta a tela de cartões
    cardsScreen.style.display = "none";
    console.log("Exibindo tela inicial");
});

// Função para exibir a tela de cartões e ocultar a inicial
cardsLink.addEventListener("click", (e) => {
    e.preventDefault();

    // Oculta todas as seções da tela inicial
    dashboardScreens.forEach((screen) => {
        screen.style.display = "none";
    });

    // Exibe a tela de cartões
    cardsScreen.style.display = "block";
    console.log("Exibindo tela de cartões");
});

//integração com backend
const API_BASE_URL = "http://localhost:5000/api";

// Função de login
async function login(email, senha) {
    const response = await fetch(`${API_BASE_URL}/autenticacao/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
    });
    if (response.ok) {
        const data = await response.json();
        console.log("Login bem-sucedido:", data);
        return data; // Retorna o token e nome do usuário
    } else {
        const error = await response.json();
        console.error("Erro no login:", error.Mensagem);
    }
}

// Função para buscar dados do dashboard
async function carregarDashboard() {
    const response = await fetch(`${API_BASE_URL}/dashboard/dados`);
    if (response.ok) {
        const data = await response.json();
        console.log("Dados do Dashboard:", data);

        document.getElementById("userName").textContent = data.Nome;
        document.getElementById("accountBalance").textContent = `R$ ${data.Saldo}`;
        document.getElementById("currentDate").textContent = data.DataAtual;

        // Renderizar transações
        const transactionHistory = document.getElementById("transactionHistory");
        transactionHistory.innerHTML = "";
        data.Transacoes.forEach((transacao) => {
            const li = document.createElement("li");
            li.textContent = `${transacao.Tipo} - R$ ${transacao.Valor}`;
            transactionHistory.appendChild(li);
        });
    }
}

// Função para carregar cartões
async function carregarCartoes() {
    const response = await fetch(`${API_BASE_URL}/cartoes`);
    if (response.ok) {
        const data = await response.json();
        console.log("Cartões:", data);

        const cardsScreen = document.getElementById("cardsScreen");
        cardsScreen.innerHTML = ""; // Limpar a tela antes de renderizar
        data.forEach((cartao) => {
            const cardDiv = document.createElement("div");
            cardDiv.classList.add("card");

            cardDiv.innerHTML = `
                <div class="card-info ${cartao.Funcao === "Débito" ? "gray-card" : "blue-card"}">
                    <p>${cartao.Banco}</p>
                    <p>${cartao.Categoria}</p>
                    <p>${cartao.Nome}</p>
                    <p>${cartao.Numero}</p>
                </div>
                <div class="card-actions">
                    <button class="btn-primary">Configurar</button>
                    <button class="btn-danger">Bloquear</button>
                    <p>Função: ${cartao.Funcao}</p>
                </div>
            `;
            cardsScreen.appendChild(cardDiv);
        });
    }
}

// Exemplo de chamada ao carregar a página
carregarDashboard();
