import type React from "react";
import { Center, Paper, Stack, Text } from "@mantine/core";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Center
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f0f1f 0%, #1b1b2f 50%, #251533 100%)",
        padding: "2rem",
      }}
    >
      <Stack gap="0" align="center">
        <Paper
          radius="xl"
          shadow="lg"
          p="2.5rem"
          style={{
            width: "min(95vw, 450px)",
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          }}
        >
          {children}
        </Paper>
        <Text size="xs" c="dimmed" mt="xl" ta="center">
          Quantum Store © 2025
        </Text>
      </Stack>
    </Center>
  );
}
