import "./styles.css";

interface HeaderProps {
  title: string;
  showSearch?: boolean;
}

export function Header({
  title,
  showSearch = true,
}: HeaderProps) {

  return (
    <header className="header">

      <h1>{title}</h1>

      {showSearch && (
        <input
          type="text"
          placeholder="Buscar..."
        />
      )}

    </header>
  );
}