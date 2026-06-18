let bancoEquipamentos = [];

const catalogo = document.getElementById('catalogo-wrapper');
const pegboard = document.getElementById('pegboard-container');
const btnLimpar = document.getElementById('btnLimparPainel');
const botoesFiltro = document.querySelectorAll('.btn-filtro');
const formEquipamento = document.getElementById('formNovoEquipamento');
const BASE_PX = 28;

function normalizarCategoria(cat) {
    let categoria = cat.toLowerCase();
    
    if (categoria === 'rolamentos') {
        return 'rolamento';
    }
    if (categoria === 'trucks') {
        return 'truck';
    }
    
    return categoria;
}

function ativarDrag(elemento) {
    elemento.addEventListener('mousedown', function(evento) {
        evento.preventDefault();
        
        const startX = evento.clientX;
        const startY = evento.clientY;
        
        let origLeft = parseInt(elemento.style.left);
        let origTop = parseInt(elemento.style.top);
        if (isNaN(origLeft)) { origLeft = 0; }
        if (isNaN(origTop)) { origTop = 0; }

        function quandoMover(eventoMover) {
            const mudancaX = eventoMover.clientX - startX;
            const mudancaY = eventoMover.clientY - startY;
            
            elemento.style.left = (origLeft + mudancaX) + 'px';
            elemento.style.top = (origTop + mudancaY) + 'px';
        }

        function quandoSoltar() {
            document.removeEventListener('mousemove', quandoMover);
            document.removeEventListener('mouseup', quandoSoltar);
        }

        document.addEventListener('mousemove', quandoMover);
        document.addEventListener('mouseup', quandoSoltar);
    });

    elemento.addEventListener('dblclick', function() {
        elemento.remove();
    });
}

async function carregarEquipamentosDoServidor() {
    try {
        const resposta = await fetch('/equipamentos');
        bancoEquipamentos = await resposta.json();
        renderizarCatalogo('todos');
    } catch (erro) {
        console.error('Erro ao buscar equipamentos do banco:', erro);
    }
}

function renderizarCatalogo(categoriaFiltrada) {
    catalogo.innerHTML = '';

    let filtrados = [];
    if (categoriaFiltrada === 'todos') {
        filtrados = bancoEquipamentos;
    } else {
        filtrados = bancoEquipamentos.filter(function(item) {
            const categoriaDoItem = normalizarCategoria(item.categoria);
            return categoriaDoItem === categoriaFiltrada;
        });
    }

    filtrados.forEach(function(item) {
        const img = document.createElement('img');
        img.src = item.img;
        img.alt = item.nome;
        img.title = item.nome;
        img.className = 'img-thumbnail bg-secondary border-0';
        img.style.width = 'calc(50% - 4px)';
        img.style.height = '120px';
        img.style.cursor = 'pointer';
        img.style.objectFit = 'contain';

        img.addEventListener('click', function() {
            adicionarAoPegboard(item);
        });
        
        catalogo.appendChild(img);
    });
}

function adicionarAoPegboard(item) {
    const cat = normalizarCategoria(item.categoria);
    
    let fator = 2;
    if (cat === 'shape') { fator = 12; }
    else if (cat === 'truck') { fator = 6; }
    else if (cat === 'rolamento') { fator = 3; }
    else if (cat === 'rodas') { fator = 5; }

    const larguraFinal = BASE_PX * fator;
    const el = document.createElement('img');
    el.src = item.img;
    el.alt = item.nome;
    el.className = 'pegboard-item position-absolute';
    el.dataset.categoria = cat;
    el.style.width = larguraFinal + 'px';

    const tamanhoDoQuadro = pegboard.getBoundingClientRect();
    const xAleatorio = Math.random() * (tamanhoDoQuadro.width - larguraFinal);
    const yAleatorio = Math.random() * (tamanhoDoQuadro.height - (larguraFinal * 1.5));

    el.style.left = Math.max(0, xAleatorio) + 'px';
    el.style.top = Math.max(0, yAleatorio) + 'px';

    ativarDrag(el);
    pegboard.appendChild(el);
}

botoesFiltro.forEach(function(botao) {
    botao.addEventListener('click', function() {
        botoesFiltro.forEach(function(b) {
            b.classList.remove('active', 'btn-danger');
            b.classList.add('btn-outline-light');
        });
        
        botao.classList.remove('btn-outline-light');
        botao.classList.add('active', 'btn-danger');

        let catDoBotao = botao.getAttribute('data-categoria');
        if (catDoBotao === null || catDoBotao === '') {
            catDoBotao = 'todos';
        } else {
            catDoBotao = normalizarCategoria(catDoBotao);
        }

        renderizarCatalogo(catDoBotao);
    });
});

formEquipamento.addEventListener('submit', async function(evento) {
    evento.preventDefault();

    const nomeInput = document.getElementById('novoNome').value;
    const categoriaInput = document.getElementById('novaCategoria').value;
    const imgInput = document.getElementById('novaImg').value;

    const novoItem = {
        nome: nomeInput,
        categoria: categoriaInput,
        img: imgInput
    };

    try {
        const resposta = await fetch('/equipamentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoItem)
        });

        if (resposta.ok) {
            formEquipamento.reset();
            
            const elementoModal = document.getElementById('modalNovoEquipamento');
            const instanciaModal = bootstrap.Modal.getInstance(elementoModal);
            instanciaModal.hide();

            carregarEquipamentosDoServidor();
        }
    } catch (erro) {
        console.error('Erro ao salvar equipamento:', erro);
    }
});

btnLimpar.addEventListener('click', function() {
    pegboard.innerHTML = '';
});

carregarEquipamentosDoServidor();