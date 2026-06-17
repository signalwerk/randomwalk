import "./PageHeader.scss";

type PageHeaderProps = {
  eyebrow?: string;
  intro?: string;
  title: string;
};

export function PageHeader({ eyebrow, intro, title }: PageHeaderProps) {
  return (
    <header className="page-header">
      {eyebrow && <p className="page-header__eyebrow">{eyebrow}</p>}
      <h1 className="page-header__title">{title}</h1>
      {intro && <p className="page-header__intro">{intro}</p>}
    </header>
  );
}
