// arrumar de 1 a 3
let dado, colunas;
let coluna1=[], coluna2=[], coluna3=[], jogador1=[], jogador2=[], jogador3=[];
let somatt=0;

function sorteia(){
    dado = (Math.floor(Math.random() * 6)+1);
    return dado;
} 

function escolhe(){
    colunas = (Math.floor(Math.random() * 3));
    return colunas;
}

function colocaDadoNaColuna(){
    let num = escolhe();
    if (num==0 && coluna1.length<3) {
        coluna1.push(dado);
    }
    else if (num==1 && coluna2.length<3){
        coluna2.push(dado);
    }
    else if (num==2 && coluna3.length<3){
        coluna3.push(dado);
    }
    else {}/// sortear dnv coluna
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

export {sorteia, colocaDadoNaColuna, placar, tiraDados}
