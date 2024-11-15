import { Link, Outlet, useNavigate } from "react-router-dom";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "./components/ui/navigation-menu";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { authStatus } from "./constants/auth";
import { SpinnerPage } from "./pages/Spinner";
import { routes } from "./constants/routes";
import { useTrainerHook } from "./hooks/useTrainerHook";
import { BookHeart , Power, User, Earth } from 'lucide-react'; // Importa el icono Power de lucide

function LayoutApp() {
  const navigate = useNavigate();  
  const { verify, logOut } = useTrainerHook();
  const trainerSlice = useSelector((state) => state.trainer);

  useEffect(() => {
    verify({ email: trainerSlice.trainerData.email });
  }, []);

  if (trainerSlice.status === authStatus.VERIFYING) {
    return <SpinnerPage />;
  }

  if (trainerSlice.status === authStatus.UNAUTHENTICATED) {
    navigate(routes.LOGIN);
  }

  return (
    <React.Fragment>
      <NavigationMenu className="bg-gray-800 p-4 max-w-none mx-auto flex justify-between items-center">
        <NavigationMenuList className="flex space-x-6">
          <NavigationMenuItem>
            <Link to={routes.FAVORITE_POKEMONS} className="text-white hover:text-orange-400  flex items-center" title="Check your pokédex">
            <BookHeart className="mr-2"/>
              My pokedex
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            {/* Icono y texto en una sola línea */}
            <Link to={routes.ALL_POKEMONS} className="text-white hover:text-orange-400 flex items-center" title="Catch a new one in the Pokémon universe!">
              <Earth className="mr-2" /> {/* Ajusta el espacio entre el icono y el texto */}
              Catch a pokemon!
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>

        <div className="ml-auto flex items-center space-x-4">
        <div className="text-white flex items-center" align="center">
            <User className="align-middle mr-2" />
            {trainerSlice?.trainerData?.name}
          </div>
          <NavigationMenuItem>
            <Link onClick={logOut} className="text-white hover:text-orange-400" title="Log out of your account">
              <Power className="mr-2 align-middle" style={{ marginTop: -20 }} /> {/* Alineación del icono */}
            </Link>
          </NavigationMenuItem>
       
        </div>
      </NavigationMenu>
      <div className="w-full">
        <Outlet />
      </div>
    </React.Fragment>
  );
}

export default LayoutApp;
