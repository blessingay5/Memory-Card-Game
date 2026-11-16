// show the title, a precise one rule reminder, and an inbuilt score counter
import Scoreboard from "./Scoreboard";
import "../styles/Header.css";

export default function Header({ score, bestScore }) {
  return (
    <header className="game-header">
      <div className="header-title-group">
        <h1>PokéMemory</h1>
        <p>
          Click each Pokémon once to earn points—clicking one twice resets your
          score!
        </p>
      </div>
      <Scoreboard score={score} bestScore={bestScore} />
    </header>
  );
}