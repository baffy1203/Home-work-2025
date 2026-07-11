import { Routes, Route, Navigate } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import CalendarPage from "./pages/CalendarPage";
import ClientsPage from "./pages/ClientsPage";
import ServicesPage from "./pages/ServicesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AppLayout from "./layouts/AppLayout";
import StatisticsPage from "./pages/StatisticsPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <Routes>
      {!isLoggedIn ? (
        <>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<RegisterPage />} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        <>
          <Route
            path="/"
            element={
              <AppLayout>
                <DashboardPage />
              </AppLayout>
            }
          />

          <Route
            path="/calendar"
            element={
              <AppLayout>
                <CalendarPage />
              </AppLayout>
            }
          />

          <Route
            path="/clients"
            element={
              <AppLayout>
                <ClientsPage />
              </AppLayout>
            }
          />

          <Route
            path="/services"
            element={
              <AppLayout>
                <ServicesPage />
              </AppLayout>
            }
          />

          <Route
            path="/statistics"
            element={
              <AppLayout>
                <StatisticsPage />
              </AppLayout>
            }
          />

          <Route
            path="/profile"
            element={
              <AppLayout>
                <ProfilePage />
              </AppLayout>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      )}
    </Routes>
  );
}

export default App;
