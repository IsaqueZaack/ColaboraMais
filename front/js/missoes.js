document.addEventListener('DOMContentLoaded', function () {
    // --- ELEMENTOS DO DOM ---
    const nodes = document.querySelectorAll('.node');
    const pointsDisplay = document.getElementById('points');
    const progressText = document.getElementById('progress-text');
    const missionModalElement = document.getElementById('missionModal');
    const modalBody = missionModalElement.querySelector('.modal-body');
    const missionModal = new bootstrap.Modal(missionModalElement);
    const missionTitle = document.getElementById('missionTitle');
    const missionDescription = document.getElementById('missionDescription');
    const missionMedia = document.getElementById('missionMedia');
    const missionQuestionsContainer = document.getElementById('missionQuestions');
    const completeMissionBtn = document.getElementById('completeMissionBtn');
    // NOVO: Pegando os elementos de feedback
    const missionFeedback = document.getElementById('missionFeedback');
    const retryBtn = document.getElementById('retryBtn');

    // --- DADOS DAS MISSÕES ---
    const missions = {
        "node-1": { 
            title: "Nossa História",
            description: "Conheça os marcos que transformaram a Vivo em uma líder de mercado. Assista ao vídeo e responda às questões para testar seu conhecimento!",
            mediaHtml: `<iframe src="https://www.youtube.com/embed/lLiUfGEm_rE?si=XsAQ_6cND4Hv-Z1E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
            questions: [
                { text: "Qual evento crucial aconteceu em 2010?", options: [
                    { text: "A Vivo comprou a Telemig Celular.", correct: false }, 
                    { text: "A Telefônica comprou a parte da Portugal Telecom.", correct: true },
                    { text: "A Vivo foi formada pela fusão de companhias estatais.", correct: false }
                ], correctlyAnswered: false, attempted: false },
                { text: "A partir de que ano todos os serviços passaram a ser da marca \"Vivo\"?", options: [
                    { text: "2010", correct: false }, 
                    { text: "2007", correct: false },
                    { text: "2012", correct: true }
                ], correctlyAnswered: false, attempted: false },
                { text: "Qual a porcentagem do mercado de celulares da Vivo?", options: [
                    { text: "Cerca de 25%", correct: false },
                    { text: "Mais de 30%", correct: true }, 
                    { text: "Cerca de 50%", correct: false }
                ], correctlyAnswered: false, attempted: false },
                { text: "Qual setor, além de telecomunicações, a Vivo tem inovado?", options: [
                    { text: "Agronegócio", correct: true }, 
                    { text: "Varejo", correct: false },
                    { text: "Saúde", correct: false }
                ], correctlyAnswered: false, attempted: false },
                { text: "Qual tecnologia futura é o foco da Vivo?", options: [
                    { text: "Rede 4.5G", correct: false },
                    { text: "Internet via Satélite", correct: false }, 
                    { text: "Rede 5G", correct: true }
                ], correctlyAnswered: false, attempted: false }
            ]
        },
        
        "node-3": { 
            title: "Nossa Cultura: Paixão Púrpura",
            description: "Bem-vindo à essência da nossa cultura! A Paixão Púrpura representa a força que nos une e nos impulsiona. Neste vídeo, você vai entender por que essa cor é tão importante para nós. Vamos lá?",
            mediaHtml: `<iframe width="560" height="315" src="https://www.youtube.com/embed/sqloJZYt8z4?si=KUTo6ZubBqnpQiXr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
            questions: [
                { text: "De acordo com o vídeo, por que a cor púrpura é descrita como a que \"mais vibra\"?", options: [
                    { text: "Porque é a primeira cor do arco-íris.", correct: false }, 
                    { text: "Porque é a cor favorita da maioria das pessoas.", correct: false },
                    { text: " Porque ela provoca, estimula e nos deixa inquietos.", correct: true }
                ], correctlyAnswered: false, attempted: false },
                { text: "No contexto da Vivo, o que significa a expressão \"Paixão Púrpura\"?", options: [
                    { text: "Um novo plano de celular oferecido pela empresa.", correct: false }, 
                    { text: "A cultura da empresa, fortalecida pela diversidade, inovação, conexão e sustentabilidade.", correct: true },
                    { text: "A cor oficial do logotipo da Vivo.", correct: false }
                ], correctlyAnswered: false, attempted: false },
                { text: "Qual é o principal sentimento que a \"Paixão Púrpura\" busca despertar, segundo o vídeo?", options: [
                    { text: "Inquietação e desconforto.", correct: false },
                    { text: "Vontade de criar, ousar, ensinar e aprender.", correct: true }, 
                    { text: " Sentir-se mais vivo e conectar-se ao que importa.", correct: false }
                ], correctlyAnswered: false, attempted: false },
                { text: "O vídeo menciona que a cultura da Vivo \"se retroalimenta todos os dias\". O que fortalece essa cultura?", options: [ 
                    { text: "Apenas a inovação tecnológica.", correct: false },
                    { text: "Seguir tradições sem mudanças.", correct: false },
                    { text: "A diversidade, inovação, conexão e sustentabilidade. ", correct: true }
                ], correctlyAnswered: false, attempted: false },
                { text: "Qual é a pergunta final que o vídeo faz ao espectador?", options: [
                    { text: "\"Como pulsa a sua paixão púrpura?\"", correct: true },
                    { text: "\"O que é a Paixão Púrpura para você?\"", correct: false }, 
                    { text: "\"Você sente a Paixão Púrpura?\"", correct: false }
                ], correctlyAnswered: false, attempted: false }
            ]
        },
        // Adicione outras missões aqui
    };

    // --- ESTADO DO JOGO ---
    let currentPoints = 0;
    let activeNodeId = null;

    // --- FUNÇÕES ---
    function openMissionModal(nodeId) {
        const missionData = missions[nodeId];
        if (!missionData) return;
        activeNodeId = nodeId;
        
        resetQuizState(); // Reseta o estado ao abrir

        missionTitle.textContent = missionData.title;
        missionDescription.textContent = missionData.description;
        missionMedia.innerHTML = missionData.mediaHtml;
        
        renderQuestions();
        missionModal.show();
    }

    function renderQuestions() {
        const missionData = missions[activeNodeId];
        missionQuestionsContainer.innerHTML = '';
        missionData.questions.forEach((question, qIndex) => {
            const questionEl = document.createElement('div');
            questionEl.className = 'question-block mb-3';
            questionEl.innerHTML = `<p class="fw-bold">${qIndex + 1}. ${question.text}</p>`;
            const optionsEl = document.createElement('div');
            optionsEl.className = 'options-group';
            question.options.forEach((option) => {
                const optionEl = document.createElement('div');
                optionEl.className = 'option';
                optionEl.textContent = option.text;
                optionEl.dataset.correct = option.correct;
                optionEl.addEventListener('click', () => handleAnswer(questionEl, optionEl, qIndex));
                optionsEl.appendChild(optionEl);
            });
            questionEl.appendChild(optionsEl);
            missionQuestionsContainer.appendChild(questionEl);
        });
    }

    function handleAnswer(questionEl, selectedOptionEl, questionIndex) {
        if (questionEl.classList.contains('answered')) return;
        questionEl.classList.add('answered');

        const missionData = missions[activeNodeId];
        missionData.questions[questionIndex].attempted = true;

        const isCorrect = selectedOptionEl.dataset.correct === 'true';
        if (isCorrect) {
            selectedOptionEl.classList.add('correct');
            missionData.questions[questionIndex].correctlyAnswered = true;
        } else {
            selectedOptionEl.classList.add('incorrect');
            const correctOption = questionEl.querySelector('.option[data-correct="true"]');
            if (correctOption) correctOption.classList.add('correct');
        }
        checkMissionCompletion();
    }
    
    // MUDANÇA CRÍTICA: Lógica reimaginada para verificar conclusão
    function checkMissionCompletion() {
        const missionData = missions[activeNodeId];
        const allAttempted = missionData.questions.every(q => q.attempted);

        if (!allAttempted) return; // Se ainda não respondeu tudo, não faz nada

        const allCorrect = missionData.questions.every(q => q.correctlyAnswered);

        if (allCorrect) {
            completeMissionBtn.disabled = false;
            missionFeedback.classList.add('d-none'); // Esconde a mensagem de erro
        } else {
            completeMissionBtn.disabled = true;
            missionFeedback.classList.remove('d-none'); // Mostra a mensagem de erro
        }
    }

    // NOVA FUNÇÃO: Reseta o estado do quiz para tentar de novo
    function resetQuizState() {
        const missionData = missions[activeNodeId];
        if (missionData) {
            missionData.questions.forEach(q => {
                q.attempted = false;
                q.correctlyAnswered = false;
            });
        }
        completeMissionBtn.disabled = true;
        missionFeedback.classList.add('d-none');
    }
    
    // Evento para o botão "Tentar Novamente"
    retryBtn.addEventListener('click', () => {
        resetQuizState();
        renderQuestions(); // Renderiza as perguntas novamente, limpas
        setTimeout(() => {
        missionQuestionsContainer.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        }, 50);
    });

    completeMissionBtn.addEventListener('click', () => {
        const node = document.getElementById(activeNodeId);
        if (node) {
            node.classList.remove('is-active');
            node.classList.add('is-completed');
            currentPoints += 10;
            pointsDisplay.textContent = currentPoints;
            updateTrailState();
        }
        missionModal.hide();
    });

    function updateTrailState() { /* ... (esta função não precisa mudar) ... */
        const completedNodesCount = document.querySelectorAll('.node.is-completed').length;
        nodes.forEach(node => {
            if (node.classList.contains('is-completed')) return;
            const requiredNodeIds = (node.dataset.requires || '').split(',').filter(id => id.trim() !== '');
            let canBeUnlocked = requiredNodeIds.length === 0;
            if (requiredNodeIds.length > 0) {
                canBeUnlocked = requiredNodeIds.every(reqId => {
                    const requiredNode = document.getElementById(reqId);
                    return requiredNode && requiredNode.classList.contains('is-completed');
                });
            }
            if (canBeUnlocked) {
                node.classList.remove('is-locked');
                node.classList.add('is-active');
                node.parentElement.classList.add('is-connected');
            } else {
                node.classList.remove('is-active');
                node.classList.add('is-locked');
                node.parentElement.classList.remove('is-connected');
            }
        });
        const progressPercentage = Math.round((completedNodesCount / nodes.length) * 100);
        progressText.textContent = `${progressPercentage}%`;
    }

    nodes.forEach(node => {
        node.addEventListener('click', () => {
            if (node.classList.contains('is-active')) {
                if (missions[node.id]) {
                    openMissionModal(node.id);
                } else {
                    node.classList.remove('is-active');
                    node.classList.add('is-completed');
                    currentPoints += 10;
                    pointsDisplay.textContent = currentPoints;
                    updateTrailState();
                }
            }
        });
    });

    updateTrailState();
});