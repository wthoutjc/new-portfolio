export type ActionState<T> =
  | {
      errors?: Record<string, string[]>;
      data?: T;
      message?: string;
    }
  | undefined;
