"use client";

import { signIn } from 'next-auth/react';

export default function SignIn() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password
    });
    if (!result.error) {
      // Redirigir a la página de subida de blogs después de iniciar sesión
      window.location.href = '/upload';
    } else {
      alert('Failed to sign in');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-[#000]">Iniciar Sesión</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            name="username"
            type="text"
            required
            className="w-full px-3 py-2 border rounded text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            name="password"
            type="password"
            required
            className="w-full px-3 py-2 border rounded text-gray-800"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Ingresar
        </button>
      </form>
    </div>
  );
}