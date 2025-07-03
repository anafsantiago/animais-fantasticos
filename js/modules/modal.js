export default class Modal {
  constructor(botaoAbrir, botaoFechar, modalContainer) {
    this.botaoAbrir = document.querySelector(botaoAbrir);
    this.botaoFechar = document.querySelector(botaoFechar);
    this.modalContainer = document.querySelector(modalContainer);

    this.eventToggleModal = this.eventToggleModal.bind(this);
    this.cliqueForaModal = this.cliqueForaModal.bind(this);
  }

  //Abre ou fecha o modal
  toggleModal() {
    this.modalContainer.classList.toggle("ativo");
  }

  //Adiciona o evento de toggle ao modal
  eventToggleModal(event) {
    event.preventDefault();
    this.toggleModal();
  }

  //Fecha o modal ao clicar do lado de fora
  cliqueForaModal(event) {
    if (event.target === this.modalContainer) {
      //O this é a própria section "modal-container"
      this.toggleModal();
    }
  }

  //Adiciona os eventos aos elementos do modal
  addModalEvents() {
    this.botaoAbrir.addEventListener("click", this.eventToggleModal);
    this.botaoFechar.addEventListener("click", this.eventToggleModal);
    this.modalContainer.addEventListener("click", this.cliqueForaModal);
  }

  init() {
    if (this.botaoAbrir && this.botaoFechar && this.modalContainer) {
      this.addModalEvents();
    }
    return this;
  }
}
