import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import { ShopProvider } from "./context/ShopContext";
import { RoutesApp } from "./routes/routesApp";

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <ShopProvider>
          <RoutesApp />
        </ShopProvider>
      </DataProvider>
    </AuthProvider>
  )
}
