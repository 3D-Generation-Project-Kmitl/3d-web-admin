import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Verify from "./pages/Verify";
import Withdraw from "./pages/Withdraw";
import ManageUser from "./pages/ManageUser";
import Report from "./pages/Report";
import Product from "./pages/Product";
import SideBar from "./components/SideBar";
import { useState } from "react";
import { UserContext } from "./contexts/UserContext";
import { User } from "./types/user";

function App() {
  const [user, setUser] = useState<User | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <div className="flex">
          <SideBar />
          <div className="h-screen flex-1 p-7 bg-gray-100">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/withdraw" element={<Withdraw />} />
              <Route path="/user" element={<ManageUser />} />
              <Route path="/report" element={<Report />} />
              <Route path="/product" element={<Product />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
