import { useState } from "react";
import "./App.css";

const cards = [
  { name: "Apple", order: Math.floor(Math.random() * 16), icon: "/apple.jpg" },
  { name: "Apple", order: Math.floor(Math.random() * 16), icon: "/apple.jpg" },
  {
    name: "Banana",
    order: Math.floor(Math.random() * 16),
    icon: "/banana.jpg",
  },
  {
    name: "Banana",
    order: Math.floor(Math.random() * 16),
    icon: "/banana.jpg",
  },
  {
    name: "Cherry",
    order: Math.floor(Math.random() * 16),
    icon: "/cherry.jpg",
  },
  {
    name: "Cherry",
    order: Math.floor(Math.random() * 16),
    icon: "/cherry.jpg",
  },
  {
    name: "Coconut",
    order: Math.floor(Math.random() * 16),
    icon: "/coconut.jpg",
  },
  {
    name: "Coconut",
    order: Math.floor(Math.random() * 16),
    icon: "/coconut.jpg",
  },
  {
    name: "Grapes",
    order: Math.floor(Math.random() * 16),
    icon: "/grapes.jpg",
  },
  {
    name: "Grapes",
    order: Math.floor(Math.random() * 16),
    icon: "/grapes.jpg",
  },
  { name: "Lemon", order: Math.floor(Math.random() * 16), icon: "/lemon.jpg" },
  { name: "Lemon", order: Math.floor(Math.random() * 16), icon: "/lemon.jpg" },
  {
    name: "Muskmelon",
    order: Math.floor(Math.random() * 16),
    icon: "/muskmelon.jpg",
  },
  {
    name: "Muskmelon",
    order: Math.floor(Math.random() * 16),
    icon: "/muskmelon.jpg",
  },
  {
    name: "Watermelon",
    order: Math.floor(Math.random() * 16),
    icon: "/watermelon.jpg",
  },
  {
    name: "Watermelon",
    order: Math.floor(Math.random() * 16),
    icon: "/watermelon.jpg",
  },
];

function App() {
  const [hasFlipped, setHasFlipped] = useState(false);
  const [firstCard, setFirstCard] = useState<(typeof cards)[number] | null>(
    null
  );
  const [secondCard, setSecondCard] = useState<(typeof cards)[number] | null>(
    null
  );
  const [disabledCards, setDisabledCards] = useState<string[]>([]);
  const [boardLocked, setBoardLocked] = useState(false);

  function reset() {
    setHasFlipped(false);
    setBoardLocked(false);
    setFirstCard(null);
    setSecondCard(null);
  }

  function flipCard(index: number) {
    if (boardLocked) {
      return;
    }

    if (firstCard === cards[index]) {
      return;
    }

    if (disabledCards.includes(cards[index].name)) {
      return;
    }

    if (!hasFlipped) {
      setHasFlipped(true);
      setFirstCard(cards[index]);
    } else {
      setSecondCard(cards[index]);

      const isMatch = firstCard?.name === cards[index].name;

      if (isMatch) {
        // Disable cards
        setDisabledCards((prev) => prev.concat(firstCard?.name as string));
        reset();
      } else {
        setBoardLocked(true);
        setTimeout(reset, 500);
      }
    }
  }

  return (
    <section>
      <div className="board">
        {cards.map(function (card, index) {
          return (
            <div
              key={index}
              className={`card ${
                disabledCards.includes(card.name) ||
                firstCard === card ||
                secondCard === card
                  ? "flip"
                  : ""
              }`}
              style={{
                order: card.order,
              }}
              onClick={function () {
                flipCard(index);
              }}
            >
              <img src={card.icon} className="front" />
              <img src="/brain.svg" className="back" />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default App;
