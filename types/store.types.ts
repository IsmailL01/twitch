export type setType<S> = (
  partial: S | Partial<S> | ((state: S) => S | Partial<S>),
  replace?: boolean | undefined
) => void;
