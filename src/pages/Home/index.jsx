import { Container } from "@/components/common/Container";
import { PokemonCard } from "./components/PokdemonCard";
import { useEffect, useState } from "react";
import { PokemonsService } from "@/services/pokemons.service";
import { useSelector } from "react-redux";

export const PokemonsPage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const { trainerData } = useSelector((state) => state.trainer);
  const fetchTrainerPokemons = async () => {
    const service = new PokemonsService();
    const { data, status} = await service.getTrainerPokemons({
      trainerId: trainerData._id,
      limit: 10,
      page: 1
    });
    if(!status){
      return
    }
    setPokemonList(data.favorites ?? []);

  }
  useEffect(() => {
    fetchTrainerPokemons();
  },[])
  return (
    <div>
      <Container>
        {pokemonList.map((pokemon) => (
          <PokemonCard
            key={pokemon._id}
            id={pokemon._id}
            externalId={pokemon.externalId}
            imageSrc={pokemon.image}
            title={pokemon.name}
            base_experience={pokemon.base_experience}
            onSuccessfulRemove={fetchTrainerPokemons}
          />
        ))}
    </Container>
    </div>
  );
}