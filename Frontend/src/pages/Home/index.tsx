import "./styles.css";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { SearchBar } from "../../components/SearchBar";

export function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const cards = [
    { id: "patients", title: "Pacientes", description: "24 cadastrados" },
    { id: "appointments", title: "Consultas", description: "8 hoje" },
    { id: "evolutions", title: "Evoluções", description: "15 registradas" },
  ];

  const filteredCards = cards.filter((card) =>
    [card.title, card.description]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      <aside className="sidebar">
        <h2>Lume</h2>

        <nav>
          <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
            Dashboard
          </NavLink>
          <NavLink to="/patients" className={({ isActive }) => isActive ? "active" : ""}>
            Pacientes
          </NavLink>
          <NavLink to="/agenda" className={({ isActive }) => isActive ? "active" : ""}>
            Agenda
          </NavLink>
          <NavLink to="/evolutions" className={({ isActive }) => isActive ? "active" : ""}>
            Evoluções
          </NavLink>
        </nav>

        <div className="profile">
          <FaUserCircle className="user-icon" />
          <p>Gabriel</p>
        </div>
      </aside>

      <main className="content">
        <header className="header">
          <h1>Dashboard</h1>
          <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Buscar..." />
        </header>

        <section className="cards">
          {filteredCards.length > 0 ? (
            filteredCards.map((card) => (
              <div className="card" key={card.id}>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))
          ) : (
            <div className="card empty-state">
              <h3>Nenhum resultado</h3>
              <p>Tente outro termo de pesquisa.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
} 