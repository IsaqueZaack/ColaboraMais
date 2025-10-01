document.addEventListener('DOMContentLoaded', () => {

    // BANCO DE DADOS FALSO COM OS TÓPICOS INICIAIS
    let topicosData = {
        "1": {
            id: "1",
            author: "isabella@vivo.com",
            title: "Missão 'Processos Internos' - Recompensas",
            content: "Gente, acabei de concluir a missão sobre Processos Internos e ganhei 90 Pontos de recompensa! Notei que essa vale mais que as outras. Alguém sabe se as recompensas variam conforme a complexidade da tarefa?",
            stats: { date: "Set 16", comments: 25, likes: 40 },
            viewer: { count: 90 },
            comments: [
                { author: "henzo@vivo.com", text: "Sim, Isabella! As missões mais complexas ou estratégicas dão mais pontos." },
                { author: "joserodrigues@vivo.com", text: "Boa! Também percebi isso." }
            ]
        },
        "2": {
            id: "2",
            author: "henzo@vivo.com",
            title: "Feedback sobre a Gamificação!",
            content: "Só queria dizer que estou achando a jornada gamificada incrível! As missões interativas e as recompensas realmente me mantêm motivado a explorar a plataforma todos os dias.",
            stats: { date: "Set 17", comments: 28, likes: 33 },
            viewer: { count: 70 },
            comments: [{ author: "karla@vivo.com", text: "Concordo 100%!" }]
        },
        "3": {
            id: "3",
            author: "karla@vivo.com",
            title: "Entendendo a Cultura da Vivo na prática",
            content: "Adorei a missão sobre a cultura da empresa! Gostaria de saber como vocês aplicam os valores no dia a dia. Algum exemplo prático de projeto ou situação que vocês vivenciaram e que reflete bem o nosso jeito de ser?",
            stats: { date: "Set 18", comments: 21, likes: 15 },
            viewer: { count: 60 },
            comments: []
        }
    };

    const forumContainer = document.getElementById('forum-container');
    const btnNovoTopico = document.getElementById('btn-novo-topico');
    const novoTopicoModal = new bootstrap.Modal(document.getElementById('novoTopicoModal'));
    const formNovoTopico = document.getElementById('form-novo-topico');
    const detalheTopicoModal = new bootstrap.Modal(document.getElementById('detalheTopicoModal'));
    const modalTitle = document.getElementById('detalheTopicoModalLabel');
    const modalAuthor = document.getElementById('modal-topic-author');
    const modalContent = document.getElementById('modal-topic-content');
    const modalCommentsContainer = document.getElementById('modal-topic-comments');
    const formNovoComentario = document.getElementById('form-novo-comentario');
    let currentOpenTopicId = null;

    const renderComment = (comment) => {
        return `<div class="comment border-bottom py-2"><p class="comment-author mb-1">${comment.author}</p><p class="comment-text mb-0">${comment.text}</p></div>`;
    };
    
    // FUNÇÃO CORRIGIDA PARA GERAR O CARD COM O ESTILO E ÍCONES ORIGINAIS
    const criarCardTopicoHTML = (topic) => {
        return `
        <div class="col-12 col-md-6 col-lg-4 d-flex flex-column align-items-center">
            <div class="task h-100" draggable="true" data-topic-id="${topic.id}">
                <div class="tags">
                    <span class="tag">${topic.author}</span>
                    <button class="options">
                        <svg xml:space="preserve" viewBox="0 0 41.915 41.916"><g><g><path d="M11.214,20.956c0,3.091-2.509,5.589-5.607,5.589C2.51,26.544,0,24.046,0,20.956c0-3.082,2.511-5.585,5.607-5.585 C8.705,15.371,11.214,17.874,11.214,20.956z"></path><path d="M26.564,20.956c0,3.091-2.509,5.589-5.606,5.589c-3.097,0-5.607-2.498-5.607-5.589c0-3.082,2.511-5.585,5.607-5.585 C24.056,15.371,26.564,17.874,26.564,20.956z"></path><path d="M41.915,20.956c0,3.091-2.509,5.589-5.607,5.589c-3.097,0-5.606-2.498-5.606-5.589c0-3.082,2.511-5.585,5.606-5.585 C39.406,15.371,41.915,17.874,41.915,20.956z"></path></g></g></svg>
                    </button>
                </div>
                <h5 class="fs-5 pt-2">${topic.title}</h5>
                <p>${topic.content}</p>
                <div class="stats">
                    <div>
                        <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g><path stroke-linecap="round" stroke-width="2" d="M12 8V12L15 15"></path><circle stroke-width="2" r="9" cy="12" cx="12"></circle></g></svg>${topic.stats.date}</div>
                        <div data-stat="comments"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g><path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" d="M16 10H16.01M12 10H12.01M8 10H8.01M3 10C3 4.64706 5.11765 3 12 3C18.8824 3 21 4.64706 21 10C21 15.3529 18.8824 17 12 17C11.6592 17 11.3301 16.996 11.0124 16.9876L7 21V16.4939C4.0328 15.6692 3 13.7383 3 10Z"></path></g></svg>${topic.stats.comments}</div>
                        <div><svg fill="#000000" version="1.1" viewBox="-2.5 0 32 32"><g><path d="M0 10.284l0.505 0.36c0.089 0.064 0.92 0.621 2.604 0.621 0.27 0 0.55-0.015 0.836-0.044 3.752 4.346 6.411 7.472 7.060 8.299-1.227 2.735-1.42 5.808-0.537 8.686l0.256 0.834 7.63-7.631 8.309 8.309 0.742-0.742-8.309-8.309 7.631-7.631-0.834-0.255c-2.829-0.868-5.986-0.672-8.686 0.537-0.825-0.648-3.942-3.3-8.28-7.044 0.11-0.669 0.23-2.183-0.575-3.441l-0.352-0.549-8.001 8.001zM1.729 10.039l6.032-6.033c0.385 1.122 0.090 2.319 0.086 2.334l-0.080 0.314 0.245 0.214c7.409 6.398 8.631 7.39 8.992 7.546l-0.002 0.006 0.195 0.058 0.185-0.087c2.257-1.079 4.903-1.378 7.343-0.836l-13.482 13.481c-0.55-2.47-0.262-5.045 0.837-7.342l0.104-0.218-0.098-0.221-0.031 0.013c-0.322-0.632-1.831-2.38-7.498-8.944l-0.185-0.215-0.282 0.038c-0.338 0.045-0.668 0.069-0.981 0.069-0.595 0-1.053-0.083-1.38-0.176z"></path></g></svg>${topic.stats.likes}</div>
                    </div>
                    <div class="viewer">
                        <span>+${topic.viewer.count}</span>
                    </div>
                </div>
            </div>
        </div>`;
    };

    const openDetalheModal = (topicId) => {
        const topic = topicosData[topicId];
        if (!topic) return;
        currentOpenTopicId = topicId;
        modalTitle.textContent = topic.title;
        modalAuthor.textContent = topic.author;
        modalContent.textContent = topic.content;
        modalCommentsContainer.innerHTML = topic.comments.length > 0
            ? topic.comments.map(renderComment).join('')
            : '<p class="text-muted small">Ainda não há comentários.</p>';
        detalheTopicoModal.show();
    };

    forumContainer.addEventListener('click', (e) => {
        const card = e.target.closest('.task');
        if (card) openDetalheModal(card.dataset.topicId);
    });

    btnNovoTopico.addEventListener('click', () => {
        formNovoTopico.reset();
        novoTopicoModal.show();
    });

    formNovoTopico.addEventListener('submit', (e) => {
        e.preventDefault();
        const titulo = document.getElementById('topico-titulo').value.trim();
        const conteudo = document.getElementById('topico-conteudo').value.trim();
        if (!titulo || !conteudo) return;

        const hoje = new Date();
        const mes = hoje.toLocaleString('pt-BR', { month: 'short' }).replace('.', '');
        const newTopicId = `topic-${hoje.getTime()}`;
        const newTopicData = {
            id: newTopicId,
            author: "joserodrigues@vivo.com",
            title: titulo,
            content: conteudo,
            stats: { date: `${mes} ${hoje.getDate()}`, comments: 0, likes: 0 },
            viewer: { count: 0 },
            comments: []
        };
        topicosData[newTopicId] = newTopicData;
        forumContainer.insertAdjacentHTML('afterbegin', criarCardTopicoHTML(newTopicData));
        novoTopicoModal.hide();
    });

    formNovoComentario.addEventListener('submit', (e) => {
        e.preventDefault();
        const commentText = document.getElementById('novo-comentario-texto').value.trim();
        if (!commentText || !currentOpenTopicId) return;

        const newComment = { author: "joserodrigues@vivo.com", text: commentText };
        topicosData[currentOpenTopicId].comments.push(newComment);

        const noCommentsMsg = modalCommentsContainer.querySelector('p.text-muted');
        if (noCommentsMsg) noCommentsMsg.remove();
        modalCommentsContainer.insertAdjacentHTML('beforeend', renderComment(newComment));
        
        // Atualiza o contador de comentários no card da página principal
        topicosData[currentOpenTopicId].stats.comments++;
        const cardInDOM = forumContainer.querySelector(`.task[data-topic-id="${currentOpenTopicId}"]`);
        if (cardInDOM) {
            const commentStatEl = cardInDOM.querySelector('[data-stat="comments"]');
            if(commentStatEl) {
                 commentStatEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g><path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" d="M16 10H16.01M12 10H12.01M8 10H8.01M3 10C3 4.64706 5.11765 3 12 3C18.8824 3 21 4.64706 21 10C21 15.3529 18.8824 17 12 17C11.6592 17 11.3301 16.996 11.0124 16.9876L7 21V16.4939C4.0328 15.6692 3 13.7383 3 10Z"></path></g></svg>${topicosData[currentOpenTopicId].stats.comments}`;
            }
        }

        e.target.reset();
    });
    
    // Renderiza os tópicos iniciais na ordem correta
    forumContainer.innerHTML = Object.values(topicosData).reverse().map(criarCardTopicoHTML).join('');
}); 