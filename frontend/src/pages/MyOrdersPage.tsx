import {
  Container,
  Title,
  Loader,
  Alert,
  Table,
  Text,
  Paper,
} from "@mantine/core";
import { useEffect, useState } from "react";
import api from "../lib/api";

interface Order {
  id: number;
  userId: number;
  total: number;
  createdAt: string;
}

export function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Container pt="xl" style={{ textAlign: "center" }}>
        <Loader />
      </Container>
    );
  }

  if (error) {
    return (
      <Container pt="xl">
        <Alert color="red" title="Error">
          {error}
        </Alert>
      </Container>
    );
  }

  const rows = orders.map((order) => (
    <Table.Tr key={order.id}>
      <Table.Td>{order.id}</Table.Td>
      <Table.Td>{new Date(order.createdAt).toLocaleDateString()}</Table.Td>
      <Table.Td>${order.total.toFixed(2)}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Container pt="lg">
      <Title order={1} mb="lg">
        My Orders
      </Title>
      {orders.length === 0 ? (
        <Text>You have not placed any orders yet.</Text>
      ) : (
        <Paper withBorder shadow="sm" radius="md">
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Order ID</Table.Th>
                <Table.Th>Date</Table.Th>
                <Table.Th>Total</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Paper>
      )}
    </Container>
  );
}
