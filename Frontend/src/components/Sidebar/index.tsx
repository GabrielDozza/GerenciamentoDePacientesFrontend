import "./styles.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { clearAuthToken } from "../../services/api";
import { getProfessional, type Professional } from "../../services/professionals";

export function Sidebar() {
  const navigate = useNavigate();

  const [professional, setProfessional] = useState<Professional | null>(null);

  useEffect(() => {
    async function loadProfessional() {
      try {
        // temporário
        const data = await getProfessional(1);

        setProfessional(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadProfessional();
  }, []);

  const handleLogout = () => {
    clearAuthToken();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-mark">
          <div className="sidebar-logo-icon">L</div>

          <div>
            <div className="sidebar-logo-text">Lume</div>
            <div className="sidebar-logo-sub">
              Sistema Clínico
            </div>
          </div>
        </div>
      </div>

      <nav>
        <span className="sidebar-section-label">
          Menu
        </span>

        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/patients"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Pacientes
        </NavLink>

        <NavLink
          to="/agenda"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Agenda
        </NavLink>

        <NavLink
          to="/evolutions"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Evoluções
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="profile">
          <div className="profile-avatar">
            {professional?.fotoPerfil ? (
              <img
  src={`data:image/png;base64,${professional.fotoPerfil}`}
  alt="Foto do profissional"
  className="profile-avatar-image"
/>
            ) : (
              professional?.nome?.[0] ?? "U"
            )}
          </div>

          <div className="profile-info">
            <div className="profile-name">
              {professional?.nome ?? "Usuário"}
            </div>

            <div className="profile-role">
              {professional?.especialidade ??
                "Profissional"}
            </div>
          </div>
        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Sair da conta
        </button>
      </div>
    </aside>
  );
}