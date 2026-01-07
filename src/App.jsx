import { useState } from "react";

const emojis = ["🐶", "🐶", "🦴", "🦴", "🐾", "🐾", "❤️", "❤️"];

// simple shuffle
const shuffleArray = (array) =>
  [...array].sort(() => Math.random() - 0.5);

export default function App() {
  const [cards, setCards] = useState(
    shuffleArray(emojis).map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }))
  );

  const [flippedCards, setFlippedCards] = useState([]);

  const handleCardClick = (id) => {
    const clickedCard = cards.find((card) => card.id === id);

    if (
      clickedCard.isFlipped ||
      clickedCard.isMatched ||
      flippedCards.length === 2
    ) {
      return;
    }

    const newCards = cards.map((card) =>
      card.id === id ? { ...card, isFlipped: true } : card
    );

    const newFlipped = [...flippedCards, clickedCard];

    setCards(newCards);
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      checkForMatch(newFlipped, newCards);
    }
  };

  const checkForMatch = (flipped, currentCards) => {
    const [first, second] = flipped;

    if (first.emoji === second.emoji) {
      setCards(
        currentCards.map((card) =>
          card.emoji === first.emoji
            ? { ...card, isMatched: true }
            : card
        )
      );
      setFlippedCards([]);
    } else {
      setTimeout(() => {
        setCards(
          currentCards.map((card) =>
            card.isMatched ? card : { ...card, isFlipped: false }
          )
        );
        setFlippedCards([]);
      }, 800);
    }
  };

  const hasWon = cards.every((card) => card.isMatched);

  return (
    <div style={styles.container}>
      <h1>Corgi Memory Match 🐶</h1>

      <div style={styles.grid}>
        {cards.map((card) => (
          <div
            key={card.id}
            style={styles.card}
            onClick={() => handleCardClick(card.id)}
          >
            {card.isFlipped || card.isMatched ? card.emoji : "❓"}
          </div>
        ))}
      </div>

      {hasWon && <h2>You win! 🎉</h2>}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    marginTop: "40px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 80px)",
    gap: "10px",
    justifyContent: "center",
    marginTop: "20px",
  },
  card: {
    width: "80px",
    height: "80px",
    fontSize: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffe0b2",
    borderRadius: "10px",
    cursor: "pointer",
    userSelect: "none",
  },
};
