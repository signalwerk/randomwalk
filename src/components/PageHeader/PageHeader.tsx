import "./PageHeader.scss";

type PageHeaderProps = {
  eyebrow?: string;
  intro?: string;
  title: string;
  titleLevel?: 1 | 2;
};

export function PageHeader({
  eyebrow,
  intro,
  title,
  titleLevel = 1,
}: PageHeaderProps) {
  const Title = `h${titleLevel}` as const;

  return (
    <header className="page-header">
      {eyebrow && <p className="page-header__eyebrow">{eyebrow}</p>}
      {title && <Title className="page-header__title">{title}</Title>}
      {intro && <p className="page-header__intro">{intro}</p>}
    </header>
  );
}
