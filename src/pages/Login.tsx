import { useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isNewUser) {
      const cred = await createUserWithEmailAndPassword(auth, email, senha);
      await setDoc(doc(db, "users", cred.user.uid), {
        nome: "Dra. Exemplo",
        email,
        createdAt: new Date()
      });
    } else {
      await signInWithEmailAndPassword(auth, email, senha);
    }

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {isNewUser ? "Cadastro" : "Login"}
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full border p-2 mb-3 rounded"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          {isNewUser ? "Cadastrar" : "Entrar"}
        </button>

        <p
          onClick={() => setIsNewUser(!isNewUser)}
          className="text-center mt-4 text-blue-500 cursor-pointer text-sm"
        >
          {isNewUser ? "Já tenho conta" : "Criar nova conta"}
        </p>
      </form>
    </div>
  );
}
