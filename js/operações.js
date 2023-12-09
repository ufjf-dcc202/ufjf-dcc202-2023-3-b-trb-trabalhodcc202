// arrumar de 1 a 3
let dado, colunas;

let somatt=0;

vetor=[0,1,2];

function sorteia(){
    dado = (Math.floor(Math.random() * 6)+1);
    return dado;
} 

function escolhe(ss){
    colunas = (Math.floor(Math.random() * ss));
    return vetor[colunas];
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
        vetor.slice(num, 1);
        num = escolhe (vetor.length);
        colocaDadoNaColuna(num);
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

function tiraDados (colunaAdv, novoDado) {
    const histAdv = numRep(colunaAdv);

    for (let i=0; i<3; i++){
        if (histAdv[novoDado-1] != 0) {
        colunaAdv[i] = 0;
        histAdv[novoDado-1] -= 1;
        }
    }
}


export {escolhe, sorteia, colocaDadoNaColuna, placar, tiraDados}
