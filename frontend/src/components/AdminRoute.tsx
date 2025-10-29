import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { Center, Loader } from "@mantine/core";

export function AdminRoute() {
  const { user, token } = useAuthStore();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return (
      <Center h="100vh">
        <Loader />
      </Center>
    );
  }

  if (user.role !== "Admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
