const cards = document.querySelectorAll(".card");

let matched = 0;
let mov = document.getElementById("mov");
let numMov = 0;

let cardOne, cartTwo;
let disableDeck = false;

function flipCard(e) { // fazendo o efeito de virar
  let clickedCard = e.target; // pegando o card clicado
  if (clickedCard !== cardOne && !disableDeck) {
    clickedCard.classList.add("flip"); //adicionando classe .flip à carta clicada
    if (!cardOne) {
      // retorna o valor de cardOne para clickedCard
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disableDeck = true;

    let cardOneImg = cardOne.querySelector("img").src,
    cardTwoImg = cardTwo.querySelector("img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
}

function matchCards(img1, img2) { // verificando se as cartas são iguais ou não
  if (img1 === img2) {
    //se a imagem das duas cartas for igual
    matched++; // adiciona +1 no valor da variável
    numMov = numMov + 1; // adicione mais 1 ao número de movimentos
    mov.innerHTML = numMov;

    // se o valor da variável matchedCard chegar a 8, significa que todas as cartas foram viradas
    if (matched == 8) {
      setTimeout(() => {
        return shuffleCard();
      }, 1000); // chamando a função shuffeCard depois de 1 segundo
    }

    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = ""; // setando o valor das duas cartas para vazio
    return (disableDeck = false);
  }

  // se as duas cartas não forem iguais
  numMov = numMov + 1; // adicione mais 1 ao número de movimentos
  mov.innerHTML = numMov;
  setTimeout(() => {
    // adicione a classe shake às duas cartas depois de 400 milissegundos
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);

  setTimeout(() => {
    // remove a classe shake e flip das duas cartas depois de 1200 milissegundos
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = ""; // setando o valor das duas cartas para vazio
    disableDeck = false;
  }, 1200);
}

function shuffleCard() { // embaralhar e voltar ao início, movimentos 0 e todas as cartas escondidas
  matched = 0;
  numMov = 0;
  mov.innerHTML = numMov;
  cardOne = cartTwo = "";
  disableDeck = false;

  // criando array de 16 itens - onde de 1 a 8 (imagens) - cada item se repete
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1)); // sorteando o array aleatoriamente

  // removendo a classe flip de todas as cartas e passando imagem randomicamente para cada carta
  cards.forEach((card, i) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector("img");
    imgTag.src = `img/img-${arr[i]}.png`;
    card.addEventListener("click", flipCard);
  });
}

shuffleCard();

cards.forEach((card) => {
  // adicionando evento de clique para todos os cartões
  card.addEventListener("click", flipCard);
});
