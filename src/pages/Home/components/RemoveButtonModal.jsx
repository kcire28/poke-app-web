
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
export const RemoveButtonModal = ({ isFavorite, onRemove }) => {
  
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={isFavorite ? 'destructive' : 'outline'} disabled={!isFavorite}>Remove</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to remove the Pokémon from your Pokédex?</AlertDialogTitle>
          <AlertDialogDescription>
          You can undo this action at any time.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onRemove}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}