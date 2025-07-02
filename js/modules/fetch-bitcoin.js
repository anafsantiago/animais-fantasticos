export default function initFetchBitcoin() {
  const btcPreco = document.querySelector(".btc-preco");

  async function fetchBitcoin(url) {
    try {
      const bitcoinResponse = await fetch(url);
      const bitcoinJson = await bitcoinResponse.json();
      const bitcoinDoar = (1000 / bitcoinJson.BRL.sell).toFixed(4);

      showBitcoin(bitcoinDoar);
    } catch (erro) {
      console.log(Error(erro));
    }
  }

  function showBitcoin(valor) {
    btcPreco.innerText = valor;
  }

  fetchBitcoin("https://blockchain.info/ticker");
}
