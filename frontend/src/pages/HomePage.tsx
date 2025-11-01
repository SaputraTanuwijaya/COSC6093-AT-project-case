import { Button, Container, Title, Text, Group } from "@mantine/core";
import { useAuthStore } from "../store/auth.store";
import { Link } from "react-router-dom";

export function HomePage() {
  const { user, logout } = useAuthStore();

  return (
    <Container pt="lg">
      <Title>Welcome to Quantum Store!</Title>

      <Text mt="md">Browse our collection of high-end digital assets.</Text>
      <Button component={Link} to="/product" mt="md">
        Browse Products
      </Button>

      {user ? (
        <div style={{ marginTop: "2rem" }}>
          <Text>
            Hello, {user.email}! (Role: {user.role})
          </Text>
          <Group mt="md">
            {user.role === "Admin" && (
              <Button component={Link} to="/admin">
                Admin Dashboard
              </Button>
            )}
            <Button component={Link} to="/my-orders">
              View My Orders
            </Button>
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </Group>
        </div>
      ) : (
        <div style={{ marginTop: "2rem" }}>
          <Text>Log in to manage your orders.</Text>
          <Button component={Link} to="/login" mt="md">
            Login
          </Button>
        </div>
      )}
    </Container>
  );
}
