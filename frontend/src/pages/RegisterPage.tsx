import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Text,
  Anchor,
  LoadingOverlay,
  Divider,
  Alert,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import api from "../lib/api";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";

export function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await api.post("/auth/register", values);
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      setLoading(false);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email address"),
      password: (val) =>
        val.length < 8 ? "Password must be at least 8 characters" : null,
    },
  });

  return (
    <AuthLayout>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background:
            "radial-gradient(circle at top right, rgba(127,0,255,0.25), rgba(30,144,255,0.25))",
          backdropFilter: "blur(25px)",
        }}
      >
        <Paper
          withBorder
          shadow="xl"
          p={40}
          radius="lg"
          pos="relative"
          style={{
            maxWidth: 420,
            width: "100%",
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))",
            border: "1px solid rgba(255,255,255,0.15)",
            backdropFilter: "blur(25px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-4px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateY(0)")
          }
        >
          <LoadingOverlay visible={loading} />
          <Title
            order={2}
            ta="center"
            mb={10}
            style={{
              fontWeight: 800,
              background: "linear-gradient(90deg, #7f00ff, #1e90ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.02em",
            }}
          >
            Create Your Quantum Account
          </Title>
          <Text c="dimmed" size="sm" ta="center" mb={30}>
            Already have an account?{" "}
            <Anchor
              component={Link}
              to="/login"
              fw={600}
              style={{
                background: "linear-gradient(90deg, #1e90ff, #7f00ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Login here
            </Anchor>
          </Text>

          <Divider mb="xl" color="rgba(255,255,255,0.15)" />

          {success ? (
            <Alert
              color="green"
              title="Success"
              ta="center"
              variant="light"
              radius="md"
              mb="md"
            >
              Registration successful! Redirecting to login...
            </Alert>
          ) : (
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <TextInput
                label="Email"
                placeholder="you@email.com"
                required
                radius="md"
                size="md"
                styles={{
                  input: { backgroundColor: "rgba(255,255,255,0.1)" },
                }}
                {...form.getInputProps("email")}
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                mt="md"
                radius="md"
                size="md"
                styles={{
                  input: { backgroundColor: "rgba(255,255,255,0.1)" },
                }}
                {...form.getInputProps("password")}
              />

              {error && (
                <Alert
                  color="red"
                  title="Error"
                  mt="md"
                  variant="light"
                  radius="md"
                  style={{ fontSize: "0.9rem" }}
                >
                  {error}
                </Alert>
              )}

              <Button
                type="submit"
                fullWidth
                mt="xl"
                radius="md"
                size="md"
                style={{
                  background: "linear-gradient(90deg, #7f00ff, #1e90ff)",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 18px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.2)";
                }}
              >
                Register
              </Button>
            </form>
          )}
        </Paper>
      </Box>
    </AuthLayout>
  );
}
