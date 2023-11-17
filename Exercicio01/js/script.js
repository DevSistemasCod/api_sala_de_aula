// Função para cadastrar país
function cadastraPais() {
    const nome = document.getElementById('nome').value;
    const capital = document.getElementById('capital').value;

    const dados = {
        nome: nome,
        capital: capital
    };

    const opcoes = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    };

    enviarRequisicao('http://localhost:8080/pais', opcoes, 'Erro ao cadastrar país', function () {
        // Exibe o alerta de sucesso
        exibirAlerta('success', 'Cadastro realizado com sucesso!');

        // Limpa os campos do formulário após o cadastro
        limparCamposFormulario();
    });
}

// Função para buscar todos os países
function buscaTodos() {
    enviarRequisicao('http://localhost:8080/pais', null, 'Erro ao buscar países', function (data) {
        const tabelaElement = document.getElementById('tabela_lista');
        limparTabela(tabelaElement);

        // Adiciona os países à tabela
        adicionarPaisesATabela(data);
    });
}

// Função para buscar país por nome
function buscaPorNome() {
    // Implemente conforme necessário
}

// Função para editar país
function editarPais(id) {
    // Implemente conforme necessário
}

// Função para cancelar edição
function cancelaEdicao() {
    limparCamposEdicao();
    trocarAba('lista', 'edicao', 'info', 'A edição de país foi cancelada.');
}

// Função para gravar edição
function gravaEdicao() {
    // Implemente conforme necessário
}

// Função para excluir país
function excluirPais(id) {
    Swal.fire({
        title: 'Tem certeza?',
        text: 'Esta ação não pode ser desfeita!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            const opcoes = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            enviarRequisicao(`http://localhost:8080/pais/${id}`, opcoes, 'Erro ao excluir país', function () {
                buscaTodos(); // Atualiza a lista após a exclusão
                exibirAlerta('success', 'País excluído com sucesso!');
            });
        }
    });
}

// Função executada ao terminar o load da página
window.onload = buscaTodos;

// Adicionar eventos aos elementos
document.getElementById('lista-tab').onclick = function () {
    buscaTodos();
};
document.getElementById('btn_cadastra').onclick = function () {
    cadastraPais();
};
document.getElementById('btn_busca').onclick = function () {
    buscaPorNome();
};
document.getElementById('btn_cancela').onclick = function () {
    cancelaEdicao();
};
document.getElementById('btn_edicao').onclick = function () {
    gravaEdicao();
};

// Funções auxiliares

// Função para enviar requisição genérica
function enviarRequisicao(url, opcoes, mensagemErro, callback) {
    fetch(url, opcoes)
        .then(function (response) {
            if (!response.ok) {
                throw new Error(mensagemErro);
            }
            return response.text(); // Alterado para response.text()
        })
        .then(function (data) {
            if (data) {
                // Adicionado verificação para dados não nulos
                const jsonData = JSON.parse(data);
                if (callback) {
                    callback(jsonData);
                }
            } else {
                // Se não houver dados, chama o callback com null
                if (callback) {
                    callback(null);
                }
            }
        })
        .catch(function (error) {
            console.error('Erro:', error);
            exibirAlerta('error', mensagemErro, error.message);
        });
}

// Função para exibir alerta
function exibirAlerta(icon, title, text) {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        showConfirmButton: true,
        timer: 1500
    });
}

// Função para limpar campos do formulário
function limparCamposFormulario() {
    document.getElementById('nome').value = '';
    document.getElementById('capital').value = '';
}

// Função para limpar campos de edição
function limparCamposEdicao() {
    document.getElementById('nome_edita').value = '';
    document.getElementById('capital_edita').value = '';
}

// Função para trocar de aba
function trocarAba(abaAtual, abaDestino, icon, mensagem) {
    $('#' + abaAtual).addClass('active').tab('show');
    $('#' + abaDestino).removeClass('active');

    exibirAlerta('info', mensagem);
}

// Função para limpar tabela
function limparTabela(tabelaElement) {
    while (tabelaElement.firstChild) {
        tabelaElement.removeChild(tabelaElement.firstChild);
    }
}

// Função para adicionar países à tabela
function adicionarPaisesATabela(data) {
    const tabelaElement = document.getElementById('tabela_lista');
    data.forEach(function (pais) {
        const row = document.createElement('tr');
        adicionarCelula(row, pais.nome);
        adicionarCelula(row, pais.capital);
        adicionarBotao(row, 'Editar', 'btn-secondary', function () {
            editarPais(pais.id);
        });
        adicionarBotao(row, 'Excluir', 'btn-danger', function () {
            excluirPais(pais.id);
        });
        tabelaElement.appendChild(row);
    });
}

// Função para adicionar célula à linha da tabela
function adicionarCelula(row, conteudo) {
    const cell = document.createElement('td');
    cell.textContent = conteudo;
    row.appendChild(cell);
}

// Função para adicionar botão à linha da tabela
function adicionarBotao(row, texto, classe, onClick) {
    const cell = document.createElement('td');
    const btn = document.createElement('button');
    btn.textContent = texto;
    btn.className = 'btn ' + classe;
    btn.onclick = onClick;
    cell.appendChild(btn);
    row.appendChild(cell);
}