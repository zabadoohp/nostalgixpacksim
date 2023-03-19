async function fetchCards() {
  const response = await fetch('cards.json');
  const cards = await response.json();
  return cards;
}

function filterCardsByRarity(cards, rarity) {
  return cards.filter(card => card.rarity === rarity);
}

async function openPack() {
  const cards = await fetchCards();
  const commonCards = filterCardsByRarity(cards, 'common');
  const uncommonCards = filterCardsByRarity(cards, 'uncommon');
  const rareCards = filterCardsByRarity(cards, 'rare');

  const pack = getRandomCards(commonCards, 6)
    .concat(getRandomCards(uncommonCards, 3))
    .concat(getRandomCards(rareCards, 1));

  displayPack(pack);
}

function getRandomCards(cards, count) {
  return Array.from({ length: count }, () => cards[Math.floor(Math.random() * cards.length)]);
}

function displayPack(pack) {
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = '';

  pack.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');

    const cardImage = document.createElement('img');
    cardImage.src = card.image;
    cardImage.alt = card.name;
    cardElement.appendChild(cardImage);

    const cardName = document.createElement('p');
    cardName.innerText = card.name;
    cardElement.appendChild(cardName);

    cardContainer.appendChild(cardElement);
  });
}

document.getElementById('open-pack-btn').addEventListener('click', openPack);
