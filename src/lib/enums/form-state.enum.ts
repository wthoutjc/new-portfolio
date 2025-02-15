export type FormState<T = unknown> =
  | {
      errors?: T;
      message?: string;
    }
  | undefined;
