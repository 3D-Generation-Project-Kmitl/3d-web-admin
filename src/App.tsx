import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Verify from "./pages/Verify";
import Withdraw from "./pages/Withdraw";
import ManageUser from "./pages/ManageUser";
import Report from "./pages/Report";
import Product from "./pages/Product";
import SideBar from "./components/SideBar";
import { useEffect, useState } from "react";
import UserContext from "./contexts/UserContext";
import { User } from "./types/user";
import httpClient from "./utils/httpClient";
import Loader from "./components/Loader";

function AuthRoute() {
  return (
    <div className="flex">
      <SideBar />
      <div className="h-screen flex-1 p-7 bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/user" element={<ManageUser />} />
          <Route path="/report" element={<Report />} />
          <Route path="/product" element={<Product />} />
        </Routes>
      </div>
    </div>
  );
}

function NoAuthRoute() {
  return (
    <div className="h-screen">
      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  );
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    httpClient
      .post("/auth/validateToken")
      .then((res) => {
        setIsLoading(false);
        if (res.data.data) {
          setUser(res.data.data);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        {isLoading ? (
          <div className="flex justify-center h-screen">
            <Loader />
          </div>
        ) : user ? (
          <AuthRoute />
        ) : (
          <NoAuthRoute />
        )}
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
