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

export function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length < 8 ? "Password must be at least 8 characters" : null,
    },
  });

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
      console.error(err);
      setLoading(false);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <AuthLayout>
      <Paper withBorder shadow="md" p={30} radius="md" pos="relative">
        <LoadingOverlay visible={loading} />
        <Title order={2} ta="center" mb={10}>
          Create an Account
        </Title>
        <Text c="dimmed" size="sm" ta="center" mb={30}>
          Already have an account?{" "}
          <Anchor component={Link} to="/login">
            Login here
          </Anchor>
        </Text>

        {success ? (
          <Text c="green" ta="center">
            Registration successful! Redirecting to login...
          </Text>
        ) : (
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
              Register
            </Button>
          </form>
        )}
      </Paper>
    </AuthLayout>
  );
}
