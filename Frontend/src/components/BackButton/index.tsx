import "./styles.css";

import { useNavigate } from "react-router-dom";

export function BackButton() {

  const navigate = useNavigate();

  return (
    <button
      className="back-button"
      onClick={() => navigate(-1)}
    >
      ← Voltar
    </button>
  );
}