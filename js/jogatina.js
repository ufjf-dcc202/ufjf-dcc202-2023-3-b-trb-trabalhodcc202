import {
  escolhe,
  sorteia,
  colocaDadoNaColuna,
  placar,
  tiraDados,
  colocaDadoNaColunaJog,
  verificaFim,
  somaColuna,
  rolaDado,
} from "./operações.js";

let imagens = [
  "./assets/dado1.png",
  "./assets/dado2.png",
  "./assets/dado3.png",
  "./assets/dado4.png",
  "./assets/dado5.png",
  "./assets/dado6.png",
];

let coluna1 = [],
  coluna2 = [],
  coluna3 = [],
  jogador1 = [],
  jogador2 = [],
  jogador3 = [];



let placarJogador, placarComputador, dadoJogador;
dadoJogador = sorteia(); // 1. manda sortear um dado para o jogador

console.log("dado jogador sorteia; ", dadoJogador);

const escolheJogador = document.querySelectorAll(".btnjogo");
for (let i = 0; i < escolheJogador.length; i++) {
  escolheJogador[i].addEventListener("click", () => acaoJogador(i));
}

const colocanumeroJog = document.querySelectorAll("#jogador span");
const colocanumeroIni = document.querySelectorAll("#inimigo span");

function placarColunas() {
  colocanumeroJog[0].textContent = somaColuna(jogador1);
  colocanumeroJog[1].textContent = somaColuna(jogador2);
  colocanumeroJog[2].textContent = somaColuna(jogador3);
  colocanumeroIni[0].textContent = somaColuna(coluna1);
  colocanumeroIni[1].textContent = somaColuna(coluna2);
  colocanumeroIni[2].textContent = somaColuna(coluna3);
}

function iniciar(id, dado) {
  console.log("dado jogador: ", dado);
  rolaDado(imagens, dado, id);
}

iniciar("#dd1", dadoJogador);

function acaoJogador(colunax) {
  let testeColuna = colocaDadoNaColunaJog(
    dadoJogador,
    colunax,
    jogador1,
    jogador2,
    jogador3
  );
  colocaImagem(imagens[dadoJogador - 1], colunax, "#jogador");
  if (testeColuna) {
    if (colunax == 0)
      tiraDados(coluna1, dadoJogador, "#jogador", imagens[dadoJogador - 1]);
    else if (colunax == 1)
      tiraDados(coluna2, dadoJogador, "#jogador", imagens[dadoJogador - 1]);
    else if (colunax == 2)
      tiraDados(coluna3, dadoJogador, "#jogador", imagens[dadoJogador - 1]);

    atualizaPlacar();
    console.log("jogador: \n ");
    console.log(jogador1, jogador2, jogador3);
    console.log("inimigo: \n ");
    console.log(coluna1, coluna2, coluna3);
    if (verificaFim(jogador1, jogador2, jogador3)) {
      console.log("finnnnnnn");
      return;
    }
    setTimeout(rodadaComputador, 1000);
  }
}

function rodadaComputador() {
  const dado = sorteia();
  iniciar("#dd2", dado);
  let coluna = escolhe(3);
  let testeColuna = colocaDadoNaColuna(dado, coluna, coluna1, coluna2, coluna3);
  if (testeColuna == 0)
    tiraDados(jogador1, dado, "#inimigo", imagens[dado - 1]);
  else if (testeColuna == 1)
    tiraDados(jogador2, dado, "#inimigo", imagens[dado - 1]);
  else if (testeColuna == 2)
    tiraDados(jogador3, dado, "#inimigo", imagens[dado - 1]);
  else if (testeColuna == 3) finalizaJogo();
  atualizaPlacar();
  colocaImagem(imagens[dado - 1], coluna, "#inimigo");

  dadoJogador = sorteia();
  iniciar("#dd1", dadoJogador);
}

function atualizaPlacar() {
  placarComputador = placar(coluna1, coluna2, coluna3);
  placarJogador = placar(jogador1, jogador2, jogador3);
  placarColunas();
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

function colocaImagem(imagem, coluna, pessoa) {
  let clicado = document.querySelectorAll(
    `${pessoa} button:nth-of-type(${coluna + 1}) div[data-livre]`
  );
  clicado[0].style.backgroundImage = `url("${imagem}")`;
  clicado[0].removeAttribute("data-livre");
}


