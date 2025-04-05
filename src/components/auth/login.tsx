"use client";
import { useState, useActionState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const getErrorMessage = (errorType: string | null) => {
    switch (errorType) {
      case "CredentialsSignin":
        return "Invalid username or password";
      default:
        return "An error occurred during authentication";
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader className="flex flex-col gap-2">
        <ul>
          <li className="dark:flex w-32 opacity-80 hover:opacity-100 ease-out duration-300 hidden">
            <Link href="/">
              <Image
                className="object-cover"
                src="https://res.cloudinary.com/ddmeptk5c/image/upload/f_auto,q_auto/v1/portfolio/nrmlj5wmeop1rcqp5hdp"
                alt="ionjc"
                width={250}
                height={250}
              />
            </Link>
          </li>
          <li className="flex w-32 opacity-80 hover:opacity-100 ease-out duration-300 dark:hidden">
            <Link href="/">
              <Image
                className="object-cover"
                src="https://res.cloudinary.com/ddmeptk5c/image/upload/f_auto,q_auto/v1/portfolio/wonlwuluroldfu03zcml"
                alt="ionjc"
                width={250}
                height={250}
              />
            </Link>
          </li>
        </ul>

        <div className="flex flex-col gap-2 mt-2">
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Enter your username and password to access the platform
          </CardDescription>
        </div>
      </CardHeader>
      <form action={action}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Username</Label>
              <Input id="name" placeholder="Username" name="username" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Password</Label>
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
                <p>Incorrect password</p>
                <ul>
                  {state.errors.password.map((error) => (
                    <li key={error}>* {error}</li>
                  ))}
                </ul>
              </div>
            )}

            {error && (
              <div className="text-xs text-red-500">
                <p>{getErrorMessage(error)}</p>
              </div>
            )}

            {state?.message && (
              <div className="text-xs text-red-500">
                <p>{state.message}</p>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <SubmitButton text="Sign in" className="bg-primary" />
        </CardFooter>
      </form>
    </Card>
  );
};

export { Login };
