import { Center, Container } from "@mantine/core";
import { type ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Container fluid h="100vh">
      <Center h="100%">
        <Container size="xs" w="100%">
          {children}
        </Container>
      </Center>
    </Container>
  );
}
