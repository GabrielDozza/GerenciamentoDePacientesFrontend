import "./styles.css";

interface HeaderProps {
  title: string;
  showSearch?: boolean;
  onSearch?: (value: string) => void;
  searchValue?: string;
}

export function Header({ title, showSearch = true, onSearch, searchValue }: HeaderProps) {
  return (
    <header className="header">
      <h1>{title}</h1>
      {showSearch && (
        <div className="header-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchValue}
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>
      )}
    </header>
  );
}
