import type { ReactNode } from "react";

export type GridProps = {
  children: ReactNode;
};

export function Grid({ children }: GridProps) {
  return <div>{children}</div>;
}
