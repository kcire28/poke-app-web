import { Navigate, createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import LayoutApp from "../LayoutApp";
import { PokemonDetails } from "../pages/PokemonDetails";
import { LoginPage } from "@/pages/Login";
import { AllPokemonsPage } from "@/pages/AllPokemons";
import { PokemonsPage } from "@/pages/Home";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={routes.FAVORITE_POKEMONS} replace />,
  },

  {
    path: routes.HOME,
    element: <LayoutApp />,
    children: [
      {
        index: true,
        path: routes.FAVORITE_POKEMONS,
        element: <PokemonsPage />,
      },
      {
        index: true,
        path: routes.ALL_POKEMONS,
        element: <AllPokemonsPage />,
      },
      {
        index: true,
        path: routes.POKEMON_DETAILS(':id'),
        element: <PokemonDetails />,
      }
    ],
    
  },
  {
    path: routes.LOGIN,
    element: <LoginPage />,
    index: true
  },
])