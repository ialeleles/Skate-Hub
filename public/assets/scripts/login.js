async function buscarUsuario(login, senha) {
    const resposta = await fetch(`/usuarios?login=${login}&senha=${senha}`);
    const usuarios = await resposta.json();

    return usuarios;
}

const formulario = document.getElementById('formLogin');

formulario.addEventListener('submit', async function(evento) {
    evento.preventDefault();

    const loginDigitado = document.getElementById('loginUsuario').value;
    const senhaDigitada = document.getElementById('senhaUsuario').value;
    const resultado = await buscarUsuario(loginDigitado, senhaDigitada);

    if (resultado.length > 0) {
        const usuario = resultado[0];
        
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));

        alert(`Bem-vindo, ${usuario.nome}!`)
        window.location.href = 'index.html';
    } else {
        alert('Usuário ou senha incorretos.');
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
            alert('Cadastro realizado com sucesso! Agora você já pode fazer o login.');
            cadastro.reset();
        } else {
            alert('Erro ao realizar o cadastro.');
        }
    } catch (erro) {
        console.error('Erro no cadastro:', erro)
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