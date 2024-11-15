import { authStatus } from "@/constants/auth"
import { changeStatus, onAddPokemon, onAuthenticated, onCreateTrainer, onLogOut, onRemovePokemon } from "@/redux/slices/trainerSlice"
import { TrainerService } from "@/services/trainer.service"
import { useDispatch, useSelector } from "react-redux"

export const useTrainerHook = () => {
  const dispatch = useDispatch()
  const trainerSlice = useSelector((state) => state.trainer)

  const logOut = () => {
    dispatch(onLogOut())
  }
  const verify = async ({ email }) => {
    dispatch(changeStatus(authStatus.VERIFYING))
    if (!email) {
      dispatch(onLogOut())
      return
    }
    try {
      const trainerService = new TrainerService();
      const response = await trainerService.verify({ email });
      if (response.status) {
        dispatch(onAuthenticated(response.data.trainer))
      } else {
        dispatch(onLogOut())
      }
      return response
    } catch (err) {
      console.log('ERROR', err)
      dispatch(onLogOut())
    }
  }

  const create = async ({ email, name }) => {
    dispatch(changeStatus(authStatus.CREATING))
    try {
      const trainerService = new TrainerService();
      const response = await trainerService.create({ email, name });
      if (response.status) {
        dispatch(onCreateTrainer(response.data.trainer))
      } else {
        dispatch(onLogOut())
      }
      return response
    } catch (err) {
      console.log('ERROR', err)
      dispatch(onLogOut())
    }
  }

  const addPokemon = async ({ trainerId,
    pokemonId }) => {
    try {
      const trainerService = new TrainerService();
      const response = await trainerService.addPokemon({
        trainerId,
        pokemonId
      });
      if (response.status) {
        dispatch(onAddPokemon(response.data.trainer.favorites))
      }
      return response
    } catch (err) {
      console.log('ERROR', err)
    }
  }

  const removePokemon = async ({ trainerId, externalPokemonId }) => {
    try {
      const trainerService = new TrainerService();
      const response = await trainerService.removePokemon({
        trainerId,
        externalId: externalPokemonId
      });
      if (response.status) {
        console.log('REMOVE RESPONSE', response)
        // dispatch(onRemovePokemon(response.data.trainer.favorites))
      }
      return response
    } catch (err) {
      console.log('ERROR', err)
    }
  }


  return {
    create,
    verify,
    addPokemon,
    logOut,
    removePokemon
  }
}