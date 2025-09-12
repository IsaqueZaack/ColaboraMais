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

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault(); // impede reload
  window.location.href = "profile.html"; // redireciona
})
})
