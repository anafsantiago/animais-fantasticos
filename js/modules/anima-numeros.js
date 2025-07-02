export default function initAnimaNumeros() {
  function animaNumeros() {
    const numeros = document.querySelectorAll("[data-numero]");

    numeros.forEach((numero) => {
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
    });
  }

  function handleMutation(mutation) {
    //mutation é um nome especial, com algumas funcionalidades dentro dele, como o event

    //Como foram observados apenas os atributos e apenas um deles sofreu a mutação (a classe "ativo"), o mutation[0] vai acessar justamente esse atributo
    if (mutation[0].target.classList.contains("ativo")) {
      observer.disconnect(); //Quando ocorrer a animação, vai parar de observar e, por isso, só vai animar uma vez
      animaNumeros(); //A função só será ativada quando a mutação para adicionar a classe "ativo" estiver ocorrendo. Quando a mutação estiver removendo a classe "ativo", a condição do if não será satisfeita e, portanto, a função não será executada.
    }
  }

  const observerTarget = document.querySelector(".numeros"); //Elemento que será o alvo da mutação
  const observer = new MutationObserver(handleMutation); //Cria um objeto observador que vai observar qualquer mutação existente no seção alvo e ativar uma função

  observer.observe(observerTarget, { attributes: true }); //Passa, como parâmetros, o alvo a ser observado e a opção em que a mutação será aplicada
}
