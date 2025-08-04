import debounce from "./debounce.js";

//Classe dos slides em si
export class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    //Objeto que contém as referências dos números (ex: onde está o slide, qual foi a distância movida pelos mouse, etc)
    this.dist = {
      finalPosition: 0, //Posição final do slide (começa no 0, referindo-se ao 1º slide)
      startX: 0, //Posição durante o clique inicial, isto é, onde o mouse estava quando foi feito o mousedown
      movement: 0, //Total que se moveu no momento do mousedown (começa no 0)
    };
    this.activeClass = "active";
    this.changeEvent = new Event("changeEvent"); //Criação de evento que, quando ativado, indicará a mudança de slide para a navegação
  }

  //Método responsável por adicionar o transition
  transition(active) {
    this.slide.style.transition = active ? "transform .3s" : "";
  }

  //Método que irá mover o slide em si
  moveSlide(distX) {
    //Guarda o valor atual da distância percorrida em 'movePosition'. Essa distância é o valor de this.dist.finalPosition - this.dist.movement, para que o movimento do translate3d não comece do 0, mas sim a partir do ponto onde parou anteriormente
    this.dist.movePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  //Método que irá calcular/atualizar o valor do movimento do mouse
  updatePosition(clientX) {
    //Subtrai o valor da posição em que o mouse se encontra (clientX) do valor da posição inicial do mouse (startX)
    //Multiplica o valor do movimento, para mover o slide mais rapidamente
    this.dist.movement = (this.dist.startX - clientX) * 1.6;
    return this.dist.finalPosition - this.dist.movement; //Cálculo realizado para que o movimento do slide não comece do 0, mas sim a partir do ponto onde parou anteriormente (this.dist.finalPosition)
  }

  onStart(event) {
    let movetype;
    if (event.type === "mousedown") {
      event.preventDefault();
      movetype = "mousemove";
      this.dist.startX = event.clientX; //Sempre que houver o clique, a posição inicial do mouse será guardada no startX. Esse valor é obtido por meio da propriedade clientX
    } else {
      movetype = "touchmove";
      this.dist.startX = event.changedTouches[0].clientX; //Mesma ação que o comando anterior, mas para touch
    }
    this.wrapper.addEventListener(movetype, this.onMove); //Este evento é iniciado apenas quando der o start
    this.transition(false);
  }

  onMove(event) {
    const pointerPosition =
      event.type === "mousemove"
        ? event.clientX
        : event.changedTouches[0].clientX;
    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition);
  }

  //Método criado para remover o evento de mousemove depois que o mousedown for finalizado
  onEnd(event) {
    const movetype = event.type === "mouseup" ? "mousemove" : "touchmove";
    //Remove o evento de mousemove para que só funcione durante o momento de clique
    this.wrapper.removeEventListener(movetype, this.onMove);
    this.dist.finalPosition = this.dist.movePosition; //Posição onde o mouse parou no momento do mouseup
    this.transition(true); //Adiciona o transition para o changeSlideOnEnd não ser muito rápido
    this.changeSlideOnEnd();
  }

  //Método responsável por mudar o slide ao final do clique, verificando se o mouse vai para esquerda ou direita
  changeSlideOnEnd() {
    if (this.dist.movement > 120 && this.index.next !== undefined) {
      this.activeNextSlide();
    } else if (this.dist.movement < -120 && this.index.prev !== undefined) {
      this.activePrevSlide();
    } else {
      this.changeSlide(this.index.active);
    }
  }

  addSlideEvents() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("touchstart", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
    this.wrapper.addEventListener("touchend", this.onEnd);
  }

  //Método que realiza o cálculo da posição do elemento para que ele fique localizado no centro da tela
  //Subtrai o tamanho da tela pelo tamanho de cada elemento e divide por 2 para obter as margens
  slidePosition(slideItem) {
    const margin = (this.wrapper.offsetWidth - slideItem.offsetWidth) / 2;
    return -(slideItem.offsetLeft - margin); //offsetLeft pega a posição do elemento, mas coloca-o na ponta, então realiza-se este cálculo para colocá-lo no centro
  }

  //Slides config
  //Método para salvar a posição de cada slide para que, ao navegar em direção a ele, ele fique inteiro, posicionado no meio da tela
  slidesConfig() {
    //Desestrutura cada um dos filhos do slide (ul), transformando-os em uma array
    //Faz um map, retornando um objeto que contenha a posição de cada elemento e o elemento em si
    this.slideArray = [...this.slide.children].map((element) => {
      const position = this.slidePosition(element);
      return {
        element,
        position,
      };
    });
  }

  //Índice de navegação dos slides (saber qual é o slide atual, o próximo e o anterior)
  slidesIndexNav(index) {
    const last = this.slideArray.length - 1;
    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === last ? undefined : index + 1,
    };
  }

  //Método responsável por mudar o slide a partir do index que for passado
  changeSlide(index) {
    const activeSlide = this.slideArray[index];
    this.moveSlide(activeSlide.position); //Mover o slide para a posição indicada
    this.slidesIndexNav(index); //Atualizar os valores de atual, anterior e próximo após o movimento
    this.dist.finalPosition = activeSlide.position; //Atualizar o valor de distância onde o mouse parou no momento do mouseup (para continuar o movimento a partir de onde parou e não voltar do 0)
    this.changeActiveClass();
    this.wrapper.dispatchEvent(this.changeEvent); //Ativa/emite o evento e, com isso, avisa à navegação que há uma mudança de slide
  }

  //Adicionar a classe 'active' no elemento que estiver ativo
  changeActiveClass() {
    this.slideArray.forEach((item) => item.element.classList.remove("active"));
    this.slideArray[this.index.active].element.classList.add(this.activeClass);
  }

  //Método responsável por mover para o slide anterior
  activePrevSlide() {
    if (this.index.prev !== undefined) {
      this.changeSlide(this.index.prev);
    }
  }

  //Método responsável por mover para o slide posterior
  activeNextSlide() {
    if (this.index.next !== undefined) {
      this.changeSlide(this.index.next);
    }
  }

  //Caso ocorra o resize na tela, faz com que as configurações dos slides ocorram novamente, sendo atualizadas para que não aconteçam erros nos posicionamentos e distâncias (feita depois de um tempo após o resize);
  onResize() {
    setTimeout(() => {
      this.slidesConfig();
      this.changeSlide(this.index.active); //Reposiciona para o slide que está ativo
    }, 1000);
  }

  addResizeEvent() {
    window.addEventListener("resize", this.onResize);
  }

  //Método para fazer os binds de todos os eventos
  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);

    this.activePrevSlide = this.activePrevSlide.bind(this);
    this.activeNextSlide = this.activeNextSlide.bind(this);

    this.onResize = debounce(this.onResize.bind(this), 200);
  }

  init() {
    this.bindEvents();
    this.transition(true);
    this.addSlideEvents();
    this.slidesConfig();
    this.addResizeEvent();
    this.changeSlide(0);
    return this;
  }
}

//Classe que extende a classe dos slide (classe Slide), para adicionar a funcionalidade dos botões de navegação
export default class SlideNav extends Slide {
  constructor(slide, wrapper) {
    super(slide, wrapper);
    this.bindControlEvents();
  }

  //Seleciona os elementos de navegação
  addArrow(prev, next) {
    this.prevElement = document.querySelector(prev);
    this.nextElement = document.querySelector(next);
    this.addArrowEvent();
  }

  //Adiciona os eventos para realizar a navegação (próximo e anterior) nos elementos de navegação
  addArrowEvent() {
    this.prevElement.addEventListener("click", this.activePrevSlide);
    this.nextElement.addEventListener("click", this.activeNextSlide);
  }

  //Automaticamente cria as bolinhas da paginação
  createControl() {
    const control = document.createElement("ul");
    control.dataset.control = "slide";

    //Cria um elemento para cada um dos slides
    this.slideArray.forEach((item, index) => {
      control.innerHTML += `<li><a href=#slide${index + 1}>${
        index + 1
      }</a></li>`;
    });
    this.wrapper.appendChild(control);
    return control;
  }

  //Adiciona os eventos de click em cada bolinha, para que, ao clicá-las, o slide também mude
  eventControl(item, index) {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      this.changeSlide(index);
    });
    this.wrapper.addEventListener("changeEvent", this.activeControlItem); //Escuta a evento criado no construtor da super classe, para indicar que, quando um slide mudar e ficar ativo, as bolinhas da navegação correspondentes também ficarão ativas
  }

  activeControlItem() {
    this.controlArray.forEach((item) => {
      item.classList.remove(this.activeClass);
    });
    this.controlArray[this.index.active].classList.add(this.activeClass);
  }

  //Seleciona ou cria o controle e executa a função eventControl() para cada um dos elementos do controle
  addControl(customControl) {
    this.control =
      document.querySelector(customControl) || this.createControl();
    this.controlArray = [...this.control.children];
    this.activeControlItem();

    this.controlArray.forEach((item, index) => {
      this.eventControl(item, index);
    });

    /*
    Outra forma de escrever o comando anterior
    this.controlArray.forEach(this.eventControl);
    */
  }

  bindControlEvents() {
    this.eventControl = this.eventControl.bind(this);
    this.activeControlItem = this.activeControlItem.bind(this);
  }
}
