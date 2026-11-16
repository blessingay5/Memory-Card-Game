// Maps over the shuffled cards array, passing each item's stable card.id as the React key
import Card from "./card";
import "../styles/card.css";

export default function CardGrid({ cards, onCardClick }) {
  return (
    <main className="card-grid">
      {cards.map((card) => (
        <Card key={card.id} card={card} onCardClick={onCardClick} />
      ))}
    </main>
  );
}