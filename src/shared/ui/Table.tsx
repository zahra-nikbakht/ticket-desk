import type { ReactNode } from "react";
import clsx from "clsx";

export function Table({ children, className }: { children: ReactNode; className?: string }) {
  return <table className={clsx("ui-table", className)}>{children}</table>;
}

export function Th({ children, className }: { children: ReactNode; className?: string }) {
  return <th className={clsx("ui-th", className)}>{children}</th>;
}

export function Td({ children, className }: { children: ReactNode; className?: string }) {
  return <td className={clsx("ui-td", className)}>{children}</td>;
}
