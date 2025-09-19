document.addEventListener("DOMContentLoaded", () => {
    // --- ELEMENTOS DO DOM ---
    const filtroPeriodo = document.getElementById("periodo-filtro");
    const donutChart = document.getElementById("donut-chart");
    const donutText = document.getElementById("donut-text");
    const tempoMedioEl = document.getElementById("tempo-medio");
    const participacoesEl = document.getElementById("participacoes-mentorias");
    const satisfacaoColaboradoresEl = document.getElementById("satisfacao-colaboradores"); // Novo elemento
    
    const listaColaboradoresEl = document.getElementById("lista-colaboradores");
    const searchInput = document.getElementById("search-input");
    const filterStatus = document.getElementById("filter-status");
    
    const forumChartCanvas = document.getElementById('forum-chart'); // Novo gráfico
    const forumTopicosEl = document.getElementById('forum-topicos'); // Nova métrica
    const forumRespostasEl = document.getElementById('forum-respostas'); // Nova métrica
    
    const mentoriasAgendadasEl = document.getElementById('mentorias-agendadas'); // Nova métrica
    const mentoriasConclusaoEl = document.getElementById('mentorias-conclusao'); // Nova métrica

    const modalColaborador = document.getElementById('modalColaborador');
    let radarChartInstance = null; // Variável para guardar a instância do gráfico radar
    let forumChartInstance = null; // Variável para guardar a instância do gráfico de fórum


    // --- DADOS MOCADOS (BANCO DE DADOS FALSO) ---
    const colaboradoresData = [
        {
            id: 1, nome: "Sabrina", cargo: "Analista de Dados", img: "./images/sabrina.png", mentor: "Gabriel Mendes",
            status: "destaque", progressoGeral: 100,
            metricas: { missoes: '10/10', forum: 8, mentoria: 5 },
            desempenho: { cultura: 10, ferramentas: 9, processos: 10, lgpd: 9, sustentabilidade: 10 },
            atividades: ["Concluiu a trilha de Onboarding!", "Recebeu badge 'Colaborador Lendário'", "Ajudou um colega no fórum"]
        },
        {
            id: 2, nome: "Renato", cargo: "Desenvolvedor Frontend", img: "./images/renato.png", mentor: "Ana Clara",
            status: "atencao", progressoGeral: 77,
            metricas: { missoes: '8/10', forum: 4, mentoria: 3 },
            desempenho: { cultura: 9, ferramentas: 10, processos: 7, lgpd: 6, sustentabilidade: 8 },
            atividades: ["Completou a missão 'Ferramentas de Trabalho'", "Agendou mentoria", "Iniciou o módulo de LGPD"]
        },
        {
            id: 3, nome: "Marina", cargo: "Designer UX/UI", img: "./images/marina.png", mentor: "Carlos Souza",
            status: "risco", progressoGeral: 18,
            metricas: { missoes: '2/10', forum: 1, mentoria: 0 },
            desempenho: { cultura: 5, ferramentas: 4, processos: 2, lgpd: 1, sustentabilidade: 1 },
            atividades: ["Iniciou a missão 'Cultura Organizacional'", "Login na plataforma", "Ainda não interagiu com o mentor"]
        },
        {
            id: 4, nome: "Lucas", cargo: "Analista Financeiro", img: "./images/lucas.png", mentor: "Fernanda Costa",
            status: "atencao", progressoGeral: 55,
            metricas: { missoes: '6/10', forum: 3, mentoria: 2 },
            desempenho: { cultura: 7, ferramentas: 8, processos: 6, lgpd: 7, sustentabilidade: 6 },
            atividades: ["Completou 50% da trilha", "Participou de 2 sessões de mentoria", "Postou dúvida no fórum"]
        },
        {
            id: 5, nome: "Beatriz", cargo: "Gerente de Projetos", img: "./images/beatriz.png", mentor: "Roberto Almeida",
            status: "destaque", progressoGeral: 100,
            metricas: { missoes: '10/10', forum: 9, mentoria: 4 },
            desempenho: { cultura: 9, ferramentas: 10, processos: 9, lgpd: 8, sustentabilidade: 9 },
            atividades: ["Finalizou todas as missões", "Ativa no fórum, ajudando colegas", "Feedback positivo da mentoria"]
        }
    ];

    const dadosDashboardGeral = {
        semana: { porcentagem: 65, tempoMedio: "8,2 h", participacoes: 245, satisfacao: "92%" },
        mes: { porcentagem: 78, tempoMedio: "9,1 h", participacoes: 980, satisfacao: "88%" },
        ano: { porcentagem: 85, tempoMedio: "7,9 h", participacoes: 11250, satisfacao: "95%" },
    };

    const dadosForum = {
        labels: ["Sabrina", "Renato", "Marina", "Lucas", "Beatriz"],
        posts: [8, 4, 1, 3, 9],
        topicosAbertos: 12,
        respostasPendentes: 3
    };

    const dadosMentorias = {
        agendadas: 8,
        conclusao: "85%"
    };


    // --- FUNÇÕES ---

    // Atualiza os cards de desempenho geral com base no período selecionado
    function atualizarCardsGerais(periodo) {
        const dados = dadosDashboardGeral[periodo];
        
        donutText.textContent = `${dados.porcentagem}%`;
        tempoMedioEl.textContent = dados.tempoMedio;
        participacoesEl.textContent = dados.participacoes;
        satisfacaoColaboradoresEl.textContent = dados.satisfacao;

        donutChart.style.setProperty('--progress-percent', `${dados.porcentagem}%`);
    }

    // Renderiza a lista de colaboradores (com filtros e pesquisa)
    const renderColaboradores = (lista) => {
        listaColaboradoresEl.innerHTML = '';
        if (lista.length === 0) {
            listaColaboradoresEl.innerHTML = '<p class="text-center text-muted p-3">Nenhum colaborador encontrado.</p>';
            return;
        }

        lista.forEach(colab => {
            const statusMap = {
                destaque: { text: 'Em Destaque', class: 'tag-destaque text-success' },
                atencao: { text: 'Requer Atenção', class: 'tag-atencao text-warning' },
                risco: { text: 'Em Risco', class: 'tag-risco text-danger' }
            };

            // --- ADIÇÃO INICIA AQUI ---
            // 1. Define a variável para a cor da barra de progresso
            let progressBarClass = '';
            switch (colab.status) {
                case 'destaque':
                    progressBarClass = 'bg-success';
                    break;
                case 'atencao':
                    progressBarClass = 'bg-warning';
                    break;
                case 'risco':
                    progressBarClass = 'bg-danger';
                    break;
                default:
                    progressBarClass = 'bg-secondary'; // Cor padrão caso não haja status
            }
            // --- ADIÇÃO TERMINA AQUI ---

            // --- lista de colaboradores em acompanhamento ---
            const itemHTML = `
                <a href="#" class="list-group-item list-group-item-action collaborator-card d-lg-flex p-3 gap-3" 
                   data-bs-toggle="modal" data-bs-target="#modalColaborador" data-id="${colab.id}">
                    <img src="${colab.img}" class="rounded-circle" width="60" height="60">
                    <div class="flex-grow-1">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1 fw-bold">${colab.nome}</h5>
                            <span class="badge ${statusMap[colab.status].class}">${statusMap[colab.status].text}</span>
                        </div>
                        <p class="mb-1 text-muted">${colab.cargo}</p>
                        <div class="progress mb-2" style="height: 8px;">
                            <div class="progress-bar ${progressBarClass}" style="width: ${colab.progressoGeral}%;"></div>
                        </div>
                        <div class="metric-icons d-flex gap-3">
                            <span><i class="fa-solid fa-flag-checkered text-purple"></i> Missões: ${colab.metricas.missoes}</span>
                            <span><i class="fa-solid fa-comments text-purple"></i> Fórum: ${colab.metricas.forum} posts</span>
                            <span><i class="fa-solid fa-user-group text-purple"></i> Mentoria: ${colab.metricas.mentoria} sessões</span>
                        </div>
                    </div>
                </a>
            `;
            listaColaboradoresEl.insertAdjacentHTML('beforeend', itemHTML);
        });
    };
    // Lógica de filtro e pesquisa para colaboradores
    const handleColaboradorFilter = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const statusFilter = filterStatus.value;

        const filteredList = colaboradoresData.filter(colab => {
            const matchesSearch = colab.nome.toLowerCase().includes(searchTerm);
            const matchesStatus = (statusFilter === 'todos') || (colab.status === statusFilter);
            return matchesSearch && matchesStatus;
        });

        renderColaboradores(filteredList);
    };

    // Inicializa o gráfico de barras do Fórum
    const initForumChart = () => {
        if (forumChartInstance) {
            forumChartInstance.destroy();
        }
        forumChartInstance = new Chart(forumChartCanvas, {
            type: 'bar',
            data: {
                labels: dadosForum.labels,
                datasets: [{
                    label: 'Número de Posts no Fórum',
                    data: dadosForum.posts,
                    backgroundColor: 'rgba(108, 64, 151, 0.7)',
                    borderColor: 'rgb(108, 64, 151)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Posts' }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
        forumTopicosEl.textContent = dadosForum.topicosAbertos;
        forumRespostasEl.textContent = dadosForum.respostasPendentes;
    };

    // Inicializa as métricas de Mentoria
    const initMentoriasMetrics = () => {
        mentoriasAgendadasEl.textContent = dadosMentorias.agendadas;
        mentoriasConclusaoEl.textContent = dadosMentorias.conclusao;
    };

    // --- EVENT LISTENERS ---
    if (filtroPeriodo) {
        filtroPeriodo.addEventListener("change", (e) => {
            atualizarCardsGerais(e.target.value);
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', handleColaboradorFilter);
    }
    if (filterStatus) {
        filterStatus.addEventListener('change', handleColaboradorFilter);
    }

    if (modalColaborador) {
        modalColaborador.addEventListener('show.bs.modal', (event) => {
            const triggerElement = event.relatedTarget;
            const colabId = parseInt(triggerElement.dataset.id);
            const colab = colaboradoresData.find(c => c.id === colabId);

            // Preenche informações básicas do modal
            document.getElementById('modal-nome').textContent = `Performance de ${colab.nome}`;
            document.getElementById('modal-img').src = colab.img;
            document.getElementById('modal-cargo').textContent = colab.cargo;
            document.getElementById('modal-mentor').textContent = colab.mentor;
            
            const tagEl = document.getElementById('modal-tag');
            const statusInfo = {
                destaque: { text: 'Em Destaque', class: 'tag-destaque' },
                atencao: { text: 'Requer Atenção', class: 'tag-atencao' },
                risco: { text: 'Em Risco', class: 'tag-risco' }
            }[colab.status];
            tagEl.textContent = statusInfo.text;
            tagEl.className = `badge ${statusInfo.class}`;

            // Preenche lista de atividades do modal
            const atividadesEl = document.getElementById('modal-atividades');
            atividadesEl.innerHTML = colab.atividades.map(act => `<li class="list-group-item">${act}</li>`).join('');

            // Cria ou atualiza o gráfico radar no modal
            const ctx = document.getElementById('radar-chart').getContext('2d');
            if (radarChartInstance) {
                radarChartInstance.destroy();
            }
            radarChartInstance = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: ['Cultura', 'Ferramentas', 'Processos', 'LGPD', 'Sustentabilidade'],
                    datasets: [{
                        label: 'Pontuação de Competência',
                        data: Object.values(colab.desempenho),
                        fill: true,
                        backgroundColor: 'rgba(108, 64, 151, 0.2)',
                        borderColor: 'rgb(108, 64, 151)',
                        pointBackgroundColor: 'rgb(108, 64, 151)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(108, 64, 151)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false, // Permite maior flexibilidade no tamanho
                    scales: {
                        r: {
                            angleLines: { color: 'rgba(0, 0, 0, 0.1)' },
                            grid: { color: 'rgba(0, 0, 0, 0.1)' },
                            pointLabels: { font: { size: 12 } },
                            suggestedMin: 0,
                            suggestedMax: 10,
                            ticks: { display: false } // Oculta os números do eixo, focando nas barras
                        }
                    },
                    plugins: {
                        legend: { display: false }
                    }
                }
            });
        });
    }

    // --- INICIALIZAÇÃO ---
    atualizarCardsGerais('semana'); // Carrega os dados iniciais do painel geral
    renderColaboradores(colaboradoresData); // Carrega a lista de colaboradores
    initForumChart(); // Inicializa o gráfico do fórum
    initMentoriasMetrics(); // Inicializa as métricas de mentoria
});