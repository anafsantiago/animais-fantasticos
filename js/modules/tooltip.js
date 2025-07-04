export default class Tooltip {
  constructor(tooltips) {
    this.tooltips = document.querySelectorAll(tooltips);

    //Bind do objeto da classe aos callbacks
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  //Move a tooltip com base em seus estilos, de acordo com a posição do mouse
  onMouseMove(event) {
    // O tooltip acompanha o cursor, pois os seus valores de top e left são determinados de acordo com a posição do mouse na tela
    this.tooltipBox.style.top = `${event.pageY + 20}px`;

    //Checa se a posição do mouse + tooltip está "estourando" a largura da janela
    if (event.pageX + 240 > window.innerWidth) {
      this.tooltipBox.style.left = `${event.pageX - 190}px`;
    } else {
      this.tooltipBox.style.left = `${event.pageX + 20}px`;
    }
  }

  //Remove a tooltip e os eventos de mousemove e mouseleave
  onMouseLeave({ currentTarget }) {
    this.tooltipBox.remove();
    currentTarget.removeEventListener("mouseleave", this.onMouseLeave); //Remove o evento de mouseleave quando o mouse sair da área do mapa. Não remove apenas o tooltip, mas o evento em si. Uma vez que removeu o tooltip quando o mouse deixou a área do mapa, também vai remover o evento
    currentTarget.removeEventListener("mousemove", this.onMouseMove);
  }

  //Cria a tooltip e adiciona os eventos de mousemove e mouseleave ao target
  onMouseOver({ currentTarget }) {
    // Chama a função que cria o elemento tooltip apenas quando o mouse passa por cima do mapa
    this.criarTooltipBox(currentTarget);
    //Chama a função que faz com que o tooltip acompanhe o cursor
    currentTarget.addEventListener("mousemove", this.onMouseMove);
    currentTarget.addEventListener("mouseleave", this.onMouseLeave);
    // O evento de mouseleave é adicionado a esta função, pois, ele só deve existir enquanto o mouse estiver no mapa. No restante do tempo, ele não deve ser acionado
  }

  //Cria a TooltipBox e retorna no body
  criarTooltipBox(elemento) {
    const tooltipBoxElement = document.createElement("div");
    tooltipBoxElement.classList.add("tooltip");
    const text = elemento.getAttribute("aria-label");
    tooltipBoxElement.innerText = text;
    document.body.appendChild(tooltipBoxElement);
    this.tooltipBox = tooltipBoxElement;
  }

  //Adiciona os eventos de mouseover a cada tooltip
  addTooltipsEvent() {
    this.tooltips.forEach((item) => {
      item.addEventListener("mouseover", this.onMouseOver);
    });
  }

  init() {
    if (this.tooltips.length) {
      this.addTooltipsEvent();
    }
    return this;
  }
}
