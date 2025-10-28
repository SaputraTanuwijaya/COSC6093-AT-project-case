import { Routes, Route } from "react-router-dom";
// import { HomePage } from './pages/HomePage';
// import { LoginPage } from './pages/LoginPage';
// import { AdminPage } from './pages/AdminPage';

export function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminPage />} /> */}

      {/* Placeholder for now */}
      <Route
        path="/"
        element={
          <div>
            <h1>Quantum Store</h1>
            <p>Frontend is running!</p>
          </div>
        }
      />
    </Routes>
  );
}
