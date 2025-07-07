//A ordem de execução dos arquivos importa
//O 1º arquivo a ser carregado é o script.js e, depois, é que os outros são carregados. Os demais são carregados de forma assíncrona, isto é, se um for muito grande, o navegador não espera o arquivo muito grande carregar, de modo que vai carregando os demais, mas, depois, ele executa na ordem indicada no arquivo script.js

//Quando está importando somente uma função, o nome da função não precisa ser o mesmo, mas, como boa prática, geralmente, é. Porém, quando se importa mais de uma, os nomes devem ser exatamente os mesmos

import ScrollSuave from "./modules/scroll-suave.js";
import Accordion from "./modules/accordion.js";
import TabNav from "./modules/tabnav.js";
import Modal from "./modules/modal.js";
import Tooltip from "./modules/tooltip.js";
import initMenuDropdown from "./modules/menu-dropdown.js";
import initMenuMobile from "./modules/menu-mobile.js";
import initFuncionamento from "./modules/funcionamento.js";
import fetchAnimais from "./modules/fetch-animais.js";
import fetchBitcoin from "./modules/fetch-bitcoin.js";
import ScrollAnima from "./modules/scroll-anima.js";

const scrollSuave = new ScrollSuave('[data-menu="suave"] a[href^="#"]');
scrollSuave.init();

const accordion = new Accordion('[data-anime="accordion"] dt');
accordion.init();

const tabnav = new TabNav(
  '[data-tab="menu"] li',
  '[data-tab="content"] section'
);
tabnav.init();

const modal = new Modal(
  '[data-modal="abrir"]',
  '[data-modal="fechar"]',
  '[data-modal="container"]'
);
modal.init();

const tooltip = new Tooltip("[data-tooltip]");
tooltip.init();

const scrollAnima = new ScrollAnima('[data-anime="scroll"]');
scrollAnima.init();

initMenuDropdown();
initMenuMobile();
initFuncionamento();
fetchAnimais("./animaisapi.json", ".numeros-grid");
fetchBitcoin("https://blockchain.info/ticker", ".btc-preco");
