import "./styles.css";

interface DeleteButtonProps {
  onClick: () => void;
  label?: string;
}

export function DeleteButton({ onClick, label = "Deletar" }: DeleteButtonProps) {
  return (
    <button type="button" className="button-danger" onClick={onClick}>
      {label}
    </button>
  );
}
