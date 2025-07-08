//Esta solução serve para quando o usuário está usando o mobile
import outsideClick from "./click-outside.js";

export default class MenuDropdown {
  constructor(dropdownMenus, activeClass, events) {
    this.dropdownMenus = document.querySelectorAll(dropdownMenus);
    this.activeClass = activeClass;

    //Define touchstart e click como argumento padrão de events, caso o usuário não defina
    if (events === undefined) {
      this.events = ["touchstart", "click"];
    } else {
      this.events = events;
    }

    this.activeDropdownMenu = this.activeDropdownMenu.bind(this);
  }

  //Ativa o dropdownmenu e adiciona a função que observa o clique fora dele.
  activeDropdownMenu(event) {
    event.preventDefault();
    const element = event.currentTarget;
    element.classList.add(this.activeClass);
    //Quando abre o menu dropdown é o momento de monitorar o clique externo
    outsideClick(element, this.events, () => {
      element.classList.remove(this.activeClass);
    }); //Esta função monitora o clique externo
  }

  //Adiciona os eventos ao dropdown menu
  addDropdownMenusEvent() {
    //touchstart é mais indicado do que o click, pois, apesar de ambos serem reconhecidos para mobile, o click demora mais para acontecer
    //Array de eventos para usar mais de um evento de uma vez só
    //Itera sobre a array de eventos
    this.dropdownMenus.forEach((menu) => {
      this.events.forEach((userEvent) => {
        menu.addEventListener(userEvent, this.activeDropdownMenu);
      });
    });
  }

  init() {
    if (this.dropdownMenus.length) {
      this.addDropdownMenusEvent();
    }
    return this;
  }
}
