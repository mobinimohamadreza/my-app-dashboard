import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { RegisterFormContainer } from "./Module/Auth/Component/RegisterFormContainer.tsx";
import { LoginFormContainer } from "./Module/Auth/Component/LoginFormContainer.tsx";
import { MainLayout } from "./layouts/MainLayout.tsx";
import { AuthLayout } from "./layouts/AuthLayout.tsx";
import { DashboardMainPage } from "./Module/Dashboard/Component/Pages/DashboardMainPage.tsx";
import { AttributesPage } from "./Module/Dashboard/Component/Pages/AttributesPage.tsx";
import { CreateAttributePage } from "./Module/Dashboard/Component/Pages/CreateAttributePage.tsx";
import { ProductsPage } from "./Module/Dashboard/Component/Pages/ProductsPage.tsx";
import { ProtectedRoute } from "./Module/Auth/Component/ProtectedRoute.tsx";
import { NetworkStatus } from "./Module/Network/Component/NetworkStatus.tsx";

function App() {
  return (
      <Router>
        <div className="App ">
          <NetworkStatus />
          <Routes>
          <Route
            path="/login"
            element={
              <ProtectedRoute requireAuth={false}>
                <AuthLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<LoginFormContainer />} />
          </Route>
          
          <Route
            path="/signup"
            element={
              <ProtectedRoute requireAuth={false}>
                <AuthLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<RegisterFormContainer />} />
          </Route>

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requireAuth={true}>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<DashboardMainPage />} />
            <Route path="attributes" element={<AttributesPage />} />
            <Route path="attributes/create" element={<CreateAttributePage />} />
            <Route path="products" element={<ProductsPage />} />
          </Route>

          <Route path="/" element={<Navigate to="/dashboard/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
  )
}

export default App
