import { FormState } from "../interfaces/auth";
import { AuthSchema } from "../schemas/auth.schema";

// NextAuth
import { signIn as nextSignIn, signOut as nextSignOut } from "next-auth/react";

export async function signIn(
  _: FormState,
  formData: FormData
): Promise<FormState> {
  console.log({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  const { success, data, error } = AuthSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  console.log({
    success,
  });

  if (!success) {
    console.log({
      error,
    });

    return {
      errors: error.flatten().fieldErrors,
    };
  }

  const res = await nextSignIn("credentials", {
    ...data,
    callbackUrl: "/system",
  });

  console.log({
    res,
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
