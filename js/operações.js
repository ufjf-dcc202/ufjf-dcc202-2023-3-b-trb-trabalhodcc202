// arrumar de 1 a 3
let dado, colunas;

let somatt=0;

let vetor=[0,1,2];

function sorteia(){
    dado = Math.floor(Math.random() * 6) + 1;
    return dado;
} 

function escolhe(ss){
    colunas = (Math.floor(Math.random() * ss));
    return vetor[colunas];
}

function colocaDadoNaColunaJog(dadoJogador, colunaEscolha, coluna1, coluna2, coluna3){
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
    return false;
}

function verificaFim(coluna1, coluna2, coluna3){
    return coluna1.length>2 && coluna2.length>2 && coluna3.length>2;
}

function colocaDadoNaColuna(dado, x, coluna1, coluna2, coluna3){
    
    if(vetor.length==0){
        return 3;/// falta criar
    }
    else if (x==vetor[0] && coluna1.length<3) {
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
    else {
        vetor.slice(x, 1);
        x = escolhe (vetor.length);
        return colocaDadoNaColuna(dado, x, coluna1, coluna2, coluna3);
    }
}

function numRep(colunax){
    const hist = [0,0,0,0,0,0];
    for (let i =0; i<colunax.length;i++){
        hist[colunax[i]-1]++;
    }
        return hist;
}

function somaColuna(colunax){
    let pontos=0;
    const hist= numRep(colunax);
    for (let i =0; i<colunax.length;i++){
        pontos += colunax[i]* hist[colunax[i]-1];
    }
    
    return pontos;
}

function placar(colunaA, colunaB, colunaC){
    somatt = somaColuna(colunaA) + somaColuna (colunaB) + somaColuna (colunaC);
    return somatt;
}

function tiraDados (coluna, dado, pessoa, imagem, indice){
    for(let i=coluna.length-1; i>=0 ;i--){
        if(coluna[i]===dado){
            coluna.splice(i,1);
            tiraImagem(imagem, indice, pessoa);
        }
    }
}


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

function tiraImagem(imagem, indice, pessoa){
    let clicado = document.querySelectorAll(`${pessoa} button:nth-of-type(${indice+1}) div:not([data-livre])`);
    for(let i=0; i<clicado.length;i++){
        if(clicado[i].style.backgroundImage=== `url("${imagem}")`){
            clicado[i].style.backgroundImage = "none";
            clicado[i].setAttribute("data-livre", "");
        }
    }
}



export {escolhe, sorteia, colocaDadoNaColuna,colocaDadoNaColunaJog, placar, tiraDados, verificaFim, somaColuna, rolaDado}
