
import { useTrainerHook } from "@/hooks/useTrainerHook";
import { FavoriteButtonModal } from "@/pages/Home/components/FavoriteModal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const NonFavoritePokemonCard = ({ id, imageSrc, title, base_experience, externalId, onSuccessfulAdd }) => {
  const { trainerData } = useSelector(state => state.trainer);
  const { addPokemon } = useTrainerHook()
  const navigate = useNavigate();

  const isFavorite = trainerData?.favorites?.find(favorite => favorite.externalId === externalId);
  return (
    <div className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={imageSrc} alt={title} className="h-48 w-full object-cover" />
      <div className="p-4 flex-1">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">Exp:{base_experience}</p>
      </div>
      <div className="p-4 grid grid-rows-1 grid-flow-col gap-2">
        <FavoriteButtonModal onAdd={async() => {
          const response = await addPokemon({ trainerId: trainerData._id, pokemonId: externalId })
          if(response.status){
            onSuccessfulAdd()
          }
        }} isFavorite={isFavorite}/>
      </div>
    </div>
  );
}
