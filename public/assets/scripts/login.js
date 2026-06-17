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

