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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useAuthStore } from "../store/auth.store";
import api from "../lib/api";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";

export function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { setToken, setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    setError(null);
    try {
      const resLogin = await api.post("/auth/login", values);
      const { access_token } = resLogin.data;
      setToken(access_token);

      const resUser = await api.get("/user/me");
      setUser(resUser.data);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) => (val.length < 8 ? "Password is too short" : null),
    },
  });

  return (
    <AuthLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
          padding: "1rem",
        }}
      >
        <Paper
          withBorder
          shadow="xl"
          radius="lg"
          p="xl"
          style={{
            width: "100%",
            maxWidth: 420,
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))",
            border: "1px solid rgba(255,255,255,0.2)",
            backdropFilter: "blur(20px)",
            color: "white",
            position: "relative",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.25)";
          }}
        >
          <LoadingOverlay visible={loading} />

          <Title
            order={2}
            ta="center"
            mb="xs"
            style={{
              background: "linear-gradient(90deg, #7f00ff, #1e90ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 800,
              fontSize: "1.8rem",
            }}
          >
            Quantum Store
          </Title>

          <Text c="dimmed" size="sm" ta="center" mb="md">
            Don't have an account?{" "}
            <Anchor
              component={Link}
              to="/register"
              style={{
                color: "#8ab4f8",
                textDecoration: "underline",
                fontWeight: 500,
              }}
            >
              Register here
            </Anchor>
          </Text>

          <Divider mb="lg" opacity={0.25} />

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="Email"
              placeholder="you@email.com"
              required
              radius="md"
              size="md"
              styles={{
                label: { color: "#ddd", fontWeight: 500 },
                input: {
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                  transition: "all 0.2s ease",
                },
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
                label: { color: "#ddd", fontWeight: 500 },
                input: {
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                  transition: "all 0.2s ease",
                },
              }}
              {...form.getInputProps("password")}
            />

            {error && (
              <Text
                c="red.4"
                size="sm"
                mt="md"
                ta="center"
                style={{ fontWeight: 500 }}
              >
                {error}
              </Text>
            )}

            <Button
              type="submit"
              fullWidth
              radius="md"
              mt="xl"
              size="md"
              style={{
                background: "linear-gradient(90deg, #7f00ff, #1e90ff)",
                fontWeight: 600,
                boxShadow: "0 4px 15px rgba(0,0,0,0.25)",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow = "0 6px 25px rgba(0,0,0,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.25)";
              }}
            >
              Sign In
            </Button>
          </form>
        </Paper>
      </div>
    </AuthLayout>
  );
}
