"use client";
import { useState, useActionState } from "react";
import Image from "next/image";

// NextAuth
import { signIn } from "@/lib/actions/auth.action";

// UI
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Icons
import { EyeClosed, Eye } from "lucide-react";
import { SubmitButton } from "../ui/submit-button/submit-button";

const Login = () => {
  const [show, setShow] = useState(false);
  const [state, action] = useActionState(signIn, undefined);

  return (
    <Card className="w-[350px]">
      <CardHeader className="flex flex-col gap-2">
        <div className="flex justify-start">
          <Image
            src="https://res.cloudinary.com/ddmeptk5c/image/upload/f_auto,q_auto/v1/portfolio/wonlwuluroldfu03zcml"
            width={130}
            height={0}
            className="rounded-t-lg w-auto h-auto"
            priority
            alt="Login background"
          />
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <CardTitle>Iniciar sesión</CardTitle>
          <CardDescription>
            Ingresa tu usuario y contraseña para acceder a la plataforma
          </CardDescription>
        </div>
      </CardHeader>
      <form action={action}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Usuario</Label>
              <Input id="name" placeholder="Usuario" name="username" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Contraseña</Label>
              <div className="flex">
                <Input
                  type={show ? "text" : "password"}
                  id="password"
                  className="rounded-r-none"
                  name="password"
                  placeholder="*******"
                />
                <Button
                  type="button"
                  size="icon"
                  onClick={() => setShow(!show)}
                  className="bg-primary rounded-l-none"
                >
                  {show ? <Eye /> : <EyeClosed />}
                </Button>
              </div>
            </div>

            {state?.errors?.password && (
              <div className="text-xs text-red-500">
                <p>Contraseña incorrecta</p>
                <ul>
                  {state.errors.password.map((error) => (
                    <li key={error}>* {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <SubmitButton text="Iniciar sesión" className="bg-primary" />
        </CardFooter>
      </form>
    </Card>
  );
};

export { Login };
