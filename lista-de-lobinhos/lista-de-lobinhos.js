document.addEventListener("DOMContentLoaded", function() {
    let lobos = JSON.parse(localStorage.getItem("lobos"));

    for (let i = 0; i < 4; i++){
        let foto = document.getElementsByClassName("foto")[i];
        let nome = document.getElementsByClassName("nome")[i];
        let idade = document.getElementsByClassName("idade")[i];
        let descricao = document.getElementsByClassName("desc")[i];

        foto.src = lobos[i].imagem;
        nome.innerText = lobos[i].nome;
        idade.innerText = `Idade: ${lobos[i].idade} anos`;
        descricao.innerText = lobos[i].descricao;
    }
});
