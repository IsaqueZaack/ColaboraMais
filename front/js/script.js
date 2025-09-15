document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");

  // E-mail mocado
  if (emailInput) {
    emailInput.addEventListener("focus", function () {
      emailInput.value = "joserodrigues@vivo.com";
      emailInput.readOnly = true; // impede edição
    });
  }

  // Senha mocada
  if (senhaInput) {
    senhaInput.addEventListener("focus", function () {
      senhaInput.value = "123456abc";
      senhaInput.readOnly = true; // impede edição
    });
  }

  // Formulário
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault(); // impede reload
      window.location.href = "profile.html"; // redireciona
    });
  }

  // Badges do perfil
  const badges = document.querySelectorAll(".badge-img");
  badges.forEach((badge) => {
    badge.addEventListener("click", function () {
      const src = badge.getAttribute("src");
      const alt = badge.getAttribute("alt");
      const descricao = badge.getAttribute("data-descricao");

      document.getElementById("modalConquistaImg").src = src;
      document.getElementById("modalConquistaImg").alt = alt;
      document.getElementById("modalConquistaDesc").textContent = descricao;
    });
  });
});