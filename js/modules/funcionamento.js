export default class Funcionamento {
  constructor(funcionamento, activeClass) {
    this.funcionamento = document.querySelector(funcionamento);
    this.activeClass = activeClass;
  }

  getDadosFuncionamento() {
    this.diasSemana = this.funcionamento.dataset.semana.split(",").map(Number);
    this.horarios = this.funcionamento.dataset.horario.split(",").map(Number);
  }

  getDadosAgora() {
    this.date = new Date();
    this.diaAgora = this.date.getDay();
    this.horaAgora = this.date.getUTCHours() - 3;
  }

  estaAberto() {
    const diaAberto = this.diasSemana.indexOf(this.diaAgora) !== -1;

    const horaAberta =
      this.horaAgora >= this.horarios[0] && this.horaAgora < this.horarios[1];

    return diaAberto && horaAberta;

    //const diaAberto = diasSemana.indexOf(diaAgora) !== -1; //Verifica se o dia atual está presente no array de dias abertos. Se não estiver, retorna -1. Por isso, retornar -1 significa que o local não está aberto naquele dia.
    //console.log(this.diasSemana.includes(this.diaAgora)); --> Faz o mesmo papel que o comando anterior
  }

  ativaAberto() {
    if (this.estaAberto()) {
      this.funcionamento.classList.add(this.activeClass);
    }
  }

  init() {
    if (this.funcionamento) {
      this.getDadosAgora();
      this.getDadosFuncionamento();
      this.ativaAberto();
    }
    return this;
  }
}
