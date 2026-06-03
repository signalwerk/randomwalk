import "./ScrollIndicator.scss";

type ScrollIndicatorProps = {
  href: string;
};

export function ScrollIndicator({ href }: ScrollIndicatorProps) {
  return (
    <a className="scroll-indicator" href={href}>
      <span className="scroll-indicator__text">Scroll</span>
      <span className="scroll-indicator__arrow" aria-hidden="true" />
    </a>
  );
}
