//A ordem de execução dos arquivos importa
//O 1º arquivo a ser carregado é o script.js e, depois, é que os outros são carregados. Os demais são carregados de forma assíncrona, isto é, se um for muito grande, o navegador não espera o arquivo muito grande carregar, de modo que vai carregando os demais, mas, depois, ele executa na ordem indicada no arquivo script.js

//Quando está importando somente uma função, o nome da função não precisa ser o mesmo, mas, como boa prática, geralmente, é. Porém, quando se importa mais de uma, os nomes devem ser exatamente os mesmos

import ScrollSuave from "./modules/scroll-suave.js";
import Accordion from "./modules/accordion.js";
import TabNav from "./modules/tabnav.js";
import initModal from "./modules/modal.js";
import initTooltip from "./modules/tooltip.js";
import initMenuDropdown from "./modules/menu-dropdown.js";
import initMenuMobile from "./modules/menu-mobile.js";
import initFuncionamento from "./modules/funcionamento.js";
import initFetchAnimais from "./modules/fetch-animais.js";
import initFetchBitcoin from "./modules/fetch-bitcoin.js";
import initAnimaScroll from "./modules/scroll-animacao.js";

const scrollSuave = new ScrollSuave('[data-menu="suave"] a[href^="#"]');
scrollSuave.init();

const accordion = new Accordion('[data-anime="accordion"] dt');
accordion.init();

const tabnav = new TabNav(
  '[data-tab="menu"] li',
  '[data-tab="content"] section'
);
tabnav.init();

initModal();
initTooltip();
initMenuDropdown();
initMenuMobile();
initFuncionamento();
initFetchAnimais();
initFetchBitcoin();
initAnimaScroll();
