import {escolhe, sorteia, colocaDadoNaColuna, placar, tiraDados} from "./operações.js"
let coluna1=[], coluna2=[], coluna3=[], jogador1=[], jogador2=[], jogador3=[];
let placarJogador, placarComputador;

const escolheJogador1 = document.querySelector("#btnjogo1");
const escolheJogador2 = document.querySelector("#btnjogo2");
const escolheJogador3 =  document.querySelector("#btnjogo3");


escolheJogador1.addEventListener("click", colocaDadoNoJogador);
escolheJogador2.addEventListener("click", colocaDadoNoJogador);
escolheJogador3.addEventListener("click", colocaDadoNoJogador);


function rodadaComputador() {
    let dado = sorteia();
    let coluna = escolhe(3);
    let testeColuna = colocaDadoNaColuna(dado, coluna, coluna1, coluna2, coluna3);
    if(testeColuna==0)
        tiraDados(jogador1, dado);
    else if(testeColuna==1)
        tiraDados(jogador2, dado);
    else if(testeColuna==2)
        tiraDados(jogador3, dado)
    else if(testeColuna==3)
        finalizaJogo();
    atualizaPlacar();
}

function atualizaPlacar() {
    placarComputador = placar(coluna1, coluna2, coluna3);
    placarJogador = placar(jogador1, jogador2, jogador3);
}

function finalizaJogo() {
    atualizaPlacar();
    if(placarJogador > placarComputador) {
        //jogador ganha
    }
    else if(placarJogador < placarComputador){
        //computador ganha
    }
    else {
        //empate
    }
}