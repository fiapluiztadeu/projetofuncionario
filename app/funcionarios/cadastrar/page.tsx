'use client'

import api from '@/services/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Usuario {
  nome: string;
  cpf: string;
  email: string;
  dtNascimento: string;
  dtAdimissao: string;
  status: string;
}

export default function CadastrarFuncionario() {
  const [novoUsuario, setNovoUsuario] = useState<Usuario>({
    nome: '',
    cpf: '',
    email: '',
    dtNascimento: '',
    dtAdimissao: '',
    status: 'ativo'
  })

  const router = useRouter();

  function salvarUsuario() {
    api.post("/funcionarios", novoUsuario)
      .then(() => {
        alert("Funcionário cadastrado com Sucesso!")
        router.push("/funcionarios")
      })
      .catch(() => {
        alert("Erro ao cadastrar usuário.")
      })
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Cadastrar Novo Funcionário</h1>

        <form className="space-y-4">
          {/* Nome */}
          <div>
            <label htmlFor="campoNome" className="block font-medium mb-1">
              Nome completo:
            </label>
            <input
              id="campoNome"
              type="text"
              placeholder="Digite o nome"
              value={novoUsuario.nome}
              onChange={(e) => setNovoUsuario({ ...novoUsuario, nome: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="campoCpf" className="block font-medium mb-1">
              Cpf:
            </label>
            <input
              id="campoNome"
              type="cpf"
              placeholder="Digite o cpf"
              value={novoUsuario.cpf}
              onChange={(e) => setNovoUsuario({ ...novoUsuario, cpf: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Login */}
          <div>
            <label htmlFor="campoEmail" className="block font-medium mb-1">
              Email:
            </label>
            <input
              id="campoEmail"
              type="text"
              placeholder="Digite o email"
              value={novoUsuario.email}
              onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Senha */}
          <div>
            <label htmlFor="campoDtNascimento" className="block font-medium mb-1">
              Data de Nascimento:
            </label>
            <input
              id="campoDtNascimento"
              type="date"
              placeholder="Digite a data"
              value={novoUsuario.dtNascimento}
              onChange={(e) => setNovoUsuario({ ...novoUsuario, dtNascimento: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Senha */}
          <div>
            <label htmlFor="campoDtAdimissão" className="block font-medium mb-1">
              Data de Adimissão:
            </label>
            <input
              id="campoDtAdimissão"
              type="date"
              placeholder="Digite a data"
              value={novoUsuario.dtAdimissao}
              onChange={(e) => setNovoUsuario({ ...novoUsuario, dtAdimissao: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block font-medium">Status atual:</label>
            <strong className="ml-1 text-green-600">{novoUsuario.status}</strong>
          </div>

          {/* Botão */}
          <button
            type="button"
            onClick={salvarUsuario}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition"
          >
            Salvar Cadastro
          </button>

          {/* Link */}
          <a
            href="/funcionarios"
            className="block text-center text-blue-600 hover:underline mt-2"
          >
            ← Voltar para Lista de Funcionários
          </a>
        </form>
      </div>
    </main>
  )
}

