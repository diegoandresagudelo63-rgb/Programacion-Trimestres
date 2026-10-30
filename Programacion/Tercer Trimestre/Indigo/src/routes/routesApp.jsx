import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";

import Landing from "../feature/landing/landing";
import Login from "../feature/auth/login";
import Register from "../feature/auth/register";
import Dashboard from "../feature/dashboard/dashboard";
import AdminPanel from "../feature/dashboard/pages/AdminPanel";
import Clientes from "../feature/dashboard/pages/Clientes";
import Usuario from "../feature/dashboard/pages/Usuario";
import ProductosAdmin from "../feature/dashboard/pages/Productos";
import PedidosAdmin from "../feature/dashboard/pages/Pedidos";

import Shop from "../feature/shop/Shop";
import Cart from "../feature/shop/Cart";
import Orders from "../feature/shop/Orders";

export const RoutesApp = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            
            <Route 
              path="/orders" 
              element={
                <PrivateRoute requiredRole="user">
                  <Orders />
                </PrivateRoute>
              } 
            />
            
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            >
              <Route index element={<AdminPanel />} />
              <Route path="clientes" element={<Clientes />} />
              <Route path="usuarios" element={<Usuario />} />
              <Route path="productos" element={<ProductosAdmin />} />
              <Route path="pedidos" element={<PedidosAdmin />} />
            </Route>
        </Routes>
    )
}