// Display players active score and the session high score
export default function Scoreboard({ score, bestScore }) {
  return (
    <div className="scoreboard" aria-label="Scoreboard">
      <div className="score-box">
        <span className="score-label">Score</span>
        <span className="score-value">{score}</span>
      </div>
      <div className="score-box">
        <span className="score-label">Best Score</span>
        <span className="score-value">{bestScore}</span>
      </div>
    </div>
  );
}