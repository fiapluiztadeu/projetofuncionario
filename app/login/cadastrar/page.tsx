'use client'

import api from '@/services/api'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Usuario {
  nome: string
  usuario: string
  senha: string
  status: string
}

export default function CadastrarUsuario() {
  const [novoUsuario, setNovoUsuario] = useState<Usuario>({
    nome: '',
    usuario: '',
    senha: '',
    status: 'ativo'
  })

  const router = useRouter()

  function salvarUsuario() {
    api.post("/login", novoUsuario)
      .then(() => {
        alert("Usuário cadastrado com sucesso!")
        router.push("/login")
      })
      .catch(() => {
        alert("Erro ao cadastrar usuário.")
      })
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Cadastrar Novo Usuário</h1>

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

          {/* Login */}
          <div>
            <label htmlFor="campoLogin" className="block font-medium mb-1">
              Login de acesso:
            </label>
            <input
              id="campoLogin"
              type="text"
              placeholder="Digite o login"
              value={novoUsuario.usuario}
              onChange={(e) => setNovoUsuario({ ...novoUsuario, usuario: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Senha */}
          <div>
            <label htmlFor="campoSenha" className="block font-medium mb-1">
              Senha:
            </label>
            <input
              id="campoSenha"
              type="password"
              placeholder="Digite a senha"
              value={novoUsuario.senha}
              onChange={(e) => setNovoUsuario({ ...novoUsuario, senha: e.target.value })}
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
            href="/login"
            className="block text-center text-blue-600 hover:underline mt-2"
          >
            ← Voltar para Lista de Usuários
          </a>
        </form>
      </div>
    </main>
  )
}

