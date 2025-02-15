import { FormState } from "../enums/form-state.enum";
import { AuthSchema } from "../schemas/auth.schema";

// NextAuth
import { signIn as nextSignIn, signOut as nextSignOut } from "next-auth/react";

export async function signIn(
  _: FormState,
  formData: FormData
): Promise<FormState> {
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
