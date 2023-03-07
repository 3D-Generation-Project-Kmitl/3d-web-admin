import React, { useState } from "react";
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onAdminLogin, loading, message } = useAuth();

  const onSubmit = (e: any) => {
    e.preventDefault();
    onAdminLogin(email, password);
  };
  return (
    <div className="relative flex flex-col justify-center min-h-full overflow-hidden">
      <div className="w-full p-12 m-auto bg-white rounded-md shadow-xl sm:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-primary uppercase">
          เข้าสู่ระบบ
        </h1>
        <form className="mt-6" onSubmit={onSubmit}>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              อีเมล
            </label>
            <input
              required
              type="email"
              className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              รหัสผ่าน
            </label>
            <input
              required
              type="password"
              className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-6">
            {loading ? (
              <Loader />
            ) : (
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-primary rounded-md hover:bg-primaryLight focus:outline-none focus:bg-primaryLight"
              >
                เข้าสู่ระบบ
              </button>
            )}
          </div>
        </form>
        <div>
          {message && (
            <div className="mt-4 text-sm text-red-600">{message}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
