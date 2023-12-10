import {
  escolhe,
  sorteia,
  colocaDadoNaColuna,
  placar,
  tiraDados,
  colocaDadoNaColunaJog,
  verificaFim,
} from "./operações.js";
let coluna1 = [],
  coluna2 = [],
  coluna3 = [],
  jogador1 = [],
  jogador2 = [],
  jogador3 = [];
let placarJogador, placarComputador, dadoJogador;
dadoJogador = sorteia();

let dados =


console.log("dado jogador sorteia; ", dadoJogador);

const escolheJogador = document.querySelectorAll(".btnjogo");

for (let i = 0; i < escolheJogador.length; i++) {
  escolheJogador[i].addEventListener("click", () => acaoJogador(i));
}

const colocanumeroJog = document.querySelectorAll("#jogador>span");
const colocanumeroIni = document.querySelectorAll("#inimigo>span");

function acaoJogador(colunax) {
  let testeColuna = colocaDadoNaColunaJog(
    dadoJogador,
    colunax,
    jogador1,
    jogador2,
    jogador3
  );
  if (testeColuna) {
    if (colunax == 0) tiraDados(coluna1, dadoJogador);
    else if (colunax == 1) tiraDados(coluna2, dadoJogador);
    else if (colunax == 2) tiraDados(coluna3, dadoJogador);

    atualizaPlacar();
    console.log("jogador: \n ");
    console.log(jogador1, jogador2, jogador3);
    console.log("inimigo: \n ");
    console.log(coluna1, coluna2, coluna3);
    if (verificaFim(jogador1, jogador2, jogador3)) {
      console.log("finnnnnnn");
      return;
    }
    rodadaComputador();
  }
}

function rodadaComputador() {
  let dado = sorteia();
  console.log("dado inimigo: \n", dado);
  let coluna = escolhe(3);
  let testeColuna = colocaDadoNaColuna(dado, coluna, coluna1, coluna2, coluna3);
  if (testeColuna == 0) tiraDados(jogador1, dado);
  else if (testeColuna == 1) tiraDados(jogador2, dado);
  else if (testeColuna == 2) tiraDados(jogador3, dado);
  else if (testeColuna == 3) finalizaJogo();
  atualizaPlacar(); //FIXME:
  dadoJogador = sorteia();
  console.log("dado jogador; ", dadoJogador);
}

function atualizaPlacar() {
  placarComputador = placar(coluna1, coluna2, coluna3);
  placarJogador = placar(jogador1, jogador2, jogador3);
}

function finalizaJogo() {
  atualizaPlacar();
  if (placarJogador > placarComputador) {
    //jogador ganha
  } else if (placarJogador < placarComputador) {
    //computador ganha
  } else {
    //empate
  }
}
