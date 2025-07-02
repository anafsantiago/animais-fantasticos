export default function initTooltip() {
  const tooltips = document.querySelectorAll("[data-tooltip]");

  tooltips.forEach((item) => {
    item.addEventListener("mouseover", onMouseOver);
  });

  function onMouseOver(event) {
    // Chama a função que cria o elemento tooltip apenas quando o mouse passa por cima do mapa
    const tooltipBox = criarTooltipBox(this);

    //Chama a função que faz com que o tooltip acompanhe o cursor
    onMouseMove.tooltipBox = tooltipBox;
    this.addEventListener("mousemove", onMouseMove);

    // O evento de mouseleave é adicionado a esta função, pois, ele só deve existir enquanto o mouse estiver no mapa. No restante do tempo, ele não deve ser acionado
    // onMouseLeave é um objeto, e não uma função. Para que ele possa ser passado como parâmetro no addEventListener, ele precisa ter o método handleEvent(), que é executado automaticamente quando o objeto é passado como parâmetro
    // O nome do método deve ser exatamente handleEvent()
    onMouseLeave.tooltipBox = tooltipBox;
    onMouseLeave.element = this; // Atribui o elemento this, que é o mapa, ao objeto
    this.addEventListener("mouseleave", onMouseLeave);
  }

  const onMouseLeave = {
    handleEvent() {
      this.tooltipBox.remove();
      this.element.removeEventListener("mouseleave", onMouseLeave); //Remove o evento de mouseleave quando o mouse sair da área do mapa. Não remove apenas o tooltip, mas o evento em si. Uma vez que removeu o tooltip quando o mouse deixou a área do mapa, também vai remover o evento
      this.element.removeEventListener("mousemove", onMouseMove);
    },
  };

  // O tooltip acompanha o cursor, pois os seus valores de top e left são determinados de acordo com a posição do mouse na tela
  const onMouseMove = {
    handleEvent(event) {
      this.tooltipBox.style.top = event.pageY + 20 + "px";
      this.tooltipBox.style.left = event.pageX + 20 + "px";
    },
  };

  function criarTooltipBox(element) {
    const tooltipBox = document.createElement("div");
    tooltipBox.classList.add("tooltip");
    const text = element.getAttribute("aria-label");
    tooltipBox.innerText = text;
    document.body.appendChild(tooltipBox);
    return tooltipBox;
  }
}
