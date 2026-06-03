import type { ReactNode } from "react";
import "./CanvasHeader.scss";

type CanvasHeaderProps = {
  children: ReactNode;
};

export function CanvasHeader({ children }: CanvasHeaderProps) {
  return <section className="canvas-header">{children}</section>;
}
