let listaDeNumerosSecretos = [];
 
 let numeroSecreto = gerarNumeroSecreto();
 console.log(numeroSecreto)
 let tenativas = 1

function escreverTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}
mensagemInicial();

function mensagemInicial() {
escreverTexto('h1', 'jogo do numero secreto');
escreverTexto('p', 'escolha um numero de 1 a 100');}

function verificarChute() {
    let chute = document.querySelector('input').value;
    console.log(numeroSecreto);

    if (numeroSecreto == chute) {
         let palavraTentativa = tenativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `voce acertou em ${tenativas} ${palavraTentativa}`;
        escreverTexto('h1', `parabens, o numero secreto era ${numeroSecreto}`);
        escreverTexto('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            escreverTexto('h1', 'errou!');
            escreverTexto('p', 'menor que isso!');
        } else {
            escreverTexto('h1', 'errou');
            escreverTexto('p', 'maior que isso');
        }
        tenativas++;
        limparCampo();
    } 
}

function limparCampo() {
    let chute = document.querySelector('input');
    chute.value = '';
}

function gerarNumeroSecreto() {
    let numeroGerado = parseInt(Math.random() * 100 + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSecretos.length;
    if (quantidadeDeElementosNaLista == 100) {
        listaDeNumerosSecretos = [];

    }
    if(listaDeNumerosSecretos.includes(numeroGerado)) {
        return gerarNumeroSecreto();
    }
    else {
        listaDeNumerosSecretos.push(numeroGerado);
        console.log(listaDeNumerosSecretos);
        return numeroGerado;
    }
}
function reiniciarJogo() {
    limparCampo();
    tenativas = 1;
    mensagemInicial();
     numeroSecreto = gerarNumeroSecreto();
     document.getElementById('reiniciar').setAttribute('disabled',true);
}