async function buscarUsuario(login, senha) {
    const resposta = await fetch(`/usuarios`);
    const usuarios = await resposta.json();

    return usuarios;
}

const formulario = document.getElementById('formLogin');

formulario.addEventListener('submit', async function(evento) {
    evento.preventDefault();

    const loginDigitado = document.getElementById('loginUsuario').value;
    const senhaDigitada = document.getElementById('senhaUsuario').value;
    const todosUsuarios = await buscarUsuario();
    const resultado = todosUsuarios.filter(u => u.login === loginDigitado && u.senha === senhaDigitada);

    if (resultado.length > 0) {
        const usuario = resultado[0];
        
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));

        exibirNotificacao(`Bem-vindo, ${usuario.nome}!`, 'success');

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } else {
        exibirNotificacao('Usuário ou senha incorretos.', 'danger');
    }
});

const cadastro = document.getElementById('formCadastro');

cadastro.addEventListener('submit', async function(evento) {
    evento.preventDefault();
    
    const nomeNovo = document.getElementById('cadNome').value;
    const loginNovo = document.getElementById('cadLogin').value;
    const senhaNova = document.getElementById('cadSenha').value;
    const emailNovo = document.getElementById('cadEmail').value;

    const novoUsuario = {
        id: crypto.randomUUID(),
        login: loginNovo,
        senha: senhaNova,
        nome: nomeNovo,
        email: emailNovo,
        admin: false
    };

    try {
        const resposta = await fetch('/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoUsuario)
        });

        if (resposta.ok) {
            exibirNotificacao('Cadastro realizado com sucesso! Agora você já pode fazer o login.', 'success');
            cadastro.reset();

            document.getElementById('formCadastro').classList.add('d-none');
            document.getElementById('formLogin').classList.remove('d-none');
        } else {
            exibirNotificacao('Erro ao realizar o cadastro.', 'danger');
        }
    } catch (erro) {
        console.error('Erro no cadastro:', erro);
    }
});

const btnIrParaCadastro = document.getElementById('btnIrParaCadastro');

btnIrParaCadastro.addEventListener('click', function(evento){
    evento.preventDefault();
    document.getElementById('formLogin').classList.add('d-none');
    document.getElementById('formCadastro').classList.remove('d-none');
});

const btnIrParaLogin = document.getElementById('btnIrParaLogin');

btnIrParaLogin.addEventListener('click', function(evento){
    evento.preventDefault();
    document.getElementById('formCadastro').classList.add('d-none');
    document.getElementById('formLogin').classList.remove('d-none');
});

function exibirNotificacao(mensagem, tipo = 'success') {
    const toastElemento = document.getElementById('toastMensagem');
    const toastCorpo = document.getElementById('toastCorpo');

    toastCorpo.textContent = mensagem;
    toastElemento.className = `toast align-items-center text-white border-0 bg-${tipo}`;

    const toast = new bootstrap.Toast(toastElemento, { delay: 3000 });
    toast.show();
}