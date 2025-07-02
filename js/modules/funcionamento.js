export default function initFuncionamento() {
  const funcionamento = document.querySelector("[data-semana]");

  const diasSemana = funcionamento.dataset.semana.split(",").map(Number);
  const horarios = funcionamento.dataset.horario.split(",").map(Number);

  const date = new Date();
  const diaAgora = date.getDay();
  const horaAgora = date.getHours();
  const diaAberto = diasSemana.indexOf(diaAgora) !== -1; //Verifica se o dia atual está presente no array de dias abertos. Se não estiver, retorna -1. Por isso, retornar -1 significa que o local não está aberto naquele dia.
  //console.log(diasSemana.includes(diaAgora)); --> Faz o mesmo papel que o comando anterior
  const horaAberta = horaAgora >= horarios[0] && horaAgora < horarios[1];

  if (diaAberto && horaAberta) {
    funcionamento.classList.add("aberto");
  }
}
