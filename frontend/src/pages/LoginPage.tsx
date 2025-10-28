import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Text,
  Anchor,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import api from "../lib/api";
import { useAuthStore } from "../store/auth.store";

export function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { setToken, setUser } = useAuthStore();

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
      console.error(err);
      setLoading(false);
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <AuthLayout>
      <Paper withBorder shadow="md" p={30} radius="md" pos="relative">
        <LoadingOverlay visible={loading} />
        <Title order={2} ta="center" mb={10}>
          Welcome to Quantum Store
        </Title>
        <Text c="dimmed" size="sm" ta="center" mb={30}>
          Don't have an account?{" "}
          <Anchor component={Link} to="/register">
            Register here
          </Anchor>
        </Text>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email"
            placeholder="you@email.com"
            required
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps("password")}
          />

          {error && (
            <Text c="red" size="sm" mt="md" ta="center">
              {error}
            </Text>
          )}

          <Button type="submit" fullWidth mt="xl">
            Sign In
          </Button>
        </form>
      </Paper>
    </AuthLayout>
  );
}
