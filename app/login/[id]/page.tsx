'use client'

import api from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Usuario {
  id: number;
  nome: string;
  usuario: string;
  senha: string;
  status: string;
}

export default function EditarUsuario({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    api.get(`/login/${params.id}`)
      .then((res) => res.data?.id ? setUsuario(res.data) : router.push("/login"))
      .catch(() => {
        alert("Erro de conexão");
        router.push("/login");
      });
  }, []);

  function atualizarCampo(campo: keyof Usuario, valor: string) {
    if (!usuario) return;
    setUsuario({ ...usuario, [campo]: valor });
  }

  function salvarAlteracoes() {
    if (usuario) {
      api.put(`/login/${usuario.id}`, usuario)
        .then(() => {
          alert("Usuário atualizado com sucesso!");
          router.push("/login");
        });
    }
  }

  function deletarUsuario() {
    if (usuario) {
      api.delete(`/login/${usuario.id}`)
        .then(() => {
          alert("Usuário deletado com sucesso");
          router.push("/login");
        });
    }
  }

  function atualizarStatus() {
    if (usuario) {
      const novoStatus = usuario.status === "inativo" ? "ativo" : "inativo";
      api.patch(`/login/${usuario.id}`, { status: novoStatus })
        .then(() => {
          alert("Status atualizado!");
          router.push("/login");
        });
    }
  }

  if (!usuario) return <p className="text-center mt-10">Carregando informações...</p>;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="w-full max-w-xl p-6 bg-white rounded-xl shadow-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Edição de Usuário</h1>

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
          <label htmlFor="campoLogin">Login de acesso:</label>
          <input
            id="campoLogin"
            type="text"
            value={usuario.usuario}
            onChange={(e) => atualizarCampo("usuario", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="campoSenha">Senha:</label>
          <input
            id="campoSenha"
            type="password"
            value={usuario.senha}
            onChange={(e) => atualizarCampo("senha", e.target.value)}
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

        <a href="/login" className="block text-center text-blue-600 underline mt-4">
          ← Voltar para Lista de Usuários
        </a>
      </form>
    </main>
  );
}
