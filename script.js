// ======================= DADOS DAS 15 QUESTÕES =======================
const questions = [
    { text: "1. Qual é uma das consequências diretas do uso excessivo de agrotóxicos na água?", options: ["Aumento do fitoplâncton", "Contaminação de rios e lençóis freáticos", "Redução da acidez da água", "Eutrofização benéfica"], correct: 1 },
    { text: "2. Os neonicotinoides (tipo de inseticida) são especialmente perigosos para:", options: ["Roedores silvestres", "Aves de rapina", "Abelhas e polinizadores", "Plantas daninhas"], correct: 2 },
    { text: "3. Qual prática é característica da agricultura sustentável?", options: ["Monocultura com aplicação de glyphosate", "Controle biológico de pragas", "Queima de restos culturais", "Uso intensivo de fertilizantes sintéticos"], correct: 1 },
    { text: "4. O que a contaminação crônica por agrotóxicos pode causar em seres humanos?", options: ["Melhora da visão noturna", "Câncer e distúrbios endócrinos", "Resistência a antibióticos", "Aumento da imunidade"], correct: 1 },
    { text: "5. Qual país é o maior consumidor de agrotóxicos do mundo?", options: ["Estados Unidos", "China", "Brasil", "Índia"], correct: 2 },
    { text: "6. Como os agrotóxicos afetam a biodiversidade do solo?", options: ["Eliminam minhocas e fungos benéficos", "Aumentam a porosidade", "Fixam nitrogênio", "Estimulam bactérias nitrificantes"], correct: 0 },
    { text: "7. A rotação de culturas ajuda a reduzir o uso de agrotóxicos porque:", options: ["Quebra o ciclo de pragas e doenças", "Exige mais herbicidas", "Aduba quimicamente o solo", "Aumenta a área plantada"], correct: 0 },
    { text: "8. O que significa o selo 'Orgânico Brasil'?", options: ["Produto com agrotóxicos controlados", "Alimento livre de agrotóxicos sintéticos", "Uso de transgênicos", "Agricultura hidropônica"], correct: 1 },
    { text: "9. Qual substância ativa do glifosato está ligada a controvérsias ambientais?", options: ["Atrazina", "Metsulfurom", "Glifosato (herbicida amplamente usado)", "Clorpirifós"], correct: 2 },
    { text: "10. O controle biológico utiliza:", options: ["Inseticidas de amplo espectro", "Inimigos naturais como joaninhas e vespas", "Fumigação química", "Aragem profunda"], correct: 1 },
    { text: "11. Como a agricultura regenerativa beneficia o clima?", options: ["Sequestra carbono no solo e reduz emissões de N2O", "Emite metano", "Desmata florestas", "Usa mais fertilizantes nitrogenados"], correct: 0 },
    { text: "12. A contaminação por agrotóxicos afeta mais intensamente:", options: ["Grandes centros urbanos", "Comunidades rurais e ribeirinhas", "Indústrias farmacêuticas", "Pesca oceânica"], correct: 1 },
    { text: "13. Qual alternativa é uma barreira natural contra pragas em agroecossistemas?", options: ["Cercas elétricas", "Cultivo de plantas repelentes (ex: cravo-de-defunto)", "Sal nas folhas", "Queimadas anuais"], correct: 1 },
    { text: "14. Qual impacto NÃO está associado ao uso excessivo de agrotóxicos?", options: ["Polinização mais eficiente", "Mortalidade de abelhas", "Resistência de pragas", "Contaminação do leite materno"], correct: 0 },
    { text: "15. Para reduzir o uso de veneno, consumidores podem:", options: ["Exigir alimentos orgânicos e apoiar feiras agroecológicas", "Comprar apenas produtos importados", "Lavar frutas com água sanitária", "Evitar vegetais"], correct: 0 }
];

let userAnswers = new Array(15).fill(null);
let quizChecked = false;

const quizContainer = document.getElementById('quiz-container');
const scoreSpan = document.getElementById('scoreDisplay');
const checkBtn = document.getElementById('checkAllBtn');
const resetBtn = document.getElementById('resetQuizBtn');

function renderQuiz() {
    if (!quizContainer) return;
    quizContainer.innerHTML = '';
    for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        const qDiv = document.createElement('div');
        qDiv.classList.add('question');
        qDiv.setAttribute('data-qidx', i);

        const questionP = document.createElement('p');
        questionP.innerText = q.text;
        qDiv.appendChild(questionP);

        const optsDiv = document.createElement('div');
        optsDiv.classList.add('options');
        
        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.innerText = opt;
            btn.classList.add('option-btn');
            if (userAnswers[i] === idx) {
                btn.style.background = "#e9b35f";
                btn.style.color = "#1a3b2e";
                btn.style.border = "2px solid #c07d2c";
            } else {
                btn.style.background = "#2c5e3f";
                btn.style.color = "white";
            }
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (quizChecked) {
                    quizChecked = false;
                    updateScoreDisplayBasedOnMode();
                }
                userAnswers[i] = idx;
                renderQuiz();
            });
            optsDiv.appendChild(btn);
        });
        qDiv.appendChild(optsDiv);
        
        const feedbackDiv = document.createElement('div');
        feedbackDiv.id = `fb-${i}`;
        feedbackDiv.style.marginTop = "8px";
        qDiv.appendChild(feedbackDiv);
        quizContainer.appendChild(qDiv);
    }
    
    if (quizChecked) {
        for (let i = 0; i < questions.length; i++) {
            const fbDiv = document.getElementById(`fb-${i}`);
            const userChoice = userAnswers[i];
            const correctIdx = questions[i].correct;
            if (fbDiv) {
                if (userChoice === null) {
                    fbDiv.innerHTML = '<div class="wrong-feedback">❌ Não respondida.</div>';
                } else if (userChoice === correctIdx) {
                    fbDiv.innerHTML = '<div class="correct-feedback">✔️ Certo! Resposta correta.</div>';
                } else {
                    const correctText = questions[i].options[correctIdx];
                    fbDiv.innerHTML = `<div class="wrong-feedback">❌ Errado. Alternativa correta: "${correctText}".</div>`;
                }
            }
            const containerDiv = document.querySelector(`.question[data-qidx='${i}']`);
            if (containerDiv) {
                const btns = containerDiv.querySelectorAll('.option-btn');
                btns.forEach((btn, optIndex) => {
                    if (optIndex === correctIdx) {
                        btn.style.background = "#238b4a";
                        btn.style.color = "white";
                        btn.style.border = "2px solid #f9c270";
                    }
                    if (userChoice !== null && optIndex === userChoice && userChoice !== correctIdx) {
                        btn.style.background = "#b52e1a";
                        btn.style.color = "white";
                        btn.style.border = "2px solid #ffa066";
                    } else if (userChoice !== null && optIndex === userChoice && userChoice === correctIdx) {
                        btn.style.background = "#238b4a";
                    } else if (optIndex !== correctIdx && !(userChoice !== null && optIndex === userChoice)) {
                        btn.style.background = "#2c5e3f";
                        btn.style.color = "white";
                    }
                });
            }
        }
    } else {
        for (let i = 0; i < questions.length; i++) {
            const fbDiv = document.getElementById(`fb-${i}`);
            if (fbDiv) fbDiv.innerHTML = '';
            const containerDiv = document.querySelector(`.question[data-qidx='${i}']`);
            if (containerDiv) {
                const btns = containerDiv.querySelectorAll('.option-btn');
                btns.forEach((btn, idx) => {
                    if (userAnswers[i] === idx) {
                        btn.style.background = "#e9b35f";
                        btn.style.color = "#1a3b2e";
                        btn.style.border = "2px solid #c07d2c";
                    } else {
                        btn.style.background = "#2c5e3f";
                        btn.style.color = "white";
                        btn.style.border = "none";
                    }
                });
            }
        }
    }
    updateScoreDisplayBasedOnMode();
}

function computeScore() {
    let correct = 0;
    for (let i = 0; i < questions.length; i++) {
        if (userAnswers[i] !== null && userAnswers[i] === questions[i].correct) correct++;
    }
    return correct;
}

function updateScoreDisplayBasedOnMode() {
    if (quizChecked) {
        const total = computeScore();
        scoreSpan.innerText = `🏆 Pontuação: ${total} / 15`;
    } else {
        const answered = userAnswers.filter(a => a !== null).length;
        scoreSpan.innerText = `📝 Respondidas: ${answered}/15 | Verifique para ver acertos`;
    }
}

function checkAll() {
    quizChecked = true;
    renderQuiz();
    const finalScore = computeScore();
    scoreSpan.innerText = `🏆 Pontuação: ${finalScore} / 15`;
}

function resetQuiz() {
    userAnswers = new Array(15).fill(null);
    quizChecked = false;
    renderQuiz();
    scoreSpan.innerText = `📝 Respondidas: 0/15 | Verifique para ver acertos`;
}

checkBtn.addEventListener('click', checkAll);
resetBtn.addEventListener('click', resetQuiz);

// ============ SISTEMA DE TROCA DE PÁGINAS (NAVEGAÇÃO) =============
const pages = {
    inicio: document.getElementById('page-inicio'),
    impactos: document.getElementById('page-impactos'),
    solucoes: document.getElementById('page-solucoes'),
    quiz: document.getElementById('page-quiz')
};

function showPage(pageId) {
    Object.keys(pages).forEach(id => {
        if (pages[id]) pages[id].classList.remove('active-page-content');
    });
    if (pages[pageId]) pages[pageId].classList.add('active-page-content');
    
    document.querySelectorAll('.nav-links button').forEach(btn => {
        btn.classList.remove('active-page');
        if (btn.getAttribute('data-page') === pageId) {
            btn.classList.add('active-page');
        }
    });
    
    if (pageId === 'quiz' && quizContainer) {
        renderQuiz();
    }
}

document.querySelectorAll('.nav-links button').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const page = btn.getAttribute('data-page');
        if (page) showPage(page);
    });
});

// Inicializar
showPage('inicio');
renderQuiz();
