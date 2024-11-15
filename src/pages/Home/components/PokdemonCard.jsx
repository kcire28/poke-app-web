
import { useTrainerHook } from "@/hooks/useTrainerHook";
import { useSelector } from "react-redux";
import { FavoriteButtonModal } from "./FavoriteModal";
import { RemoveButtonModal } from "./RemoveButtonModal";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { routes } from "@/constants/routes";

export const  PokemonCard = ({ id, imageSrc, title, base_experience, externalId, onSuccessfulRemove }) => {
  const { trainerData } = useSelector(state => state.trainer);
  const { removePokemon } = useTrainerHook()
  const navigate = useNavigate();

  const isFavorite = trainerData?.favorites?.find(favorite => favorite.externalId === externalId);
  return (
    <div className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={imageSrc} alt={title} className="h-48 w-full object-cover" />
      <div className="p-4 flex-1">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">Exp: {base_experience}</p>
      </div>
      <div className="p-4 grid grid-rows-1 grid-flow-col gap-2">
        <Button onClick={() => navigate(routes.POKEMON_DETAILS(externalId))}>Details</Button>
        <RemoveButtonModal onRemove={async() => {
          const response = await removePokemon({ trainerId: trainerData._id, externalPokemonId: externalId })
          if(response.status){
            onSuccessfulRemove()
          }
        }} isFavorite={isFavorite}/>
      </div>
    </div>
  );
}
