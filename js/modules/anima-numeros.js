export default class AnimaNumeros {
  constructor(numeros, observerTarget, observerClass) {
    this.numeros = document.querySelectorAll(numeros);
    this.observerTarget = document.querySelector(observerTarget); //Elemento que será o alvo da mutação
    this.observerClass = observerClass;

    this.handleMutation = this.handleMutation.bind(this);
  }

  animaNumeros() {
    this.numeros.forEach((numero) =>
      this.constructor.incrementarNumeros(numero)
    );
  }

  //Recebe um elemento do DOM com número em seu texto
  //Incrementa a partir de 0 até o número final
  //É static pois não depende de nenhum atributo ou método do objeto
  static incrementarNumeros(numero) {
    const total = +numero.innerText;
    const incremento = Math.floor(total / 100); //Torna mais rápido o incremento, para não ser de 1 em 1

    let start = 0;
    const timer = setInterval(() => {
      numero.innerText = start;

      if (start >= total) {
        numero.innerText = total; //Devido ao incremento, o número vai passar do total, mas, ao final, ele voltará para o mesmo valor do total
        clearInterval(timer);
      }
      start += incremento;
    }, 25 * Math.random()); //O Math.random() permite que, cada vez, cada um comece em um momento diferente e não na mesma ordem, para que fique mais orgânico
  }

  handleMutation(mutation) {
    //Como foram observados apenas os atributos e apenas um deles sofreu a mutação (a classe "ativo"), o mutation[0] vai acessar justamente esse atributo
    if (mutation[0].target.classList.contains(this.observerClass)) {
      this.observer.disconnect(); //Quando ocorrer a animação, vai parar de observar e, por isso, só vai animar uma vez
      this.animaNumeros(); //A função só será ativada quando a mutação para adicionar a classe "ativo" estiver ocorrendo. Quando a mutação estiver removendo a classe "ativo", a condição do if não será satisfeita e, portanto, a função não será executada.
    }
  }

  addMutationObserver() {
    this.observer = new MutationObserver(this.handleMutation); //Cria um objeto observador que vai observar qualquer mutação existente no seção alvo e ativar uma função

    this.observer.observe(this.observerTarget, { attributes: true }); //Passa, como parâmetros, o alvo a ser observado e a opção em que a mutação será aplicada
  }

  init() {
    if (this.numeros.length && this.observerTarget) {
      this.addMutationObserver();
    }
    return this;
  }
}
