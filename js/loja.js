const produtosPorPagina = 18;
let produtos = [];
let produtosFiltrados = [];
let paginaAtual = 1;

document.addEventListener("DOMContentLoaded", () => {
    carregarProdutos();

    const searchInput = document.querySelector("#search-input");
    const searchButton = document.querySelector("#search-btn");

    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            filtrarProdutos();
        }
    });

    searchButton.addEventListener("click", () => {
        event.preventDefault();
        filtrarProdutos();
    });


    searchInput.addEventListener("input", () => {
        if (searchInput.value.trim() === "") {
            resetarPesquisa();
        }
    });
});

function carregarProdutos() {
    fetch('json/produtos.json')
        .then(response => response.json())
        .then(dados => {
            produtos = dados;
            produtosFiltrados = [...produtos];
            paginaAtual = 1;
            atualizarInterface();
        })
        .catch(error => console.error("Erro ao carregar os produtos:", error));
}

function atualizarInterface() {
    renderizarProdutos();
    renderizarPaginacao();
    iniciarLazyLoad();
}

function renderizarProdutos() {
    const cards = document.querySelector('.cards-products');
    cards.innerHTML = '';

    if (produtosFiltrados.length === 0) {
        cards.innerHTML = "<p class='text-center'>Nenhum produto encontrado.</p>";
        return;
    }

    const inicio = (paginaAtual - 1) * produtosPorPagina;
    const fim = inicio + produtosPorPagina;
    const produtosPagina = produtosFiltrados.slice(inicio, fim);

    produtosPagina.forEach(produto => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img data-src="${produto.imagem}" class="card-img-top img-lazy" alt="${produto.nome}">
            <div class="card-body">
                <h5 class="card-title">${produto.nome}</h5>
                <p class="card-text">${produto.descricao}</p>
                <a href="${produto.link}" class="btn btn-primary">Saiba mais</a>
            </div>
        `;
        cards.appendChild(card);
    });

    iniciarLazyLoad();
}

function renderizarPaginacao() {
    const totalPaginas = Math.ceil(produtosFiltrados.length / produtosPorPagina);
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = '';

    if (totalPaginas <= 1) return;

    for (let i = 1; i <= totalPaginas; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.classList.add("btn", "btn-secondary", "m-1");
        button.onclick = () => {
            paginaAtual = i;
            atualizarInterface();
        };

        if (i === paginaAtual) {
            button.disabled = true;
        }
        paginationContainer.appendChild(button);
    }
}

function iniciarLazyLoad() {
    const imagens = document.querySelectorAll(".img-lazy");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove("img-lazy");
                observer.unobserve(img);
            }
        });
    });

    imagens.forEach(img => observer.observe(img));
}

function filtrarProdutos() {
    const termo = document.querySelector("#search-input").value.trim().toLowerCase();

    produtosFiltrados = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(termo) ||
        produto.descricao.toLowerCase().includes(termo)
    );

    paginaAtual = 1;
    atualizarInterface();
}

function resetarPesquisa() {
    produtosFiltrados = [...produtos];
    paginaAtual = 1;
    atualizarInterface();
}
