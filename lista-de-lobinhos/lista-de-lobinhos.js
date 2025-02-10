let lobos = JSON.parse(localStorage.getItem("lobos"));

let currentPage = 1;
const itemsPerPage = 4;

// Função para exibir os lobos na página
function renderLobos() {
    let container = document.getElementById("lobos-container");
    container.innerHTML = "";  // Limpa antes de inserir novos

    let start = (currentPage - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let lobosPagina = lobos.slice(start, end);

    lobosPagina.forEach(lobo => {
        let loboDiv = document.createElement("div");
        loboDiv.classList.add("fotoetexto");
        loboDiv.innerHTML = `
            <img src="${lobo.imagem}" alt="${lobo.nome}">
            <div class="descricao">
                <h2>${lobo.nome}</h2>
                <p>Idade: ${lobo.idade} Anos</p>
                <p>${lobo.descricao}</p>
            </div>
        `;
        container.appendChild(loboDiv);
    });

    renderPagination();
}

// Função para criar os botões de página
function renderPagination() {
    let paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    let totalPages = Math.ceil(lobos.length / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        let button = document.createElement("button");
        button.innerText = i;
        button.onclick = function() {
            currentPage = i;
            renderLobos();
        };

        if (i === currentPage) {
            button.style.fontWeight = "bold";
        }

        paginationContainer.appendChild(button);
    }
}

// Inicia o carregamento dos lobos
document.addEventListener("DOMContentLoaded", renderLobos);

