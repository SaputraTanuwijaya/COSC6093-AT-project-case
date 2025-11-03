import {
  Container,
  Title,
  Loader,
  Alert,
  Table,
  Text,
  Paper,
  Badge,
  Divider,
  Center,
  Box,
  Button,
  // Group,
} from "@mantine/core";
import api from "../lib/api";
import { useEffect, useState } from "react";

interface Order {
  id: number;
  userId: number;
  total: number;
  createdAt: string;
  status: string;
}

export function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get("/order");
      setOrders(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch your orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = async (orderId: number) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      try {
        await api.patch(`/order/${orderId}/cancel`);
        fetchOrders();
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to cancel order.");
      }
    }
  };

  if (loading) {
    return (
      <Center h="70vh">
        <Loader size="lg" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="70vh">
        <Alert color="red" radius="md" variant="light" title="Error">
          {error}
        </Alert>
      </Center>
    );
  }

  const rows = orders.map((order) => (
    <Table.Tr
      key={order.id}
      style={{
        transition: "all 0.25s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor =
          "rgba(0, 0, 0, 0.05)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
      }}
    >
      <Table.Td>
        <Badge color="blue" variant="light" radius="sm">
          #{order.id}
        </Badge>
      </Table.Td>
      <Table.Td>
        {new Date(order.createdAt).toLocaleDateString(undefined, {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </Table.Td>
      <Table.Td>
        <Badge
          color={
            order.status === "PENDING"
              ? "yellow"
              : order.status === "COMPLETED"
              ? "green"
              : "red"
          }
          variant="light"
        >
          {order.status}
        </Badge>
      </Table.Td>
      <Table.Td fw={600}>${order.total.toFixed(2)}</Table.Td>
      <Table.Td>
        {order.status === "PENDING" && (
          <Button
            size="xs"
            color="red"
            variant="outline"
            onClick={() => handleCancel(order.id)}
          >
            Cancel Order
          </Button>
        )}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Container size="lg" py="xl">
      <Box
        mb="lg"
        p="md"
        style={{
          textAlign: "center",
        }}
      >
        <Title
          order={2}
          mb="xs"
          style={{
            fontWeight: 700,
            letterSpacing: "-0.5px",
          }}
        >
          My Orders
        </Title>
        <Text c="dimmed" size="sm">
          Review your past purchases and order history
        </Text>
        <Divider mt="sm" w="80px" mx="auto" />
      </Box>

      {orders.length === 0 ? (
        <Center h="50vh">
          <Text c="dimmed" size="lg">
            You haven't placed any orders yet.
          </Text>
        </Center>
      ) : (
        <Paper
          withBorder
          shadow="md"
          radius="lg"
          p="md"
          style={{
            backdropFilter: "blur(8px)",
            background: "rgba(255, 255, 255, 0.85)",
            transition: "0.3s all",
          }}
        >
          <Table
            highlightOnHover
            verticalSpacing="md"
            horizontalSpacing="lg"
            fs="sm"
            withColumnBorders={false}
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>
                  <Text fw={600}>Order ID</Text>
                </Table.Th>
                <Table.Th>
                  <Text fw={600}>Date</Text>
                </Table.Th>
                <Table.Th>
                  <Text fw={600}>Status</Text>
                </Table.Th>
                <Table.Th>
                  <Text fw={600}>Price</Text>
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Paper>
      )}
    </Container>
  );
}
