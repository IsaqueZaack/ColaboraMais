document.addEventListener("DOMContentLoaded", function () {
  // =================================================================
  // DADOS DO PERFIL (Simula dados vindos de um banco de dados)
  // =================================================================
  const userData = {
    nome: "José Rodrigues",
    cargo: "Desenvolvedor Back-end",
    foto: "./images/isaac.png",
    buddy: {
      nome: "Gabriela Mendes",
      cargo: "Analista Sênior",
      foto: "images/buddy.png",
    },
    progresso: 10,
    pontos: 100,
    pontosMax: 1000,
    tags: ["Java", "Spring Boot", "Comunicação", "SQL", "Inovação"],
    contato: {
      email: "jose.rodrigues@vivo.com",
      linkedin: "https://www.linkedin.com/in/joserodrigues-exemplo/",
    },
    jornada: [
      { status: "concluido", titulo: "Bem-vindo ao Colabora+", desc: "Você explorou a plataforma e personalizou seu perfil. Ótimo começo!" },
      { status: "concluido", titulo: "Primeira Missão Concluída", desc: "Você aprendeu sobre a as funcionalidades da plataforma e ganhou 50 pontos." },
      { status: "ativo", titulo: "Trilha Vivo: Descobrindo Nosso Mundo", desc: "Sua próxima missão é conhecer mais sobre a cultura da Vivo.", link: "missoes.html" },
      { status: "proximo", titulo: "Próximo Passo: Mentoria Inicial", desc: "Agende a primeira conversa com seu Buddy para alinhar expectativas." },
    ],
  };

  // =================================================================
  // INICIALIZAÇÃO DA PÁGINA DE PERFIL
  // =================================================================
  function initProfilePage() {
    if (document.querySelector(".progress-circle")) {
      populateProfileData(userData);
      updateProgress(userData.progresso, userData.pontos, userData.pontosMax);
      initBadgeListeners();
      initBuddyPopover(userData.buddy);
      initProfilePicModal(userData.foto);
      initTooltips();
      initChat(userData.buddy);
    }
  }

  // =================================================================
  // FUNÇÕES DA PÁGINA DE PERFIL (sem alterações)
  // =================================================================

  function populateProfileData(data) {
    document.getElementById("userName").textContent = data.nome;
    document.getElementById("userRole").textContent = data.cargo;
    document.getElementById("userBuddy").textContent = data.buddy.nome;
    document.getElementById("profilePicture").src = data.foto;
    const tagsContainer = document.getElementById("userTags");
    tagsContainer.innerHTML = "";
    data.tags.forEach((tag) => {
      tagsContainer.innerHTML += `<span class="badge rounded-pill text-bg-secondary m-1">${tag}</span>`;
    });
    const contactContainer = document.getElementById("userContact");
    contactContainer.innerHTML = `<a href="mailto:${data.contato.email}" class="contact-link" title="E-mail"><i class="fas fa-envelope"></i></a> <a href="${data.contato.linkedin}" target="_blank" class="contact-link" title="LinkedIn"><i class="fab fa-linkedin"></i></a>`;
    const timelineContainer = document.querySelector(".timeline");
    timelineContainer.innerHTML = "";
    data.jornada.forEach((item) => {
      let markerClass = "", contentClass = "p-3 rounded border", icon = "", button = item.link ? `<a href="${item.link}" class="btn btn-sm btn-purple mt-2">Ver na Trilha</a>` : "";
      if (item.status === "concluido") { markerClass = "timeline-marker-check"; icon = '<i class="fa-solid fa-check"></i>'; }
      else if (item.status === "ativo") { markerClass = "timeline-marker-active"; contentClass += " border-purple"; }
      else { markerClass = "timeline-marker-next"; contentClass += " bg-light"; }
      timelineContainer.innerHTML += `<li class="timeline-item"><div class="${markerClass}">${icon}</div><div class="${contentClass}"><h6 class="fw-bold">${item.titulo}</h6><p class="text-muted small mb-0">${item.desc}</p>${button}</div></li>`;
    });
  }

  function updateProgress(progress, points, maxPoints) {
    const circle = document.getElementById("progress-circle"), progressText = document.getElementById("progress-text"), pointsText = document.getElementById("userPoints");
    circle.style.background = `conic-gradient(#6c29a6 ${progress * 3.6}deg, #ededed 0deg)`;
    progressText.textContent = `${progress}%`;
    let currentPoints = 0, increment = points / 100;
    const interval = setInterval(() => {
      currentPoints += increment;
      if (currentPoints >= points) { currentPoints = points; clearInterval(interval); }
      pointsText.textContent = `${Math.ceil(currentPoints)} / ${maxPoints}`;
    }, 10);
  }

  function initBadgeListeners() {
    document.querySelectorAll(".badge-img").forEach((badge) => {
      badge.addEventListener("click", function () {
        document.getElementById("modalConquistaTitle").textContent = this.getAttribute("alt");
        document.getElementById("modalConquistaImg").src = this.getAttribute("src");
        document.getElementById("modalConquistaImg").alt = this.getAttribute("alt");
        document.getElementById("modalConquistaDesc").textContent = this.getAttribute("data-descricao");
      });
    });
  }
  
  // --- FUNÇÃO CORRIGIDA PARA GARANTIR QUE O BOTÃO FUNCIONE ---
  function initBuddyPopover(buddyData) {
    const buddyLink = document.getElementById("userBuddy");
    const popoverContent = `
        <div class="d-flex align-items-center">
            <img src="${buddyData.foto}" class="rounded-circle me-3" width="60" height="60">
            <div>
                <h6 class="mb-0 fw-bold">${buddyData.nome}</h6>
                <p class="mb-2 text-muted small">${buddyData.cargo}</p>
                <button class="btn btn-sm btn-purple" id="openChatBtn">Enviar Mensagem</button>
            </div>
        </div>
      `;

    const popover = new bootstrap.Popover(buddyLink, {
      content: popoverContent,
      html: true,
      title: "Seu Buddy",
      trigger: "click",
      placement: "top",
      // Permitir que o botão dentro do popover seja clicável
      sanitize: false, 
    });

    // Adiciona um listener para QUANDO o popover for exibido
    buddyLink.addEventListener('shown.bs.popover', function () {
      const openChatBtn = document.getElementById('openChatBtn');
      if (openChatBtn) {
        openChatBtn.addEventListener('click', () => {
          const chatModal = new bootstrap.Modal(document.getElementById('chatModal'));
          chatModal.show();
          popover.hide(); // Esconde o popover depois de abrir o chat
        });
      }
    });
  }
  
  function initProfilePicModal(picSrc) {
    const profilePic = document.getElementById("profilePicture");
    profilePic.addEventListener("click", () => {
      document.getElementById("modalProfilePicImg").src = picSrc;
    });
  }

  function initTooltips() {
    [...document.querySelectorAll('[data-bs-toggle="tooltip"]')].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );
  }

  // =================================================================
  // SEÇÃO DE CHAT (sem alterações)
  // =================================================================
  function initChat(buddyData) {
    const chatModalEl = document.getElementById('chatModal');
    const chatModalLabel = document.getElementById('chatModalLabel');
    const chatBuddyPic = document.getElementById('chatBuddyPic');
    const chatMessages = document.getElementById('chat-messages');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    let isHistoryLoaded = false;

    // Função para adicionar uma mensagem à tela (ATUALIZADA)
    function addMessage(from, text) {
      const row = document.createElement('div');
      row.className = 'message-row';

      const message = document.createElement('div');
      message.className = 'chat-message';
      message.textContent = text;

      if (from === 'user') {
        row.classList.add('message-sent-row');
        message.classList.add('message-sent');
      } else {
        row.classList.add('message-received-row');
        message.classList.add('message-received');
      }
      
      row.appendChild(message);
      chatMessages.appendChild(row);
      chatMessages.scrollTop = chatMessages.scrollHeight; // Rola para a mensagem mais recente
    }

    // Carrega o histórico de mensagens apenas uma vez
    function loadChatHistory() {
        if(isHistoryLoaded) return;

        chatMessages.innerHTML = ''; // Limpa antes de carregar
        
        // Histórico de mensagens CORRIGIDO (sem a fala do José)
        const messageHistory = [
          { from: 'buddy', text: 'Olá José, bem-vindo à Vivo! 😊' },
          { from: 'buddy', text: 'Estou aqui para te ajudar no que precisar. Já deu uma olhada na trilha de missões?' },
        ];
        
        messageHistory.forEach(msg => addMessage(msg.from, msg.text));
        isHistoryLoaded = true;
    }
    
    chatModalEl.addEventListener('show.bs.modal', function () {
        chatModalLabel.textContent = `Chat com ${buddyData.nome}`;
        chatBuddyPic.src = buddyData.foto;
        loadChatHistory();
    });

    // Lida com o envio de novas mensagens
    chatForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const userText = chatInput.value.trim();

      if (userText) {
        addMessage('user', userText);
        chatInput.value = '';

        // Simula a resposta da Buddy
        setTimeout(() => {
          const buddyReplies = [
            "Entendi! Qualquer dúvida, pode me chamar.",
            "Legal! Não se esqueça de agendar nosso primeiro bate-papo.",
            "Que bom! Se tiver qualquer dificuldade, me avise.",
            "Perfeito! O importante é ir no seu ritmo."
          ];
          const randomReply = buddyReplies[Math.floor(Math.random() * buddyReplies.length)];
          addMessage('buddy', randomReply);
        }, 1500); // Responde após 1.5 segundos
      }
    });
  }

  // SEÇÃO DE LOGIN (sem alterações)
  const emailInput = document.getElementById("email"), senhaInput = document.getElementById("senha"), loginForm = document.getElementById("loginForm");
  if (emailInput) { emailInput.addEventListener("focus", function () { this.value = "joserodrigues@vivo.com"; this.readOnly = true; }); }
  if (senhaInput) { senhaInput.addEventListener("focus", function () { this.value = "123456abc"; this.readOnly = true; }); }
  if (loginForm) { loginForm.addEventListener("submit", function (e) { e.preventDefault(); window.location.href = "profile.html"; }); }

  // EXECUÇÃO INICIAL
  initProfilePage();
});