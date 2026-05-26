import "./styles.css";

import { Sidebar } from "../Sidebar";

export function Layout({
  children,
}: any) {

  return (
    <div className="layout-container">

      <Sidebar />

      <main className="layout-content">

        {children}

      </main>

    </div>
  );
}