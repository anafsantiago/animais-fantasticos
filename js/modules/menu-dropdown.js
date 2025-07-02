//Esta solução serve para quando o usuário está usando o mobile
import outsideClick from "./click-outside.js";

export default function initMenuDropdown() {
  const dropdownMenus = document.querySelectorAll("[data-dropdown]");

  function handleClick(event) {
    event.preventDefault();
    this.classList.add("active");
    //Quando abre o menu dropdown é o momento de monitorar o clique externo
    outsideClick(this, ["touchstart", "click"], () => {
      this.classList.remove("active");
    }); //Esta função monitora o clique externo
  }

  dropdownMenus.forEach((menu) => {
    //touchstart é mais indicado do que o click, pois, apesar de ambos serem reconhecidos para mobile, o click demora mais para acontecer

    const eventos = ["touchstart", "click"]; //Array de eventos para usar mais de um evento de uma vez só

    //Itera sobre a array de eventos
    eventos.forEach((userEvent) => {
      menu.addEventListener(userEvent, handleClick);
    });
  });
}
