class QuizFutebol {
    constructor() {
        this.perguntas = [
            {
                pergunta: "Onde nasceu o futebol moderno?",
                opcoes: ["Brasil", "Inglaterra", "Alemanha", "França"],
                resposta: 1,
                explicacao: "O futebol moderno nasceu no século XIX na Inglaterra."
            },
            {
                pergunta: "Em que ano foi fundada a FIFA?",
                opcoes: ["1880", "1904", "1920", "1930"],
                resposta: 1,
                explicacao: "A FIFA (Federação Internacional de Futebol) foi fundada em 1904."
            },
            {
                pergunta: "Quantos jogadores cada time tem em campo no início de uma partida?",
                opcoes: ["10", "11", "12", "9"],
                resposta: 1,
                explicacao: "Cada time tem 11 jogadores em campo (incluindo o goleiro)."
            },
            {
                pergunta: "Qual é a duração normal de uma partida de futebol?",
                opcoes: ["60 minutos", "80 minutos", "90 minutos", "100 minutos"],
                resposta: 2,
                explicacao: "Uma partida dura 90 minutos (dois tempos de 45 minutos), mais acréscimos."
            },
            {
                pergunta: "Onde foi realizada a primeira Copa do Mundo?",
                opcoes: ["Brasil", "Uruguai", "Itália", "França"],
                resposta: 1,
                explicacao: "A primeira Copa do Mundo FIFA foi realizada em 1930, no Uruguai."
            }
        ];

        this.perguntaAtual = 0;
        this.pontuacao = 0;
        this.respostaSelecionada = null;
        this.quizFinalizado = false;

        this.inicializarElementos();
        this.adicionarEventListeners();
    }

    inicializarElementos() {
        this.telaInicio = document.getElementById('tela-inicio');
        this.telaQuiz = document.getElementById('tela-quiz');
        this.telaResultado = document.getElementById('tela-resultado');
        this.modalPartida = document.getElementById('modal-partida');

        this.btnIniciar = document.getElementById('btn-iniciar');
        this.btnProxima = document.getElementById('btn-proxima');
        this.btnReiniciar = document.getElementById('btn-reiniciar');
        this.btnSimular = document.getElementById('btn-simular');

        this.textoPergunta = document.getElementById('texto-pergunta');
        this.opcoesContainer = document.getElementById('opcoes-container');
        this.contadorPergunta = document.getElementById('contador-pergunta');
        this.pontuacaoAtual = document.getElementById('pontuacao-atual');
        this.progressoBarra = document.getElementById('progresso-barra');

        this.pontuacaoFinal = document.getElementById('pontuacao-final');
        this.totalPerguntas = document.getElementById('total-perguntas');
        this.mensagemResultado = document.getElementById('mensagem-resultado');
        this.tabelaEstatisticas = document.getElementById('tabela-estatisticas');
        this.resultadoPartida = document.getElementById('resultado-partida');
    }

    adicionarEventListeners() {
        this.btnIniciar.addEventListener('click', () => this.iniciarQuiz());
        this.btnProxima.addEventListener('click', () => this.proximaPergunta());
        this.btnReiniciar.addEventListener('click', () => this.reiniciarQuiz());
        this.btnSimular.addEventListener('click', () => this.simularPartida());

        // Fechar modal
        document.querySelector('.fechar').addEventListener('click', () => {
            this.modalPartida.style.display = 'none';
        });

        // Fechar modal clicando fora
        window.addEventListener('click', (event) => {
            if (event.target === this.modalPartida) {
                this.modalPartida.style.display = 'none';
            }
        });
    }

    iniciarQuiz() {
        this.perguntaAtual = 0;
        this.pontuacao = 0;
        this.quizFinalizado = false;
        
        this.telaInicio.classList.remove('ativa');
        this.telaQuiz.classList.add('ativa');
        this.telaResultado.classList.remove('ativa');
        
        this.atualizarPontuacao();
        this.mostrarPergunta();
    }

    mostrarPergunta() {
        const pergunta = this.perguntas[this.perguntaAtual];
        
        this.textoPergunta.textContent = pergunta.pergunta;
        this.contadorPergunta.textContent = `Pergunta ${this.perguntaAtual + 1}/${this.perguntas.length}`;
        
        // Atualizar barra de progresso
        const progresso = ((this.perguntaAtual) / this.perguntas.length) * 100;
        this.progressoBarra.style.width = `${progresso}%`;
        
        // Limpar opções anteriores
        this.opcoesContainer.innerHTML = '';
        
        // Adicionar novas opções
        pergunta.opcoes.forEach((opcao, index) => {
            const botaoOpcao = document.createElement('button');
            botaoOpcao.className = 'opcao-btn';
            botaoOpcao.textContent = opcao;
            botaoOpcao.addEventListener('click', () => this.selecionarResposta(index));
            this.opcoesContainer.appendChild(botaoOpcao);
        });
        
        this.btnProxima.disabled = true;
        this.respostaSelecionada = null;
    }

    selecionarResposta(indice) {
        // Remover seleção anterior
        const opcoes = this.opcoesContainer.querySelectorAll('.opcao-btn');
        opcoes.forEach(opcao => opcao.classList.remove('selecionada'));
        
        // Marcar opção selecionada
        opcoes[indice].classList.add('selecionada');
        
        this.respostaSelecionada = indice;
        this.btnProxima.disabled = false;
    }

    proximaPergunta() {
        if (this.respostaSelecionada === null) return;

        const pergunta = this.perguntas[this.perguntaAtual];
        const opcoes = this.opcoesContainer.querySelectorAll('.opcao-btn');
        
        // Mostrar resposta correta/incorreta
        opcoes.forEach((opcao, index) => {
            opcao.disabled = true;
            if (index === pergunta.resposta) {
                opcao.classList.add('correta');
            } else if (index === this.respostaSelecionada && index !== pergunta.resposta) {
                opcao.classList.add('incorreta');
            }
        });

        // Verificar resposta
        if (this.respostaSelecionada === pergunta.resposta) {
            this.pontuacao++;
            this.atualizarPontuacao();
        }

        // Aguardar um pouco antes de próxima pergunta
        setTimeout(() => {
            this.perguntaAtual++;
            
            if (this.perguntaAtual < this.perguntas.length) {
                this.mostrarPergunta();
            } else {
                this.finalizarQuiz();
            }
        }, 1500);
    }

    atualizarPontuacao() {
        this.pontuacaoAtual.textContent = this.pontuacao;
    }

    finalizarQuiz() {
        this.quizFinalizado = true;
        
        this.telaQuiz.classList.remove('ativa');
        this.telaResultado.classList.add('ativa');
        
        this.pontuacaoFinal.textContent = this.pontuacao;
        this.totalPerguntas.textContent = this.perguntas.length;
        
        const percentual = (this.pontuacao / this.perguntas.length) * 100;
        let mensagem = '';
        
        if (percentual === 100) {
            mensagem = '🏆 Excelente! Você é um expert em futebol!';
        } else if (percentual >= 70) {
            mensagem = '👍 Muito bom! Você conhece bem o futebol!';
        } else if (percentual >= 50) {
            mensagem = '👌 Bom conhecimento, mas pode melhorar!';
        } else {
            mensagem = '📚 Continue estudando sobre futebol!';
        }
        
        this.mensagemResultado.textContent = mensagem;
        this.mostrarEstatisticas();
    }

    mostrarEstatisticas() {
        const teams = {
            'Flamengo': [2, 1, 3, 0, 2],
            'Palmeiras': [1, 0, 2, 2, 1],
            'Manchester City': [3, 2, 2, 1, 4],
            'Real Madrid': [2, 2, 1, 3, 2]
        };

        let html = `
            <table class="tabela-estatisticas">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Jogos</th>
                        <th>Total Gols</th>
                        <th>Média</th>
                    </tr>
                </thead>
                <tbody>
        `;

        Object.entries(teams).forEach(([time, gols]) => {
            const totalGols = gols.reduce((sum, gol) => sum + gol, 0);
            const media = (totalGols / gols.length).toFixed(2);
            
            html += `
                <tr>
                    <td>${time}</td>
                    <td>${gols.length}</td>
                    <td>${totalGols}</td>
                    <td>${media}</td>
                </tr>
            `;
        });

        html += `
                </tbody>
            </table>
        `;

        this.tabelaEstatisticas.innerHTML = html;
    }

    simularPartida() {
        const times = ['Flamengo', 'Palmeiras', 'Manchester City', 'Real Madrid', 'Barcelona', 'Bayern Munich'];
        const time1 = times[Math.floor(Math.random() * times.length)];
        let time2 = times[Math.floor(Math.random() * times.length)];
        
        // Garantir que os times sejam diferentes
        while (time2 === time1) {
            time2 = times[Math.floor(Math.random() * times.length)];
        }
        
        const gols1 = Math.floor(Math.random() * 6);
        const gols2 = Math.floor(Math.random() * 6);
        
        let resultadoHTML = `
            <div class="times">
                <div class="time time-casa">
                    <strong>${time1}</strong>
                    <span class="gols">${gols1}</span>
                </div>
                <div class="vs">VS</div>
                <div class="time time-visitante">
                    <strong>${time2}</strong>
                    <span class="gols">${gols2}</span>
                </div>
            </div>
            <div class="placar-final">
                <strong>Placar Final: ${gols1} - ${gols2}</strong>
            </div>
        `;
        
        if (gols1 > gols2) {
            resultadoHTML += `<div class="vencedor">🏆 Vencedor: ${time1}</div>`;
        } else if (gols2 > gols1) {
            resultadoHTML += `<div class="vencedor">🏆 Vencedor: ${time2}</div>`;
        } else {
            resultadoHTML += `<div class="vencedor">🤝 Empate!</div>`;
        }
        
        this.resultadoPartida.innerHTML = resultadoHTML;
        this.modalPartida.style.display = 'block';
    }

    reiniciarQuiz() {
        this.iniciarQuiz();
    }
}

// Inicializar o quiz quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new QuizFutebol();
});