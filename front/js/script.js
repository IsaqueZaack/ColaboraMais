// Simulação do login
document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");

  // E-mail mocado
  emailInput.addEventListener("focus", function () {
    emailInput.value = "joserodrigues@vivo.com";
    emailInput.readOnly = true; // impede edição
  });

  // Senha mocada
  senhaInput.addEventListener("focus", function () {
    senhaInput.value = "123456abc";
    senhaInput.readOnly = true; // impede edição
  });

  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault(); // impede reload
    window.location.href = "profile.html"; // redireciona
  });

   document.addEventListener("DOMContentLoaded", function() {
  // Preenche modal ao clicar na badge
  const badges = document.querySelectorAll(".badge-img");

  badges.forEach((badge) => {
    badge.addEventListener("click", function() {
      const src = badge.getAttribute("src");
      const alt = badge.getAttribute("alt");
      const descricao = badge.getAttribute("data-descricao");

      document.getElementById("modalConquistaImg").src = src;
      document.getElementById("modalConquistaImg").alt = alt;
      document.getElementById("modalConquistaDesc").textContent = descricao;
    });
  });
});
})