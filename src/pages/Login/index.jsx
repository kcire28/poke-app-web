import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { routes } from "@/constants/routes";
import { useToast } from "@/hooks/use-toast";
import { useTrainerHook } from "@/hooks/useTrainerHook";
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Aperture } from 'lucide-react';

const authStatus = {
  VERIFIED: 'VERIFIED',
  NOT_VERIFIED: 'NOT_VERIFIED',
  ERROR: 'ERROR'
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(false);
  const { toast } = useToast();
  const [attemptStatus, setVerified] = useState(authStatus.NOT_VERIFIED);
  const { verify, create } = useTrainerHook();
  const emailRef = useRef(null);
  const nameRef = useRef(null);

  const [emailError, setEmailError] = useState('');

  const redirectToHome = () => {
    navigate(routes.FAVORITE_POKEMONS);
  };

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleButtonClick = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const name = nameRef?.current?.value;

    // Validar correo
    if (!isValidEmail(email)) {
      setEmailError('Por favor ingrese un correo válido');
      return;
    } else {
      setEmailError('');
    }

    if (attemptStatus === authStatus.NOT_VERIFIED) {
      setVerifying(true);
      const { status } = await verify({ email });
      if (status) {
        setVerified(authStatus.VERIFIED);
        redirectToHome();
      } else {
        setVerified(authStatus.ERROR);
        toast({
          title: "Entrenador no encontrado",
          variant: 'destructive'
        });
      }
      setVerifying(false);
    } else if (attemptStatus === authStatus.ERROR) {
      setVerifying(true);
      const { status } = await create({ email, name });
      if (status) {
        setVerified(authStatus.VERIFIED);
        redirectToHome();
      } else {
        setVerified(authStatus.ERROR);
        toast({
          title: "No se pudo registrar",
          variant: 'destructive'
        });
      }
      setVerifying(false);
    }
  };

  const handleEmailChange = () => {
    if (verifying) {
      setVerifying(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full sm:w-96 p-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">PokeApp</CardTitle>
          <div className="flex justify-center mt-4">
            <Aperture className="text-gray-600" />
          </div>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-6">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="email" className="text-lg">Ingrese correo</Label>
                <Input
                  id="email"
                  ref={emailRef}
                  placeholder="Ingrese correo"
                  className="text-lg p-3"
                  onChange={handleEmailChange}
                />
                {emailError && (
                  <p className="text-red-500 text-sm">{emailError}</p>
                )}
              </div>
              {
                attemptStatus === authStatus.ERROR && !verifying && (
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="name" className="text-lg">Nick name</Label>
                    <Input id="name" ref={nameRef} placeholder="Ingrese un Nick name" className="text-lg p-3" />
                  </div>
                )
              }
              <div className="flex flex-col space-y-2">
                <Button disabled={verifying} onClick={handleButtonClick} className="text-xl py-3">
                  {verifying && <Loader2 className="animate-spin mr-2" />}
                  {attemptStatus === authStatus.ERROR ? 'Registrarse' : 'Verificar'}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
