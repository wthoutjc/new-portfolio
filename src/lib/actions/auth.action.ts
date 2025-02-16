import { Auth } from "../interfaces/auth";
import { AuthSchema } from "../schemas/auth.schema";

// NextAuth
import { signIn as nextSignIn, signOut as nextSignOut } from "next-auth/react";
import { ActionState } from "../types/action.type";

export async function signIn(
  _: ActionState<Auth>,
  formData: FormData
): Promise<ActionState<Auth>> {
  const { success, data, error } = AuthSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!success) {
    return {
      errors: error.flatten().fieldErrors,
    };
  }

  const res = await nextSignIn("credentials", {
    ...data,
    callbackUrl: "/system",
  });

  if (res && res.error) {
    return {
      message: res.error,
    };
  }
}

export const signOut = async () => {
  await nextSignOut({
    callbackUrl: "/auth/login",
  });
};
