import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRequest, patchRequest } from "../../../services/apiService";

const EditResponsavel: React.FC = () => {
  const { cpf } = useParams<{ cpf: string }>();
  const navigate = useNavigate(); // Corrigido para usar navigate diretamente
  const [responsavel, setResponsavel] = useState<any>(null);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResponsavel = async () => {
      try {
        const data: any = await getRequest(`/responsavel/${cpf}`);
        setResponsavel(data);
        setNome(data.nome);
        setTelefone(data.telefone);
        setEmail(data.email);
      } catch (error) {
        console.error("Erro ao buscar responsável", error);
        setError("Erro ao carregar dados do responsável.");
      } finally {
        setLoading(false);
      }
    };
    fetchResponsavel();
  }, [cpf]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = { nome, telefone, email };

    try {
      await patchRequest(`/responsavel/${cpf}`, updatedData);
      navigate("/responsaveis"); 
    } catch (error) {
      console.error("Erro ao atualizar responsável", error);
      setError("Erro ao atualizar os dados.");
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return responsavel ? (
    <div>
      <h1>Editar Responsável</h1>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
        />
        <input
          type="text"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          placeholder="Telefone"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
        <button type="submit">Atualizar</button>
      </form>
    </div>
  ) : (
    <p>Responsável não encontrado.</p>
  );
};

export default EditResponsavel;
