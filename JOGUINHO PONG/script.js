//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadexBolinha = 5;
let velocidadeyBolinha = 5;

//variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variaveis  do oponente
let xRaqueteOponente = 585; 
let yRaqueteOponente = 150;
let velocidadeYOponente;


let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetadaSom;
let pontoSom;
let trilhaSonora;

//chance de errar do oponente
let chanceDeErrar = 0;

function preload(){
  trilhaSonora = loadSound("trilha.mp3");
  pontoSom = loadSound("ponto.mp3");
  raquetadaSom = loadSound("raquetada.mp3");
}


function setup() {
  createCanvas(600, 400);
  trilhaSonora.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente); 
  incluiPlacar();
  marcaPontos();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadexBolinha; 
  yBolinha += velocidadeyBolinha;
}

function verificaColisaoBorda(){ 
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadexBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeyBolinha *= -1;
  }  
}

function mostraRaquete(x, y){
   rect(x, y, raqueteComprimento, raqueteAltura);
  
}


function movimentaMinhaRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -=  10;
  }
  
  if(keyIsDown(DOWN_ARROW)){
    yRaquete +=  10;
  }  
}

function verificaColisaoRaquete(){
  if(xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete ){
    velocidadexBolinha *= -1;
    raquetadaSom.play();
  }
}

function verificaColisaoRaquete(x, y){
  
   colidiu = collideRectCircle (x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio, );
  if(colidiu){
    velocidadexBolinha *= -1;
    raquetadaSom.play();
  }
}



function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar();
}

function incluiPlacar(){
  stroke(150);
  textAlign(CENTER);
  textSize(16)
  fill(color(255,14, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255,14, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26);
  
}

function marcaPontos(){
  if(xBolinha > 590 ){
    meusPontos +=   1;
    pontoSom.play();
  }
  
  if(xBolinha < 10){
    pontosDoOponente += 1;
    pontoSom.play();
  }
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

