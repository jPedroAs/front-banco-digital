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
