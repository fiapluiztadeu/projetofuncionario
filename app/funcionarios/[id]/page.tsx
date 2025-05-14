'use client'

import api from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Usuario {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  dtNascimento: string;
  dtAdimissao: string;
  status: string;
}

export default function EditarUsuario({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    api.get(`/funcionarios/${params.id}`)
      .then((res) => res.data?.id ? setUsuario(res.data) : router.push("/funcionarios"))
      .catch(() => {
        alert("Erro de conexão");
        router.push("/funcionarios");
      });
  }, []);

  function atualizarCampo(campo: keyof Usuario, valor: string) {
    if (!usuario) return;
    setUsuario({ ...usuario, [campo]: valor });
  }

  function salvarAlteracoes() {
    if (usuario) {
      api.put(`/funcionarios/${usuario.id}`, usuario)
        .then(() => {
          alert("Funcionario atualizado com sucesso!");
          router.push("/funcionarios");
        });
    }
  }

  function deletarUsuario() {
    if (usuario) {
      api.delete(`/funcionarios/${usuario.id}`)
        .then(() => {
          alert("Funcionário deletado com sucesso");
          router.push("/funcionarios");
        });
    }
  }

  function atualizarStatus() {
    if (usuario) {
      const novoStatus = usuario.status === "Demitido" ? "ativo" : "Demitido";
      api.patch(`/funcionarios/${usuario.id}`, { status: novoStatus })
        .then(() => {
          alert("Status atualizado!");
          router.push("/funcionarios");
        });
    }
  }

  if (!usuario) return <p className="text-center mt-10">Carregando informações...</p>;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="w-full max-w-xl p-6 bg-white rounded-xl shadow-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Edição de Funcionario</h1>

        <div className="space-y-2">
          <label htmlFor="campoNome">Nome completo:</label>
          <input
            id="campoNome"
            type="text"
            value={usuario.nome}
            onChange={(e) => atualizarCampo("nome", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="campoCpf">CPF:</label>
          <input
            id="campoCpf"
            type="cpf"
            value={usuario.cpf}
            onChange={(e) => atualizarCampo("cpf", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="campoEmail">Email de acesso:</label>
          <input
            id="campoEmail"
            type="email"
            value={usuario.email}
            onChange={(e) => atualizarCampo("email", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="campoNascimento">Dada de Nascimento:</label>
          <input
            id="campoNascimento"
            type="date"
            value={usuario.dtNascimento}
            onChange={(e) => atualizarCampo("dtNascimento", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="campoAdmissao">Dada de adimissão:</label>
          <input
            id="campoAdimisssao"
            type="date"
            value={usuario.dtAdimissao}
            onChange={(e) => atualizarCampo("dtAdimissao", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <p><strong>Status:</strong> {usuario.status}</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            type="button"
            onClick={salvarAlteracoes}
            className="border border-gray-400 rounded-md py-2 hover:bg-green-500 hover:text-white transition"
          >
            Salvar alterações
          </button>
          <button
            type="button"
            onClick={deletarUsuario}
            className="border border-gray-400 rounded-md py-2 hover:bg-red-500 hover:text-white transition"
          >
            Deletar usuário
          </button>
          <button
            type="button"
            onClick={atualizarStatus}
            className="border border-gray-400 rounded-md py-2 hover:bg-yellow-500 hover:text-white transition"
          >
            Alterar status
          </button>
        </div>

        <a href="/funcionarios" className="block text-center text-blue-600 underline mt-4">
          ← Voltar para Lista de Funcionários
        </a>
      </form>
    </main>
  );
}
