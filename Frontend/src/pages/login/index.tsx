import "./styles.css";

import { useNavigate } from "react-router-dom";

export function Login() {

  const navigate = useNavigate();

  return (
    <div className="login-container">

      <div className="login-card">

        <div className="logo-area">
          <div className="logo">🩺</div>

          <h1>Lume System</h1>

          <p>Gerencie seus pacientes com facilidade</p>
        </div>

        <form className="login-form">

          <input
            type="email"
            placeholder="E-mail"
          />

          <input
            type="password"
            placeholder="Senha"
          />

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
          >
            Entrar
          </button>

        </form>

      </div>

    </div>
  );
}