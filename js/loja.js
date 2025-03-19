const produtosPorPagina = 18;
let   produtos          = [];
let   paginaAtual       = 1;

function carregarProdutos() {

    fetch( 'json/produtos.json' ) 
        .then( response => response.json() )
        .then( dados => {

            produtos = dados;

            renderizarProdutos();
            renderizarPaginacao();
        })
        .catch( error => console.log( "Não foi possivel carregar os produtos" , error ) );
}

function renderizarProdutos() {
    
    const cards = document.querySelector( '.cards-products' );
    cards.innerHTML = '';

    const inicio         = ( paginaAtual - 1 ) * produtosPorPagina;
    const fim            = inicio + produtosPorPagina;
    const produtosPagina = produtos.slice( inicio, fim );

    produtosPagina.forEach( produto => {

        const card = `
            <div class="card">
                <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}">
                <div class="card-body">
                    <h5 class="card-title">${produto.nome}</h5>
                    <p class="card-text">${produto.descricao}</p>
                    <a href="${produto.link}" class="btn btn-primary">Saiba mais</a>
                </div>
            </div>
        `;
        cards.innerHTML += card;
    });
}

function renderizarPaginacao() {

    const totalPaginas = Math.ceil( produtos.length / produtosPorPagina );
    const paginationContainer = document.querySelector( '.pagination' );
    paginationContainer.innerHTML = '';

    for ( let i = 1; i <= totalPaginas; i++ ) {

        const button = document.createElement( "button" );
        button.textContent = i;
        button.classList.add( "btn", "btn-secondary", "m-1" );
        button.onclick = () => mudarPagina( i );
        
        if ( i === paginaAtual ) {
            button.disabled = true;
        }
        paginationContainer.appendChild( button );
    }
}

function mudarPagina( pagina ) {

    paginaAtual = pagina;
    renderizarProdutos();
    renderizarPaginacao();
}

window.onload = carregarProdutos;
