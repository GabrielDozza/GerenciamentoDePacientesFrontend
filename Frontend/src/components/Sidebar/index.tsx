import { NavLink } from "react-router-dom";
import "./styles.css";

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-mark">
          <div className="sidebar-logo-icon">L</div>
          <div>
            <div className="sidebar-logo-text">Lume</div>
            <div className="sidebar-logo-sub">Sistema Clínico</div>
          </div>
        </div>
      </div>

      <nav>
        <span className="sidebar-section-label">Menu</span>

        <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>
          </svg>
          Dashboard
        </NavLink>

        <NavLink to="/patients" className={({ isActive }) => isActive ? "active" : ""}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          Pacientes
        </NavLink>

        <NavLink to="/agenda" className={({ isActive }) => isActive ? "active" : ""}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          Agenda
        </NavLink>

        <NavLink to="/evolutions" className={({ isActive }) => isActive ? "active" : ""}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
          </svg>
          Evoluções
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="profile">
          <div className="profile-avatar">U</div>
          <div className="profile-info">
            <div className="profile-name">Usuário</div>
            <div className="profile-role">Profissional</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
