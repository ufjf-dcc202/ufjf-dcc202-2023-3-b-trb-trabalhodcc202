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

//array com as imagens dos dados
let imagens = [
  "./assets/dado1.png",
  "./assets/dado2.png",
  "./assets/dado3.png",
  "./assets/dado4.png",
  "./assets/dado5.png",
  "./assets/dado6.png",
];

//declara colunas (onde vao ser armazenados os valores dos dados do usuario / comp)
let coluna1 = [],
  coluna2 = [],
  coluna3 = [],
  jogador1 = [],
  jogador2 = [],
  jogador3 = [];


//declara placarJogador(armazena placar total do jogador)
//declara placarComputador(armazena placar total do computador)
//declara dadoJogador(armazena valor sorteado pelo jogador)
let placarJogador, placarComputador, dadoJogador;


dadoJogador = sorteia(); // 1. manda sortear um dado para o jogador

console.log("dado jogador sorteia; ", dadoJogador);

//cria array escolheJogador com os botões possiveis para o jogador clicar
const escolheJogador = document.querySelectorAll(".btnjogo");

//percorre a escolheJogador para descobrir qual coluna foi clicada
for (let i = 0; i < escolheJogador.length; i++) {
  escolheJogador[i].addEventListener("click", () => acaoJogador(i));
}

//seleciona os spans nas colunas do jogador e do inimigo para colocar os placares em seguida
const colocanumeroJog = document.querySelectorAll("#jogador span");
const colocanumeroIni = document.querySelectorAll("#inimigo span");

//seleciona os placares totais para colocar a pontuação completa em seguida
const placarzao= document.querySelectorAll(".placar span");

//coloca a soma de cada coluna nos spans
function placarColunas() {
  colocanumeroJog[0].textContent = somaColuna(jogador1);
  colocanumeroJog[1].textContent = somaColuna(jogador2);
  colocanumeroJog[2].textContent = somaColuna(jogador3);
  colocanumeroIni[0].textContent = somaColuna(coluna1);
  colocanumeroIni[1].textContent = somaColuna(coluna2);
  colocanumeroIni[2].textContent = somaColuna(coluna3);
}

//atualiza placar total placarzao
function atualizaPlacar() {
  placarComputador = placar(coluna1, coluna2, coluna3);
  placarzao[1].textContent = placarComputador;
  placarJogador = placar(jogador1, jogador2, jogador3);
  placarzao[0].textContent =  placarJogador;
  placarColunas();
}

//parametros: id do jogador atual e o dado sorteado
//chama rola dado para o dado sorteado, função usada no inicio de cada rodada(do jogador e do computador) 
function iniciar(id, dado) {
  rolaDado(imagens, dado, id);
}

//recebe como parâmetro a origem da imagem desejada no vetor imagens, a coluna que vai colocar e a pessoa(id do jogador ou do computador)
function colocaImagem(imagem, coluna, pessoa) {
  //clicado seleciona o filho do id selecionado que seja um botão na posição coluna+1 que tenha o atributo data-livre
  let clicado = document.querySelectorAll(
    `${pessoa} button:nth-of-type(${coluna + 1}) div[data-livre]`
    );
    
    //coloca na primeira posição disponivel a imagem e remove o atributo data-livre
    clicado[0].style.backgroundImage = `url("${imagem}")`;
    clicado[0].removeAttribute("data-livre");
  }
  
  //começa o jogo aqui com o valor sorteado no inicio da jogatina
  iniciar("#dd1", dadoJogador);
  
  //rodada do jogador, recebe como parâmetro a coluna clicada, ela se inicia TODA VEZ QUE O JOGADOR CLICA NUMA COLUNA
function acaoJogador(colunax) {
  //chama teste coluna para ver se pode colocar dado na coluna que clicou
  let testeColuna = colocaDadoNaColunaJog(
    dadoJogador,
    colunax,
    jogador1,
    jogador2,
    jogador3
  );

  //chama coloca imagem para colocar a imagem do dado na coluna desejada
  colocaImagem(imagens[dadoJogador - 1], colunax, "#jogador");
  //se o colocaDadoNaColuna da true ele ve qual coluna o dado foi colocado e chama o tiraDados para o caso de ter um mesmo dado na mesma coluna do inimigo
  if (testeColuna) {
    if (colunax == 0)
      tiraDados(coluna1, dadoJogador, "#inimigo", imagens[dadoJogador - 1], colunax);
    else if (colunax == 1)
      tiraDados(coluna2, dadoJogador, "#inimigo", imagens[dadoJogador - 1], colunax);
    else if (colunax == 2)
      tiraDados(coluna3, dadoJogador, "#inimigo", imagens[dadoJogador - 1], colunax);

    //atualiza o placar
    atualizaPlacar();

    //verifica se o tabuleiro do jogador ta cheio, se sim, acaba o jogo
    if (verificaFim(jogador1, jogador2, jogador3)) {
      finalizaJogo();
      return;
    }
    //da um tempo entre a rodada do jogador e do computador
    setTimeout(rodadaComputador, 1000);
  }
}

//inicia a rodada do computador
function rodadaComputador() {
  //sorteia um dado
  const dado = sorteia();

  //inicia o dado do computador
  iniciar("#dd2", dado);

  //faz o computador escolher uma das colunas
  let coluna = escolhe(3);

  //chama colocaDadoNaColuna para colocar o dado em uma coluna disponivel
  let testeColuna = colocaDadoNaColuna(dado, coluna, coluna1, coluna2, coluna3);
  
  //de acordo com o retorno do colocaDadoNaColuna ele verifica se tem dados iguais na coluna do adversário, se tiver ele chama o tiraDados para retirá-los
  if (testeColuna == 0)
    tiraDados(jogador1, dado, "#jogador", imagens[dado - 1], testeColuna);
  else if (testeColuna == 1)
    tiraDados(jogador2, dado, "#jogador", imagens[dado - 1], testeColuna);
  else if (testeColuna == 2)
    tiraDados(jogador3, dado, "#jogador", imagens[dado - 1], testeColuna);

  //coloca a imagem do dado no tabuleiro
  colocaImagem(imagens[dado - 1], testeColuna, "#inimigo");

  //verifica se o tabuleiro do computador ta cheio, se tiver finaliza jogo e sai da função
  if(verificaFim(coluna1, coluna2, coluna3)) {
    finalizaJogo();
    return;
  }
  //atualiza o placar
  atualizaPlacar();
  
  //sorteia um novo dado para o jogador e o anima
  dadoJogador = sorteia();
  iniciar("#dd1", dadoJogador);
}


function finalizaJogo() {
  //atualiza placar
  atualizaPlacar();

  //dependendo de quem venceu abre um modal diferente
  if (placarJogador > placarComputador) {

    let final = document.querySelector("#modalVitoria");
    const colocaPlacar = final.querySelectorAll("span");

    final.style.display = 'block';
    colocaPlacar[0].textContent = placarJogador;
    colocaPlacar[1].textContent = placarComputador;

  } else if (placarJogador < placarComputador) {

    let final = document.querySelector("#modalDerrota");
    const colocaPlacar = final.querySelectorAll("span");

    final.style.display = 'block';
    colocaPlacar[0].textContent = placarJogador;
    colocaPlacar[1].textContent = placarComputador;

  } else {

    let final = document.querySelector("#modalEmpate");
    const colocaPlacar = final.querySelectorAll("span");

    final.style.display = 'block';
    colocaPlacar.textContent = placarJogador;
  }

}




