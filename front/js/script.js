document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    // --- ELEMENTOS DO DOM ---
    const emailInput = document.getElementById("email");
    const senhaInput = document.getElementById("senha");
    const feedbackEl = document.getElementById("login-feedback");
    
    // Modal do Bootstrap
    const userSelectionModalEl = document.getElementById("userSelectionModal");
    const userSelectionModal = new bootstrap.Modal(userSelectionModalEl);
    const modalBody = document.getElementById("user-selection-body");

    // --- DADOS MOCADOS ---
    const mockUsers = [
      {
        email: "joserodrigues@vivo.com",
        senha: "123456abc",
        role: "Novo Colaborador",
        redirect: "profile.html",
      },
      {
        email: "gestor.silva@vivo.com",
        senha: "gestor123",
        role: "Gestor",
        redirect: "dashboard-gestor.html",
      },
    ];

    // --- FUNÇÕES ---

    // 1. Popula o modal com os usuários mocados
    function populateUserSelectionModal() {
      modalBody.innerHTML = ''; // Limpa o conteúdo anterior
      mockUsers.forEach(user => {
        const userCardHTML = `
          <div class="card user-selection-card mb-2" data-email="${user.email}">
            <div class="card-body">
              <h6 class="card-title fw-bold text-purple">${user.role}</h6>
              <p class="card-subtitle mb-0 text-muted">${user.email}</p>
            </div>
          </div>`;
        modalBody.insertAdjacentHTML('beforeend', userCardHTML);
      });
    }

    // --- EVENT LISTENERS (Ações do Usuário) ---

    // 1. Abre o modal quando o campo de email é clicado
    emailInput.addEventListener("click", () => {
      userSelectionModal.show();
    });

    // 2. Preenche o formulário quando um perfil é escolhido no modal
    modalBody.addEventListener("click", function(e) {
      const selectedCard = e.target.closest(".user-selection-card");
      if (!selectedCard) return;

      const selectedEmail = selectedCard.dataset.email;
      const selectedUser = mockUsers.find(user => user.email === selectedEmail);

      if (selectedUser) {
        emailInput.value = selectedUser.email;
        senhaInput.value = selectedUser.senha;
        userSelectionModal.hide();
      }
    });

    // 3. Lida com o envio do formulário (lógica de login)
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = emailInput.value;
      const senha = senhaInput.value;

      // Validação simples para ver se um perfil foi escolhido
      if (!email || !senha) {
          feedbackEl.innerHTML = `<div class="alert alert-warning" role="alert">Por favor, escolha um perfil para continuar.</div>`;
          return;
      }

      const foundUser = mockUsers.find(user => user.email === email && user.senha === senha);

      if (foundUser) {
        feedbackEl.innerHTML = `<div class="alert alert-success" role="alert">Login bem-sucedido! Redirecionando...</div>`;
        setTimeout(() => {
          window.location.href = foundUser.redirect;
        }, 1000);
      } else {
        // Esta mensagem dificilmente aparecerá, mas é uma boa prática mantê-la
        feedbackEl.innerHTML = `<div class="alert alert-danger" role="alert">Erro inesperado. Tente novamente.</div>`;
      }
    });

    // --- INICIALIZAÇÃO ---
    populateUserSelectionModal();
  }
});