//Módulo que será exportado. O "default" é porque apenas 1 função está sendo exportada

export default function initAccordion() {
  const faqPergunta = document.querySelectorAll('[data-anime="accordion"] dt');
  const classeAtivo = "ativo";

  function activeAccordion() {
    this.nextElementSibling.classList.toggle(classeAtivo);
    this.classList.toggle(classeAtivo);
  }

  if (faqPergunta.length) {
    faqPergunta[0].classList.add(classeAtivo);
    faqPergunta[0].nextElementSibling.classList.add(classeAtivo);

    faqPergunta.forEach((item) => {
      item.addEventListener("click", activeAccordion);
    });
  }
}
