import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Efetuando um CRUD</h1>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="px-6 py-2 border border-gray-400 rounded-lg hover:bg-gray-800 hover:text-white transition"
          >
            Tela de Login
          </Link>
          <Link
            href="/funcionarios"
            className="px-6 py-2 border border-gray-400 rounded-lg hover:bg-blue-600 hover:text-white transition"
          >
            Área de Funcionários
          </Link>
        </div>
      </div>
    </main>
  );
}

