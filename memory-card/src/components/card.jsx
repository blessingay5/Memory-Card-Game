// create a card component that takes in a prop called card and displays the card's image and name. The card prop is an object with the following shape: { id: number, name: string, image: string }
export default function Card({ card, onCardClick }) {
  return (
    <button
      type="button"
      className="memory-card"
      onClick={() => onCardClick(card.id)}
      aria-label={`Select ${card.name}`}
    >
      <div className="card-image-wrapper">
        <img src={card.image} alt={card.name} loading="lazy" />
      </div>
      <span className="card-name">{card.name}</span>
    </button>
  );
}