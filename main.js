const animal = document.querySelector("[data-animal]")
const imagemAnimal = document.getElementById("animal-image")
const input = document.getElementById("animal-name")
const botaoVerificar = document.getElementById("check-answer")
const mensagem = document.getElementById("sucesso")
const botaoTrocaAnimal = document.getElementById("next-animal")

//troca de imagens
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

//tradução dos animais
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



//função de pre carregando as imagens
function preCarregarImagens(imagens) {
  const cacheImagens = [];
  imagens.forEach((src) => {
    const img = new Image()
    img.src = src 
    cacheImagens.push(img)
  })
}


let indiceAtual = 0
//função para trocar a imagem
function trocaImagem() {
  indiceAtual = (indiceAtual + 1) % imagens.length;
  imagemAnimal.src = imagens[indiceAtual];
  imagemAnimal.alt = Object.keys(traducoesAnimais)[indiceAtual]; 
}


//verificando se botao pode se habilitar
function habilitarBotao(valor) {
  if (valor === "") {
    botaoVerificar.disabled = true
  } else {
    botaoVerificar.disabled = false
  }
}


let acertou = false
//verificando se o nome do animal possui na url
function verificaAnimal() {
  const urlFoto = imagemAnimal.src
  const filtroUrlFoto = urlFoto.split('/').pop().split('.')[0];

  if (filtroUrlFoto === valorAtualInput) {
    input.style.border = "2px solid green"
    mensagem.classList.remove('hidden');
    mensagem.classList.add('visible');
    acertou = true
  } else {
    input.style.border = "2px solid red"
    trocandoStyles()
    acertou = false
  }
}


  imagemAnimal.addEventListener("click", (evento) => {
    if(acertou === true){
      const nome = evento.target.alt
      const palavra = traducoesAnimais[nome]
      falarPalavra(palavra)
    }
  })


//função para trocar os estilos
function trocandoStyles() {
  mensagem.classList.remove('visible');
  mensagem.classList.add('hidden');
}

//funçao para a fala 
function falarPalavra(palavra) {
  const sintetizador = window.speechSynthesis;
  const fala = new SpeechSynthesisUtterance(palavra);
  fala.lang = 'en-US';
  sintetizador.speak(fala);
}


//botao para trocar a imagem
botaoTrocaAnimal.addEventListener("click", () => {
  trocaImagem()
  trocandoStyles()
  input.style.border = "2px solid #FF6600"
  input.value = ""
})


//botao verificar
botaoVerificar.addEventListener("click", () => {
  if (!botaoVerificar.disabled) {
    verificaAnimal()
  }
})

//evento de tecla quando o input esta em foco
input.addEventListener("keydown", (evento) => {
  if (evento.key === 'Enter') {
    if(!botaoVerificar.disabled){
      verificaAnimal()
    } 
}
})

//habilitando botao verificar em tempo real
let valorAtualInput = input.value
input.addEventListener("input", (evento) => {
  valorAtualInput = evento.target.value;
  const inputFiltrado = valorAtualInput.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "");
  valorAtualInput = inputFiltrado
  habilitarBotao(valorAtualInput)
})


//verificando botao habilitado assim que a pagina recarrega
document.addEventListener("DOMContentLoaded", () => {
  habilitarBotao(valorAtualInput);
  preCarregarImagens(imagens)
});










