function carregarHome() {
    renderizarCards(manobras);

    const containerCarrossel = document.getElementById('carrossel-itens');
    const containerIndicadores = document.getElementById('carrossel-indicadores');

    if (containerCarrossel && containerIndicadores) {
        const itensDestaque = manobras.filter(m => m.destaque);
        let htmlCarrossel = '';
        let htmlIndicadores = '';

        itensDestaque.forEach((item, index) => {
            const activeClass = index === 0 ? 'active' : '';

            htmlCarrossel += `
                <div class="carousel-item ${activeClass}">
                    <img src="${item.imagem}" class="d-block w-100" alt="${item.nome}" style="height: 450px; object-fit: cover;">
                    <div class="carousel-caption">
                        <div class="bg-dark bg-opacity-75 p-3 rounded">
                            <h2 class="fw-bold text-white text-uppercase mb-1">${item.nome}</h2>
                            <p class="text-light mb-3">${item.descricaoCurta}</p>
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