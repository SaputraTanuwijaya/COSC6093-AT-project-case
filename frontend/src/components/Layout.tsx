import { AppShell, Burger, Group, Title, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, Link } from "react-router-dom";
import { CartIcon } from "./CartIcon";
import { useAuthStore } from "../store/auth.store";

export function Layout() {
  const [opened, { toggle }] = useDisclosure();
  const { user } = useAuthStore();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Title order={3}>Quantum Store</Title>
            </Link>
          </Group>
          <Group>{user && <CartIcon />}</Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Text component={Link} to="/" onClick={toggle}>
          Home
        </Text>
        <Text component={Link} to="/product" mt="sm" onClick={toggle}>
          Products
        </Text>
        {user && (
          <>
            <Text component={Link} to="/my-orders" mt="sm" onClick={toggle}>
              My Orders
            </Text>
            {user.role === "Admin" && (
              <Text component={Link} to="/admin" mt="sm" onClick={toggle}>
                Admin Dashboard
              </Text>
            )}
          </>
        )}
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
