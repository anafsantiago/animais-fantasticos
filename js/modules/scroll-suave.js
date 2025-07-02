//Módulo que será exportado. O "default" é porque apenas 1 função está sendo exportada

export default function initScrollSuave() {
  const linksInternos = document.querySelectorAll(
    '[data-menu="suave"] a[href^="#"]'
  );

  function scrollToSection(event) {
    event.preventDefault();
    const href = this.getAttribute("href");
    const section = document.querySelector(href);

    /* scrollIntoView() dá o scroll a partir do local onde a section se encontra */
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    /* Função alternativa
      const topo = section.offsetTop;
      window.scrollTo({
      top: topo,
      behavior: "smooth",
      });
      */
  }

  if (linksInternos.length) {
    linksInternos.forEach((link) => {
      link.addEventListener("click", scrollToSection);
    });
  }
}
