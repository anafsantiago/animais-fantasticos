export default function initModal() {
  const botaoAbrir = document.querySelector('[data-modal="abrir"]');
  const botaoFechar = document.querySelector('[data-modal="fechar"]');
  const modalContainer = document.querySelector('[data-modal="container"]');

  function toggleModal(event) {
    event.preventDefault();
    modalContainer.classList.toggle("ativo");
  }

  function cliqueForaModal(event) {
    if (event.target === this) {
      //O this é a própria section "modal-container"
      toggleModal(event);
    }
  }

  if (botaoAbrir && botaoFechar && modalContainer) {
    /*
    if (event.target.tagName === "SECTION") {
      fecharModal(event);
    }
    */
  }
  botaoAbrir.addEventListener("click", toggleModal);
  botaoFechar.addEventListener("click", toggleModal);
  modalContainer.addEventListener("click", cliqueForaModal);
}
