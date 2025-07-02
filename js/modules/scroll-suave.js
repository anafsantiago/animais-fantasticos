//Módulo que será exportado. O "default" é porque apenas 1 classe está sendo exportada

export default class ScrollSuave {
  constructor(links, options) {
    this.linksInternos = document.querySelectorAll(links);
    if (options === undefined) {
      this.options = { behavior: "smooth", block: "start" };
    } else {
      this.options = options;
    }

    this.scrollToSection = this.scrollToSection.bind(this);
  }

  scrollToSection(event) {
    event.preventDefault();
    const href = event.currentTarget.getAttribute("href");
    const section = document.querySelector(href);

    /* scrollIntoView() dá o scroll a partir do local onde a section se encontra */
    section.scrollIntoView(this.options);

    /* Função alternativa
      const topo = section.offsetTop;
      window.scrollTo({
      top: topo,
      behavior: "smooth",
      });
      */
  }
  addLinkEvent() {
    this.linksInternos.forEach((link) => {
      link.addEventListener("click", this.scrollToSection);
    });
  }

  init() {
    if (this.linksInternos.length) {
      this.addLinkEvent();
    }
    return this;
  }
}

//'[data-menu="suave"] a[href^="#"]'
