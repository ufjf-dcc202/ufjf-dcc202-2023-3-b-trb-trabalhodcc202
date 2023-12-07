const switchModal = (modalId) => {
    const modal = document.querySelector(`#${modalId}`);
    const atualdisplay = modal.style.display;

    if (atualdisplay === 'block') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'block';
    }
};

const btn1 = document.querySelector('#modalBtn1');
btn1.addEventListener('click', () => switchModal('modal1'));

const modal1 = document.querySelector('#modal1');

const btn2 = document.querySelector('#modalBtn2');
btn2.addEventListener('click', () => switchModal('modal2'));

const modal2 = document.querySelector('#modal2');

window.onclick = function (event) {
    if (event.target === modal1) {
        switchModal('modal1');
    } else if (event.target === modal2) {
        switchModal('modal2');
    }
};