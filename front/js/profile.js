document.addEventListener("DOMContentLoaded", function () {
  // =================================================================
  // DADOS DO PERFIL (Simula dados vindos de um banco de dados)
  // =================================================================
  const userData = {
    nome: "José Rodrigues",
    cargo: "Desenvolvedor Back-end",
    foto: "./images/isaac.png", // Adicionado caminho da foto
    buddy: {
      nome: "Gabriela Mendes",
      cargo: "Analista Sênior",
      foto: "images/buddy.png", // Caminho para a foto do buddy
    },
    progresso: 10, // Em porcentagem
    pontos: 100,
    pontosMax: 1000,
    tags: ["Java", "Spring Boot", "Comunicação", "SQL", "Inovação"],
    contato: {
      email: "jose.rodrigues@vivo.com",
      linkedin: "https://www.linkedin.com/in/joserodrigues-exemplo/",
    },
    jornada: [
      {
        status: "concluido",
        titulo: "Bem-vindo ao Colabora+",
        desc: "Você explorou a plataforma e personalizou seu perfil. Ótimo começo!",
      },
      {
        status: "concluido",
        titulo: "Primeira Missão Concluída",
        desc: "Você aprendeu sobre a as funcionalidades da plataforma e ganhou 50 pontos.",
      },
      {
        status: "ativo",
        titulo: "Trilha Vivo: Descobrindo Nosso Mundo",
        desc: "Sua próxima missão é conhecer mais sobre a cultura da Vivo.",
        link: "missoes.html",
      },
      {
        status: "proximo",
        titulo: "Próximo Passo: Mentoria Inicial",
        desc: "Agende a primeira conversa com seu Buddy para alinhar expectativas.",
      },
    ],
  };

  // =================================================================
  // INICIALIZAÇÃO DA PÁGINA DE PERFIL
  // =================================================================
  function initProfilePage() {
    // Verifica se estamos na página de perfil para executar as funções
    if (document.querySelector(".progress-circle")) {
      populateProfileData(userData);
      updateProgress(userData.progresso, userData.pontos, userData.pontosMax);
      initBadgeListeners();
      initBuddyPopover(userData.buddy);
      initProfilePicModal(userData.foto);
      initTooltips();
    }
  }

  // =================================================================
  // FUNÇÕES DA PÁGINA DE PERFIL
  // =================================================================

  // 1. Preenche todos os dados dinâmicos do perfil
  function populateProfileData(data) {
    document.getElementById("userName").textContent = data.nome;
    document.getElementById("userRole").textContent = data.cargo;
    document.getElementById("userBuddy").textContent = data.buddy.nome;
    document.getElementById("profilePicture").src = data.foto;

    // Popula as Tags
    const tagsContainer = document.getElementById("userTags");
    tagsContainer.innerHTML = ""; // Limpa antes de adicionar
    data.tags.forEach((tag) => {
      tagsContainer.innerHTML += `<span class="badge rounded-pill text-bg-secondary m-1">${tag}</span>`;
    });

    // Popula os Contatos
    const contactContainer = document.getElementById("userContact");
    contactContainer.innerHTML = `
        <a href="mailto:${data.contato.email}" class="contact-link" title="E-mail"><i class="fas fa-envelope"></i></a>
        <a href="${data.contato.linkedin}" target="_blank" class="contact-link" title="LinkedIn"><i class="fab fa-linkedin"></i></a>
    `;

    // Popula a Jornada (Timeline)
    const timelineContainer = document.querySelector(".timeline");
    timelineContainer.innerHTML = ""; // Limpa antes de adicionar
    data.jornada.forEach((item) => {
      let markerClass = "";
      let contentClass = "p-3 rounded border";
      let icon = "";
      let button = item.link
        ? `<a href="${item.link}" class="btn btn-sm btn-purple mt-2">Ver na Trilha</a>`
        : "";

      if (item.status === "concluido") {
        markerClass = "timeline-marker-check";
        icon = '<i class="fa-solid fa-check"></i>';
      } else if (item.status === "ativo") {
        markerClass = "timeline-marker-active";
        contentClass += " border-purple";
      } else {
        // proximo
        markerClass = "timeline-marker-next";
        contentClass += " bg-light";
      }

      timelineContainer.innerHTML += `
            <li class="timeline-item">
                <div class="${markerClass}">${icon}</div>
                <div class="${contentClass}">
                    <h6 class="fw-bold">${item.titulo}</h6>
                    <p class="text-muted small mb-0">${item.desc}</p>
                    ${button}
                </div>
            </li>
        `;
    });
  }

  // 2. Atualiza os elementos de progresso (círculo e pontos) com animação
  function updateProgress(progress, points, maxPoints) {
    const circle = document.getElementById("progress-circle");
    const progressText = document.getElementById("progress-text");
    const pointsText = document.getElementById("userPoints");

    // Animação do círculo de progresso
    circle.style.background = `conic-gradient(#6c29a6 ${
      progress * 3.6
    }deg, #ededed 0deg)`;
    progressText.textContent = `${progress}%`;

    // Animação do contador de pontos
    let currentPoints = 0;
    const increment = points / 100; // Define a velocidade da animação

    const interval = setInterval(() => {
      currentPoints += increment;
      if (currentPoints >= points) {
        currentPoints = points;
        clearInterval(interval);
      }
      pointsText.textContent = `${Math.ceil(currentPoints)} / ${maxPoints}`;
    }, 10); // Intervalo em milissegundos
  }

  // 3. Adiciona os eventos de clique para as conquistas abrirem o modal
  function initBadgeListeners() {
    const badges = document.querySelectorAll(".badge-img");
    badges.forEach((badge) => {
      badge.addEventListener("click", function () {
        const src = badge.getAttribute("src");
        const alt = badge.getAttribute("alt");
        const descricao = badge.getAttribute("data-descricao");

        document.getElementById("modalConquistaTitle").textContent = alt;
        document.getElementById("modalConquistaImg").src = src;
        document.getElementById("modalConquistaImg").alt = alt;
        document.getElementById("modalConquistaDesc").textContent = descricao;
      });
    });
  }

  // 4. Inicializa o Popover do Buddy
  function initBuddyPopover(buddyData) {
    const buddyLink = document.getElementById("userBuddy");
    const popoverContent = `
        <div class="d-flex align-items-center">
            <img src="${buddyData.foto}" class="rounded-circle me-3" width="60" height="60">
            <div>
                <h6 class="mb-0 fw-bold">${buddyData.nome}</h6>
                <p class="mb-2 text-muted small">${buddyData.cargo}</p>
                <a href="mentoria.html" class="btn btn-sm btn-purple">Enviar Mensagem</a>
            </div>
        </div>
      `;

    new bootstrap.Popover(buddyLink, {
      content: popoverContent,
      html: true,
      title: "Seu Buddy",
      trigger: "click", // 'focus' ou 'hover' também são opções
      placement: "top",
    });
  }
  
  // 5. Inicializa o modal da foto de perfil
  function initProfilePicModal(picSrc) {
    const profilePic = document.getElementById("profilePicture");
    const modalPicImg = document.getElementById("modalProfilePicImg");

    profilePic.addEventListener("click", () => {
      modalPicImg.src = picSrc;
    });
  }

  // 6. Inicializa todos os tooltips do Bootstrap
  function initTooltips() {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );
  }

  // =================================================================
  // SEÇÃO DE LOGIN (CÓDIGO ORIGINAL PRESERVADO)
  // =================================================================
  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");
  const loginForm = document.getElementById("loginForm");

  if (emailInput) {
    emailInput.addEventListener("focus", function () {
      emailInput.value = "joserodrigues@vivo.com";
      emailInput.readOnly = true; // impede edição
    });
  }

  if (senhaInput) {
    senhaInput.addEventListener("focus", function () {
      senhaInput.value = "123456abc";
      senhaInput.readOnly = true; // impede edição
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault(); // impede reload
      window.location.href = "profile.html"; // redireciona
    });
  }

  // =================================================================
  // EXECUÇÃO INICIAL
  // =================================================================
  initProfilePage();
});