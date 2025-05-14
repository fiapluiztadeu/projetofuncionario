"use client";

import api from "@/services/api";
import Link from "next/link";
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

export default function Login() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const router = useRouter();

  useEffect(() => {
    api.get("/funcionarios").then((res) => setUsuarios(res.data));
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-xl p-6 bg-white rounded-xl shadow-lg space-y-6">
        <h1 className="text-2xl font-bold text-center">Lista de Usuários</h1>
        <ul className="space-y-4">
          {usuarios.map((usuario) => (
            <li
              key={usuario.id}
              onClick={() => router.push(`/funcionarios/${usuario.id}`)}
              className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <p><strong>Nome:</strong> {usuario.nome}</p>
              <p><strong>Cpf:</strong> {usuario.cpf}</p>
              <p><strong>Email:</strong> {usuario.email}</p>
              <p><strong>Nacimento:</strong> {usuario.dtNascimento}</p>
              <p><strong>Admissão:</strong> {usuario.dtAdimissao}</p>
              <p><strong>Status:</strong> {usuario.status}</p>
            </li>
          ))}
        </ul>
        <div className="flex justify-between text-sm text-blue-600 underline">
          <Link href="/">← Tela de Início</Link>
          <Link href="/funcionarios/cadastrar">Ir para Cadastro →</Link>
        </div>
      </div>
    </main>
  );
}
