const POKEMON_IDS = [1, 4, 7, 25, 39, 52, 54, 94, 133, 143, 150, 151];

export async function fetchPokemonCards() {
  const requests = POKEMON_IDS.map(async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon with ID: ${id}`);
    }

    const data = await response.json();

    return {
      id: data.id,
      name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
      image:
        data.sprites.other["official-artwork"].front_default ||
        data.sprites.front_default,
    };
  });

  return Promise.all(requests);
}
