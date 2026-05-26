import "./styles.css";

type Props = {
  title: string;
};

export function Header({ title }: Props) {

  return (
    <header className="header">

      <h1>{title}</h1>

      <input
        type="text"
        placeholder="Buscar..."
      />

    </header>
  );
}