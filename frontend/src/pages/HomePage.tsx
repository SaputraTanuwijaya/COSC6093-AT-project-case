"use client";

import {
  Button,
  Container,
  Title,
  Text,
  Group,
  Paper,
  Divider,
  Center,
  Stack,
  rem,
} from "@mantine/core";
import { useAuthStore } from "../store/auth.store";
import { Link } from "react-router-dom";

export function HomePage() {
  const { user, logout } = useAuthStore();

  return (
    <Center
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #6366f1 0%, #9333ea 50%, #ec4899 100%)",
        backgroundAttachment: "fixed",
        padding: rem(40),
      }}
    >
      <Container size="sm" px="md">
        <Paper
          shadow="xl"
          radius="lg"
          p={rem(40)}
          withBorder
          style={{
            backdropFilter: "blur(20px)",
            background: "rgba(255, 255, 255, 0.15)",
            border: "1px solid rgba(255,255,255,0.25)",
            color: "#fff",
            textAlign: "center",
            boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.25)";
          }}
        >
          <Title
            order={1}
            style={{
              fontWeight: 900,
              letterSpacing: "-0.5px",
              background: "linear-gradient(90deg, #4f46e5, #9333ea, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Welcome to Quantum Store
          </Title>

          <Text c="gray.2" mt="md" size="lg" fw={400}>
            Discover premium digital assets crafted for the modern creator.
          </Text>

          <Button
            component={Link}
            to="/product"
            mt="xl"
            size="md"
            radius="md"
            style={{
              background:
                "linear-gradient(90deg, #4f46e5 0%, #9333ea 50%, #ec4899 100%)",
              fontWeight: 600,
              color: "#fff",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Browse Products
          </Button>

          <Divider
            my="xl"
            color="rgba(255,255,255,0.25)"
            label="OR"
            labelPosition="center"
            style={{ fontWeight: 600, color: "#ddd" }}
          />

          {user ? (
            <Stack align="center" gap="sm">
              <Text size="md" c="gray.1">
                Hello, <strong>{user.email}</strong> ({user.role})
              </Text>
              <Group mt="md">
                {user.role === "Admin" && (
                  <Button
                    component={Link}
                    to="/admin"
                    variant="light"
                    color="grape"
                  >
                    Admin Dashboard
                  </Button>
                )}
                <Button
                  component={Link}
                  to="/my-orders"
                  variant="light"
                  color="indigo"
                >
                  My Orders
                </Button>
                <Button variant="outline" color="red" onClick={logout}>
                  Logout
                </Button>
              </Group>
            </Stack>
          ) : (
            <Stack align="center" gap="sm" mt="md">
              <Text size="md" c="gray.1">
                Log in to manage your orders and explore your purchases.
              </Text>
              <Button
                component={Link}
                to="/login"
                size="md"
                radius="md"
                style={{
                  background:
                    "linear-gradient(90deg, #9333ea 0%, #4f46e5 100%)",
                  fontWeight: 600,
                }}
              >
                Login
              </Button>
            </Stack>
          )}
        </Paper>
      </Container>
    </Center>
  );
}
