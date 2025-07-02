export default function outsideClick(element, events, callback) {
  const html = document.documentElement;
  const outside = "data-outside"; //Atributo que indica se o elemento já está monitorando o clique externo ou não

  //Verifica se o elemento já monitora o clique externo, por meio do atributo 'data-outside', para que o evento não seja adicionado várias vezes
  if (!element.hasAttribute(outside)) {
    events.forEach((userEvent) => {
      setTimeout(() => html.addEventListener(userEvent, handleOutsideClick)); //O setTimeout, por ser assíncrono, faz com que a fase de bubble ocorra primeiro. Isso, porque ele colocará a função ligada ao html em espera, de modo que ela irá esperar toda a call stack acabar para ser executada e, assim, a fase de bubble, que ocorrerá na call stack, será executada antes do setTimeout. Dessa forma, o addEventListener será adicionado ao html apenas após a fase de bubble, pois estará em espera.
    });
    element.setAttribute(outside, "");
  }

  function handleOutsideClick(event) {
    //Verifica se clicou do lado de fora
    if (!element.contains(event.target)) {
      element.removeAttribute(outside);
      //Remove o evento quando fecha o dropdown e retira a classe 'active'
      events.forEach((userEvent) => {
        html.removeEventListener(userEvent, handleOutsideClick);
      });
      callback();
    }
  }
}
