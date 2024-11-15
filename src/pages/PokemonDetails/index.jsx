import { PokemonsService } from "@/services/pokemons.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);

  const fetchDetails = async () => {
    const pokemonService = new PokemonsService();
    const response = await pokemonService.getPokemonDetails(id);
    setPokemonDetails(response.data.pokemon);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden max-w-sm w-full">
        <img
          src={pokemonDetails?.image}
          alt={pokemonDetails?.name}
          className="w-full object-cover"
        />
        <div className="p-4 flex-1 text-center">
          <h3 className="text-lg font-semibold mb-2">{pokemonDetails?.name}</h3>
          <p className="text-gray-600 mb-4">{pokemonDetails?.name}</p>

          {/* Base Experience */}
          <div className="mb-4">
            <h4 className="font-semibold">Base Experience</h4>
            <p>{pokemonDetails?.base_experience}</p>
          </div>

          {/* Abilities */}
          <div className="mb-4">
            <h4 className="font-semibold">Abilities</h4>
            <ul>
              {pokemonDetails?.abilities.map((ability, index) => (
                <li key={index}>
                  <a
                    href={ability.ability.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {ability.ability.name}
                  </a>
                  {ability.is_hidden && <span> (Hidden)</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
