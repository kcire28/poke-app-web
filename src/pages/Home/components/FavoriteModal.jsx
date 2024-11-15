import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export const FavoriteButtonModal = ({ isFavorite, onAdd }) => {
  
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={isFavorite}>{
            isFavorite ? 'You already have it' : 'Catch it!' 
          }</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to add this Pokémon to Favorites?</AlertDialogTitle>
          <AlertDialogDescription>
            You can undo this action at any time.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isFavorite} onClick={onAdd}>Add</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
