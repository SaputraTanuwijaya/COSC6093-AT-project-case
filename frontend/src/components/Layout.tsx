import {
  AppShell,
  Burger,
  Group,
  Title,
  NavLink,
  ScrollArea,
  rem,
  Box,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, Link, useLocation } from "react-router-dom";
import { CartIcon } from "./CartIcon";
import { useAuthStore } from "../store/auth.store";

export function Layout() {
  const [opened, { toggle, close }] = useDisclosure();
  const { user } = useAuthStore();
  const location = useLocation();

  const links = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/product" },
    ...(user
      ? [
          { label: "My Orders", to: "/my-orders" },
          ...(user.role === "Admin"
            ? [{ label: "Admin Dashboard", to: "/admin" }]
            : []),
        ]
      : []),
  ];

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{
        width: 280,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
      transitionDuration={250}
      transitionTimingFunction="ease-in-out"
    >
      <AppShell.Header
        style={{
          backdropFilter: "blur(12px)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.92) 100%)",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        }}
      >
        <Group h="100%" px="lg" justify="space-between">
          <Group gap="md">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
              color="#333"
            />
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Title
                order={3}
                fw={800}
                style={{
                  background:
                    "linear-gradient(90deg, #4f46e5 0%, #9333ea 50%, #ec4899 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: "1.5rem",
                  letterSpacing: "-0.5px",
                }}
              >
                Quantum Store
              </Title>
            </Link>
          </Group>

          <Group gap="md">{user && <CartIcon />}</Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar
        p="md"
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(249, 250, 251, 0.95) 100%)",
          backdropFilter: "blur(8px)",
          borderRight: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <ScrollArea h="calc(100vh - 120px)" type="hover">
          <Box pb="lg">
            {links.map((link) => (
              <NavLink
                key={link.to}
                label={link.label}
                component={Link}
                to={link.to}
                onClick={close}
                active={location.pathname === link.to}
                style={{
                  borderRadius: rem(8),
                  marginBottom: rem(8),
                  fontWeight: 500,
                  color: "#333",
                }}
                styles={{
                  root: {
                    "&[data-active]": {
                      background:
                        "linear-gradient(90deg, #4f46e5 0%, #9333ea 100%)",
                      color: "white",
                      fontWeight: 600,
                    },
                    "&:hover": {
                      background: "rgba(79, 70, 229, 0.08)",
                    },
                  },
                }}
              />
            ))}
          </Box>
        </ScrollArea>
      </AppShell.Navbar>

      <AppShell.Main
        style={{
          background:
            "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 50%, #f1f5f9 100%)",
          minHeight: "100vh",
          // paddingTop: "1rem",
        }}
      >
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
