import { Container } from "@/components/common/Container";
import { PokemonsService } from "@/services/pokemons.service";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NonFavoritePokemonCard } from "./components/NonFavoritePokemonCard";
import { Button } from "@/components/ui/button";


export const AllPokemonsPage = () => {
  const { trainerData } = useSelector((state) => state.trainer);
  const [nonFavoritePokemons, setNonFavoritePokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(200);
  const [isSyncing, setIsSyncing] = useState(false);

  const fetchNonFavoritePokemons = async () => {
    const service = new PokemonsService();
    const { data, status } = await service.getNonFavoritePoekemons({
      trainerId: trainerData._id,
      limit,
      page,
    });
    setNonFavoritePokemons(data.pokemons ?? []);
    setPage(data.page);
    setLimit(data.limit);
  };

  const syncPokemons = () => {
    const service = new PokemonsService();
    setIsSyncing(true);
    service.syncPokemons()
      .then((response) => {
          console.log("Pokémon sincronizados exitosamente");
          fetchNonFavoritePokemons();
      })
      .catch((error) => {
        console.error("Error en la solicitud de sincronización", error);
      })
      .finally(() => {
        setIsSyncing(false);
      });
  };

  useEffect(() => {
    fetchNonFavoritePokemons();
  }, []);

  return (
    <div>

      <div className="flex justify-center mt-5 mb-5">

        <Button onClick={syncPokemons}
          disabled={isSyncing}>
          {isSyncing ? "Synchronizing..." : "Synchronize Pokémons"}
        </Button>

      </div>

      <Container>

        {/* Mostrar las tarjetas de Pokémon */}
        {nonFavoritePokemons.map((pokemon) => (
          <NonFavoritePokemonCard
            key={pokemon._id}
            id={pokemon._id}
            externalId={pokemon.externalId}
            imageSrc={pokemon.image}
            title={pokemon.name}
            base_experience={pokemon.base_experience}
            onSuccessfulAdd={fetchNonFavoritePokemons}
          />
        ))}
      </Container>
    </div>
  );
};
