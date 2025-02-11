export let currentPage = 1; // Variável global

export function changePage(newPage) {
    currentPage = newPage;
    renderPagination();
}

// Função que renderiza a paginação
function renderPagination() {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    const prev = document.createElement("button");
    prev.innerText = "«";
    prev.disabled = currentPage === 1;
    prev.addEventListener("click", () => changePage(currentPage - 1));
    paginationContainer.appendChild(prev);

    let startPage, endPage;
    if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
    } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
    }

    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement("button");
        pageButton.innerText = i;
        if (i === currentPage) {
            pageButton.style.backgroundColor = "orange";
        }
        pageButton.addEventListener("click", () => changePage(i));
        paginationContainer.appendChild(pageButton);
    }

    const next = document.createElement("button");
    next.innerText = "»";
    next.addEventListener("click", () => changePage(currentPage + 1));
    paginationContainer.appendChild(next);
}

// Inicia a paginação
document.addEventListener("DOMContentLoaded", renderPagination);
