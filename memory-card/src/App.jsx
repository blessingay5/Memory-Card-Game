import { useEffect, useState } from "react";
import Header from "./components/Header";
import CardGrid from "./components/cardGrid";
import { fetchPokemonCards } from "./utils/api";
import { shuffleArray } from "./utils/shuffle";

export default function App() {
  const [cards, setCards] = useState([]);
  const [clickedIds, setClickedIds] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Derived state: current score is always the number of unique cards clicked
  const score = clickedIds.length;
  const hasWon = cards.length > 0 && score === cards.length;

  useEffect(() => {
    let ignore = false;

    async function loadCards() {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedCards = await fetchPokemonCards();

        if (!ignore) {
          setCards(shuffleArray(fetchedCards));
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Something went wrong loading Pokémon.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadCards();

    return () => {
      ignore = true;
    };
  }, []);

  function handleCardClick(id) {
    // Player clicked a card they already selected -> Game Over / Reset streak
    if (clickedIds.includes(id)) {
      setClickedIds([]);
      setCards((prevCards) => shuffleArray(prevCards));
      return;
    }

    // New unique card clicked -> Update streak, high score, and shuffle
    const nextClickedIds = [...clickedIds, id];
    const nextScore = nextClickedIds.length;

    setClickedIds(nextClickedIds);
    if (nextScore > bestScore) {
      setBestScore(nextScore);
    }

    setCards((prevCards) => shuffleArray(prevCards));
  }

  function handlePlayAgain() {
    setClickedIds([]);
    setCards((prevCards) => shuffleArray(prevCards));
  }

  return (
    <div className="app-container">
      <Header score={score} bestScore={bestScore} />

      {isLoading && <p className="status-message">Catching Pokémon...</p>}

      {error && (
        <div className="status-message error">
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && hasWon && (
        <div className="win-banner" role="status">
          <h2>Perfect Memory! You caught all {cards.length} Pokémon!</h2>
          <button type="button" onClick={handlePlayAgain}>
            Play Again
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <CardGrid cards={cards} onCardClick={handleCardClick} />
      )}
    </div>
  );
}
