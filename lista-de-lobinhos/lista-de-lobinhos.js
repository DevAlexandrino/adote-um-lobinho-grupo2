document.addEventListener("DOMContentLoaded", function() {
    let lobos = JSON.parse(localStorage.getItem("lobos")) || [];
    let currentPage = 1;
    const itemsPerPage = 4;
    
    let lobosNaoAdotados = lobos.filter(lobo => !lobo.adotado);
    let lobosAdotados = lobos.filter(lobo => lobo.adotado);

    const paginationContainer = document.getElementById("pagination");
    const checkbox = document.getElementById("veradotados");

    function renderLobos() {
        let exibidos = checkbox.checked ? lobosAdotados : lobosNaoAdotados;
        let startIndex = (currentPage - 1) * itemsPerPage;
        let paginatedLobos = exibidos.slice(startIndex, startIndex + itemsPerPage);

        let loboElements = document.querySelectorAll(".lobo");
        loboElements.forEach((lobo, index) => {
            if (paginatedLobos[index]) {
                let foto = lobo.querySelector(".foto");
                let nome = lobo.querySelector(".nome");
                let idade = lobo.querySelector(".idade");
                let descricao = lobo.querySelector(".desc");
                let botao = lobo.querySelector(".botaoadotar");

                foto.src = paginatedLobos[index].imagem;
                nome.innerText = paginatedLobos[index].nome;
                idade.innerText = `Idade: ${paginatedLobos[index].idade} anos`;
                descricao.innerText = paginatedLobos[index].descricao;

                if (paginatedLobos[index].adotado) {
                    botao.innerText = "Adotado";
                    botao.style.backgroundColor = "green";
                    botao.style.cursor = "default";
                    botao.disabled = true;  // Desativa o botão
                } else {
                    botao.innerText = "Adotar";
                    botao.style.backgroundColor = ""; // Restaura o estilo original
                    botao.style.cursor = "pointer";
                    botao.disabled = false;
                }

                lobo.style.display = "block"; // Mostrar lobo
            } else {
                lobo.style.display = "none"; // Esconder lobo vazio
            }
        });

        renderPagination(exibidos.length);
    }

    function renderPagination(totalItems) {
        paginationContainer.innerHTML = "";
        let totalPages = Math.ceil(totalItems / itemsPerPage);
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        // Botão "<<"
        const prev = document.createElement("button");
        prev.innerText = "<<";
        prev.disabled = currentPage === 1;
        prev.addEventListener("click", () => changePage(currentPage - 1));
        paginationContainer.appendChild(prev);

        // Números da paginação
        for (let i = startPage; i <= endPage; i++) {
            const pageButton = document.createElement("button");
            pageButton.innerText = i;
            if (i === currentPage) {
                pageButton.classList.add("active");
                pageButton.style.backgroundColor = "orange";
            }
            pageButton.addEventListener("click", () => changePage(i));
            paginationContainer.appendChild(pageButton);
        }

        // Botão ">>"
        const next = document.createElement("button");
        next.innerText = ">>";
        next.disabled = currentPage >= totalPages;
        next.addEventListener("click", () => changePage(currentPage + 1));
        paginationContainer.appendChild(next);
    }

    function changePage(newPage) {
        let totalItems = checkbox.checked ? lobosAdotados.length : lobosNaoAdotados.length;
        let totalPages = Math.ceil(totalItems / itemsPerPage);

        if (newPage < 1 || newPage > totalPages) return;
        currentPage = newPage;
        renderLobos();
    }

    checkbox.addEventListener("change", function() {
        currentPage = 1;
        renderLobos();
    });

    renderLobos();
});
