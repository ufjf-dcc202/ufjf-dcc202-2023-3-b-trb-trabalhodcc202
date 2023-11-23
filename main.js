let imagens = [
    "./assets/dado1.png", 
    "./assets/dado2.png",
    "./assets/dado3.png",
    "./assets/dado4.png",
    "./assets/dado5.png",
    "./assets/dado6.png"
];

let dados = document.querySelectorAll(".dado>img"); 

function roll(){
    dados.forEach(function (dd) {
        dd.classList.add("shake");
    });
        setTimeout(function()
            {
                dados.forEach(function(dd){
                    dd.classList.remove("shake");
                });
                let valordd1 = Math.floor (Math.random()*6);
                
                document.querySelector("#dd1").setAttribute("src",imagens[valordd1]);
        },
        1000
        );
};