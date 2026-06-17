const API_URL = '/manobras';
let manobras = [];

async function inicializar() {
    try {
        const resposta = await fetch(API_URL);
        if (!resposta.ok) throw new Error();
        
        manobras = await resposta.json();

        carregarHome();
        carregarDetalhes();
        configurarFiltro();
    } catch (erro) {
        console.error(erro);
    }
}

function carregarHome() {
    renderizarCards(manobras);

    const containerCarrossel = document.getElementById('carrossel-itens');
    const containerIndicadores = document.getElementById('carrossel-indicadores');

    if (containerCarrossel && containerIndicadores) {
        const itensDestaque = manobras.filter(m => m.destaque);
        let htmlCarrossel = "";
        let htmlIndicadores = "";
        
        itensDestaque.forEach((item, index) => {
            const activeClass = index === 0 ? "active" : "";
            
            htmlCarrossel += `
                <div class="carousel-item ${activeClass}">
                    <img src="${item.imagem}" class="d-block w-100" alt="${item.nome}">
                    <div class="carousel-caption">
                        <div class="bg-dark bg-opacity-75 caixa-texto-slide">
                            <h2 class="fw-bold text-white text-uppercase mb-1">${item.nome}</h2>
                            <p class="text-light mb-3">${item.descricao}</p>
                            <a href="detalhes.html?id=${item.id}" class="btn btn-light btn-sm fw-bold px-3">Ver detalhes</a>
                        </div>
                    </div>
                </div>
            `;

            htmlIndicadores += `
                <button type="button" data-bs-target="#carouselDestaques" data-bs-slide-to="${index}" class="${activeClass}" aria-current="${index === 0 ? 'true' : 'false'}" aria-label="Slide ${index + 1}"></button>
            `;
        });
        
        containerCarrossel.innerHTML = htmlCarrossel;
        containerIndicadores.innerHTML = htmlIndicadores;
    }
}

function carregarDetalhes() {
    const urlParams = new URLSearchParams(window.location.search);
    const idDaManobra = urlParams.get('id');
    const container = document.getElementById('detalhe-manobra');

    if (!container || !idDaManobra) return;

    const manobra = manobras.find(m => String(m.id) === String(idDaManobra));

    if (manobra) {
        let htmlFotos = "";
        manobra.fotos_vinculadas.forEach(foto => {
            htmlFotos += `
                <div class="col-6 col-md-4 mb-3">
                    <div class="card bg-dark text-white border-secondary h-100">
                        <img src="${foto.url}" class="card-img-top" style="height: 150px; object-fit: cover;" alt="${foto.titulo}">
                        <div class="card-body p-2 text-center">
                            <p class="card-text small fw-semibold mb-0">${foto.titulo}</p>
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = `
            <div class="row align-items-center text-light">
                <div class="col-md-6">
                    <img src="${manobra.imagem}" class="img-fluid" alt="${manobra.nome}">
                </div>
                <div class="col-md-6">
                    <h1 class="display-4 fw-bold">${manobra.nome}</h1>
                    <span class="badge bg-danger mb-3 p-2">${manobra.categoria}</span>
                    <p class="lead mt-3">${manobra.descricao}</p>
                    <hr class="bg-light">
                    
                    <p class="mb-2"><strong>Base recomendada:</strong> ${manobra.base}</p>
                    <h5 class="fw-bold mt-3">Tutorial:</h5>
                    <p>${manobra.conteudo}</p>
                    <div class="bg-secondary-subtle text-dark p-1 rounded mt-2 text-center">
                        <p class="small mt-2">💡 <strong>Dica:</strong> ${manobra.dica_mestre}</p>
                    </div>
                    
                    <a href="index.html" class="btn btn-light mt-3">Voltar para Home</a>
                </div>
            </div>

            <div class="mt-5 pt-4 border-top border-secondary">
                <div class="row">
                    ${htmlFotos || "<p class='text-secondary'>Nenhuma foto adicional disponível.</p>"}
                </div>
            </div>
        `;
    } else {
        container.innerHTML = "<h2 class='text-white text-center'>Manobra não encontrada!</h2>";
    }
}

function renderizarCards(listaDeManobras) {
    const container = document.getElementById('container-manobras');
    if (!container) return;

    let htmlCards = "";
    listaDeManobras.forEach(item => {
        htmlCards += `
            <div class="col-12 col-sm-6 col-lg-4 d-flex justify-content-center">
                <div class="card h-100 w-100">
                    <img src="${item.imagem}" alt="${item.nome}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="fw-bold mb-3">${item.nome}</h5>
                        <p class="tag fw-semibold">${item.categoria}</p>
                        <br>
                        <a href="detalhes.html?id=${item.id}" class="btn btn-outline-light btn-sm mt-2">Ver detalhes</a>
                    </div>
                </div>
            </div>
        `;   
    });

    if (listaDeManobras.length === 0) {
        container.innerHTML = "<p class='text-secondary text-center mt-4'>Nenhuma manobra encontrada nesta categoria.</p>";
    } else {
        container.innerHTML = htmlCards;
    }
}

function configurarFiltro() {
    const selectFiltro = document.getElementById('filtro-categoria');
    if (selectFiltro) {
        selectFiltro.addEventListener('change', (evento) => {
            const categoriaSelecionada = evento.target.value;

            if (categoriaSelecionada === "Todos") {
                renderizarCards(manobras);
            } else {
                const manobrasFiltradas = manobras.filter(m => m.categoria === categoriaSelecionada);
                renderizarCards(manobrasFiltradas);
            }
        });
    }
}

inicializar();