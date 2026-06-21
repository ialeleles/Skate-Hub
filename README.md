# Skate Hub

O Skate Hub é uma plataforma web voltada para entusiastas e praticantes de skate que desejam evoluir suas habilidades de forma estruturada. O site funciona como um catálogo interativo onde os usuários encontram tutoriais e detalhes de manobras filtradas por seu nível de dificuldade (Iniciante, Intermediário e Difícil) ou categorias (Street, Transição, etc.), facilitando o aprendizado progressivo.

Banco de Dados de Manobras: Uma biblioteca dinâmica dividida por níveis de habilidade (Iniciante, Intermediário, Avançado e Transição/Corrimão). Cada manobra possui uma página dedicada de Detalhes com descrição completa, nível de dificuldade (em estrelas), base recomendada e "Dicas do Mestre".

Gerenciador CRUD de Conteúdo: O usuário pode gerenciar o catálogo de manobras diretamente pela interface, sendo possível Criar novas manobras através de formulários com validação, Editar informações existentes ou Excluir itens do banco de dados.

Filtros e Busca em Tempo Real: O sistema conta com um motor de busca textual e filtros por categoria que atualizam o grid de manobras instantaneamente conforme o usuário digita ou altera as opções.

Sistema de Favoritos Sincronizado: Permite salvar manobras de interesse clicando no botão de coração (tanto no card principal quanto na tela de detalhes). O estado visual é mantido e sincronizado globalmente através do localStorage do navegador.

Painel Pegboard Interativo: Uma área de customização onde o usuário pode visualizar equipamentos disponíveis (shapes, rodas, trucks e rolamentos) e montá-los em um painel virtual utilizando a mecânica de clicar e arrastar (drag-and-drop), além de poder cadastrar novos componentes personalizados.

Autenticação Simulada (Login): Uma área restrita para o skatista que valida credenciais via JavaScript de forma local, permitindo fluxos de navegação e simulação de controle de acesso integrada ao ecossistema do site.

Dashboard de Estatísticas: Uma tela de métricas que consome os dados do localStorage em tempo real usando a biblioteca Chart.js. Ela exibe a distribuição de manobras cadastradas por meio de um gráfico de barras (separado por categorias) e um gráfico de rosca (separado por estrelas de dificuldade), oferecendo ao usuário um panorama visual do progresso do seu catálogo.

## Informações Gerais
- Nome: Iale Leles de Almeida
- Matricula: 927707

