
//função que quando é chamada muda de block pra none e vice versa
const switchModal = (modalId) => {
    const modal = document.querySelector(`#${modalId}`);
    const atualdisplay = modal.style.display;

    if (atualdisplay === 'block') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'block';
    }
};

//seleciona os itens com as respectivas ids
const btn1 = document.querySelector('#modalBtn1');
const btn2 = document.querySelector('#modalBtn2');

//seleciona os modais com os respectivos ids
const modal1 = document.querySelector('#modal1');
const modal2 = document.querySelector('#modal2');

//quando clica chama função de retorno switchModal para os devidos parâmetros
btn1.addEventListener('click', () => switchModal('modal1'));
btn2.addEventListener('click', () => switchModal('modal2'));


// Adiciona um ouvinte de evento de clique à janela para fechar o modal ao clicar fora dele
window.onclick = function (event) {
    if (event.target === modal1) {
        switchModal('modal1');
    } else if (event.target === modal2) {
        switchModal('modal2');
    }
};