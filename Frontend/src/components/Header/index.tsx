import "./styles.css";
import type { ReactNode } from "react";
import { SearchBar } from "../SearchBar";

interface HeaderProps {
  title: string;
  showSearch?: boolean;
  onSearch?: (value: string) => void;
  searchValue?: string;
  action?: ReactNode;
}

export function Header({ title, showSearch = true, onSearch, searchValue, action }: HeaderProps) {
  return (
    <header className="header">
      <h1>{title}</h1>
      <div className="header-right">
        {showSearch && (
          <SearchBar
            value={searchValue ?? ""}
            onChange={onSearch ?? (() => undefined)}
            placeholder="Buscar..."
          />
        )}
        {action}
      </div>
    </header>
  );
}
