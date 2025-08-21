import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Footer from "./components/layout/Footer";
import Agbada from "./pages/Agbada";
import Fila from "./pages/Fila";
import Bubu from "./pages/Bubu";
import Cargo from "./pages/Cargo";
import Search from "./pages/Search";
import ScrollToTop from "./components/layout/ScrollToTop";
import CartPage from "./pages/Cart";
import AuthPage from "./pages/Auth";
import ResetPassword from "./pages/PasswordReset";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <Router>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agbada" element={<Agbada />} />
        <Route path="/fila" element={<Fila />} />
        <Route path="/bubu" element={<Bubu />} />
        <Route path="/cargo" element={<Cargo />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ✅ Protect checkout with Supabase session */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
