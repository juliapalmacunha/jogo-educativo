const animal = document.querySelector("[data-animal]");
const imagemAnimal = document.getElementById("animal-image");
const input = document.getElementById("animal-name");
const botaoVerificar = document.getElementById("check-answer");
const mensagem = document.getElementById("sucesso");
const botaoTrocaAnimal = document.getElementById("next-animal");

// Imagens de animais
const imagens = [
  'img/cachorro.png',
  'img/coelho.png',
  'img/esquilo.png',
  'img/zebra.png',
  'img/gato.png',
  'img/leao.png',
  'img/passaro.png',
  'img/peixe.png',
  'img/porco.png',
  'img/rato.png',
  'img/tartaruga.png'
];

// Traduções dos animais
const traducoesAnimais = {
  "cachorro": "dog",
  "coelho": "rabbit",
  "esquilo": "squirrel",
  "zebra": "zebra",
  "gato": "cat",
  "leao": "lion",
  "passaro": "bird",
  "peixe": "fish",
  "porco": "pig",
  "rato": "mouse",
  "tartaruga": "turtle"
};

// Função para pré-carregar as imagens
function preCarregarImagens(imagens) {
  const cacheImagens = [];
  imagens.forEach((src) => {
    const img = new Image();
    img.src = src;
    cacheImagens.push(img);
  });
}

let indiceAtual = 0;

// Função para trocar a imagem
function trocaImagem() {
  indiceAtual = (indiceAtual + 1) % imagens.length;
  imagemAnimal.src = imagens[indiceAtual];
  imagemAnimal.alt = Object.keys(traducoesAnimais)[indiceAtual];
}

// Função para verificar o nome do animal
function verificaAnimal() {
  const urlFoto = imagemAnimal.src;
  const filtroUrlFoto = urlFoto.split('/').pop().split('.')[0].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "");
  const valorInput = input.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "");

  if (filtroUrlFoto === valorInput) {
    input.style.border = "2px solid green";
    mensagem.classList.remove('hidden');
    mensagem.classList.add('visible');
  } else {
    input.style.border = "2px solid red";
    trocandoStyles();
  }
}

// Função para falar o nome do animal
function falarPalavra(palavra) {
  const sintetizador = window.speechSynthesis;
  const fala = new SpeechSynthesisUtterance(palavra);
  fala.lang = 'en-US';
  sintetizador.speak(fala);
}

// Evento de clique na imagem
imagemAnimal.addEventListener("click", (evento) => {
  if (mensagem.classList.contains("visible")) {
    const nome = evento.target.alt;
    const palavra = traducoesAnimais[nome];
    falarPalavra(palavra);
  }
});

// Função para trocar os estilos da mensagem
function trocandoStyles() {
  mensagem.classList.remove('visible');
  mensagem.classList.add('hidden');
}

// Evento para trocar a imagem ao clicar no botão
botaoTrocaAnimal.addEventListener("click", () => {
  trocaImagem();
  trocandoStyles();
  input.style.border = "2px solid #FF6600";
  input.value = "";
});

// Evento de verificação ao clicar no botão
botaoVerificar.addEventListener("click", () => {
  if (!botaoVerificar.disabled) {
    verificaAnimal();
  }
});

// Evento de tecla 'Enter' para verificar o animal
input.addEventListener("keydown", (evento) => {
  if (evento.key === 'Enter') {
    if (!botaoVerificar.disabled) {
      verificaAnimal();
    }
  }
});

// Habilitar/desabilitar o botão verificar em tempo real
let valorAtualInput = input.value;
input.addEventListener("input", (evento) => {
  valorAtualInput = evento.target.value;
  habilitarBotao(valorAtualInput);
});

// Função para habilitar o botão verificar
function habilitarBotao(valor) {
  if (valor === "") {
    botaoVerificar.disabled = true;
  } else {
    botaoVerificar.disabled = false;
  }
}

// Verificando se o botão deve ser habilitado ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  habilitarBotao(valorAtualInput);
  preCarregarImagens(imagens);
});
