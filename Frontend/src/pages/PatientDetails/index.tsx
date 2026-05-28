import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { Header } from "../../components/Header";
import { BackButton } from "../../components/BackButton";

export function PatientDetails() {
  const navigate = useNavigate();

  return (
    <Layout>
      <Header title="Detalhes do Paciente" showSearch={false} />
      <BackButton />
      <div className="form-container">
        <div className="form-group">
          <label>Nome</label>
          <p>Maria Silva</p>
        </div>
        <div className="form-group">
            <label>Data de nascimento</label>
            <p>01/01/1980</p>
        </div>
        <div className="form-group">
          <label>Telefone</label>
          <p>(51) 99999-9999</p>
        </div>
        <div className="form-group">
          <label>E-mail</label>
          <p>maria@email.com</p>
        </div>
        <div className="form-group">
          <label>CPF</label>
          <p>000.000.000-00</p>
        </div>
        <div className="form-group">
            <label>Endereço</label>
            <p>Rua Exemplo, 123 - Porto Alegre, RS</p>
        </div>
        <div className="form-group">
            <label>Profissão</label>
            <p>Enfermeira</p>
        </div>
        <div className="form-group">
            <label>Origem do paciente</label>
            <p>Instagram</p>
        </div>
        <div className="form-actions">
          <button
            type="button"
            className="button-secondary"
            onClick={() => navigate(-1)}
          >
            Voltar
          </button>
          <button
            type="button"
            className="button-primary"
            onClick={() => navigate("/edit-patient")}
          >
            Editar paciente
          </button>
        </div>
      </div>
    </Layout>
  );
}