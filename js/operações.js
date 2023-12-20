//declara variável dado, que é onde será armazenado o valor que é sorteado no dado
//declara variável colunas, onde será armazenada a coluna escolhida pelo computador
let dado, colunas;

//declara somatt, onde é armazenado a pontuação total dos jogadores
let somatt=0;

//declara vetor, que armazena qual o indice da coluna na função colocaDadoNaColuna
let vetor=[0,1,2];

//a função sorteia armazena um valor de 1 a 6 e armazena no dado
function sorteia(){
    dado = Math.floor(Math.random() * 6) + 1;
    return dado;
} 

//a função escolhe sorteia um valor entre 0 e o tamanho do vetor menos 1 (ss-1), serve para o computador selecionar uma coluna
function escolhe(ss){
    colunas = (Math.floor(Math.random() * ss));
    return vetor[colunas];
}

//recebe o dado sorteado, a coluna clicada, e as colunas do jogador
function colocaDadoNaColunaJog(dadoJogador, colunaEscolha, coluna1, coluna2, coluna3){
    //se escolher uma coluna não cheia, coloca o valor sorteado na coluna e retorna true
    switch(colunaEscolha){
        case 0:
            if(coluna1.length<3){
                coluna1.push(dadoJogador);
                return true;
            }
        case 1:
            if(coluna2.length<3){
                coluna2.push(dadoJogador);
                return true;
            }
        case 2:
            if(coluna3.length<3){
                coluna3.push(dadoJogador);
                return true;
            }
    }
    //se clica em coluna cheia retorna false(nao deixa jogo continuar se clica em coluna cheia)
    return false;
}

//a função verifica fim confere se as colunas passadas nos parâmetros estão preenchidas retorna um falor booleano
function verificaFim(coluna1, coluna2, coluna3){
    return coluna1.length>2 && coluna2.length>2 && coluna3.length>2;
}

//recebe como parâmetro o número do dado, indice de qual é a coluna , e as colunas do respectivo jogador
function colocaDadoNaColuna(dado, x, coluna1, coluna2, coluna3){
    
    //ve se a coluna não ta completa para colocar o valor do dado
    //se nao estiver cheia coloca o dado no vetor e retorna 0, 1,2 (que significa qual coluna foi colocado o dado)
    if (x==vetor[0] && coluna1.length<3) {
        coluna1.push(dado);
        return 0;
    }
    else if (x==vetor[1] && coluna2.length<3){
        coluna2.push(dado);
        return 1;
    }
    else if (x==vetor[2] && coluna3.length<3){
        coluna3.push(dado);
        return 2;
    }
    //se retorna 3, significa que todas as colunas estão cheias
    else if(vetor.length==1){
        return 3;
    }
    //se não encaixa nos outros requisitos a função é chamada recursivamente
    //remove o indice da coluna cheia do vetor, escolhe um novo valor do vetor e chama a função novamente com o novo valor(fizemos isso para não chamar +1x uma mesma coluna cheia)
    else {
        vetor.slice(x, 1);
        x = escolhe (vetor.length);
        return colocaDadoNaColuna(dado, x, coluna1, coluna2, coluna3);
    }
}

//confere se tem números repetidos na mesma coluna(pra dobrar ou triplicar o valor)
//cada elemento do hist representa um lado do dado
//o laço percorre a coluna, pegando os itens em cada posição e somando na respectiva posição no hist (-1 é pq os numeros do dado são de 1 a 6 e os indices do hist é 0-5)
function numRep(colunax){
    const hist = [0,0,0,0,0,0];
    for (let i =0; i<colunax.length;i++){
        hist[colunax[i]-1]++;
    }
        return hist;
}

//calcula soma de cada coluna, recebendo a respectiva coluna como parâmetro
//recebe o hist calculado no numRep
// percorre a coluna multiplicando os elementos dela pelos indices desses números correspondentes no hist
// soma toda essas multiplicações em pontos, que é retornado no final
function somaColuna(colunax){
    let pontos=0;
    const hist= numRep(colunax);
    for (let i =0; i<colunax.length;i++){
        pontos += colunax[i]* hist[colunax[i]-1];
    }
    
    return pontos;
}

//calcula placar total, chamado para o jogador e para o computador
function placar(colunaA, colunaB, colunaC){
    somatt = somaColuna(colunaA) + somaColuna (colunaB) + somaColuna (colunaC);
    return somatt;
}

//recebe a coluna do adversário, o dado que o jogador colocou, qual foi o jogador, a imagem do dado e o índice de qual coluna está o dado
//percorre os indices da coluna do adversário conferindo se existe algum dado igual
//se existe, tiramos aquele numero e chamamos tira imagem para modificar o front
function tiraDados (coluna, dado, pessoa, imagem, indice){
    for(let i=coluna.length-1; i>=0 ;i--){
        if(coluna[i]===dado){
            coluna.splice(i,1);
            tiraImagem(imagem, indice, pessoa);
        }
    }
}


//recebe o vetor das imagens, o valor sorteado e o id(se é do usuário ou computador)
//seleciona o id correspondente e adiciona a classe shake nele por 1 segundo(1000 milisegundos)
// Remove a classe 'shake' após o intervalo de tempo
// Define o atributo 'src' da imagem do dado com base no valor passado (valordd1) e no array de imagens fornecido
function rolaDado(imagens, valordd1, id){
    let dados = document.querySelector(id)
    dados.classList.add("shake");
        setTimeout(function()
            {
                dados.classList.remove("shake");
                dados.setAttribute("src",imagens[valordd1-1]);
        },
        1000
        );
};

//recebe origem da imagem, o indice (coluna da linha) e id da pessoa(adversário)
function tiraImagem(imagem, indice, pessoa){
    //clicado seleciona o filho do id selecionado que seja um botão na posição indice+1 que não tenha o atributo data-livre
    let clicado = document.querySelectorAll(`${pessoa} button:nth-of-type(${indice+1}) div:not([data-livre])`);
    //percorre o vetor clicado, se achar um item com a mesma imagem ele tira a imagem e adiciona o atributo data-livre
    for(let i=0; i<clicado.length;i++){
        if(clicado[i].style.backgroundImage=== `url("${imagem}")`){
            clicado[i].style.backgroundImage = "none";
            clicado[i].setAttribute("data-livre", "");
        }
    }
}



export {escolhe, sorteia, colocaDadoNaColuna,colocaDadoNaColunaJog, placar, tiraDados, verificaFim, somaColuna, rolaDado}
