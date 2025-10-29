import {
  Container,
  Title,
  Loader,
  Alert,
  Table,
  Button,
  Group,
  Paper,
} from "@mantine/core";
import { useEffect, useState } from "react";
import api from "../lib/api";
import { ProductModal } from "../components/ProductModal";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpened, setModalOpened] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/product");
      setProducts(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openCreateModal = () => {
    setSelectedProduct(null);
    setModalOpened(true);
  };

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setModalOpened(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/product/${id}`);
        fetchProducts();
      } catch (err) {
        console.error(err);
        setError("Failed to delete product.");
      }
    }
  };

  if (loading) {
    return (
      <Container pt="xl" style={{ textAlign: "center" }}>
        <Loader />
      </Container>
    );
  }

  const rows = products.map((product) => (
    <Table.Tr key={product.id}>
      <Table.Td>{product.id}</Table.Td>
      <Table.Td>{product.name}</Table.Td>
      <Table.Td>${product.price.toFixed(2)}</Table.Td>
      <Table.Td>{product.stock}</Table.Td>
      <Table.Td>
        <Group gap="xs">
          <Button
            size="xs"
            variant="outline"
            onClick={() => openEditModal(product)}
          >
            Edit
          </Button>
          <Button
            size="xs"
            color="red"
            onClick={() => handleDelete(product.id)}
          >
            Delete
          </Button>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Container pt="lg">
      <Group justify="space-between" mb="lg">
        <Title order={1}>Admin Dashboard</Title>
        <Button onClick={openCreateModal}>Create New Product</Button>
      </Group>

      {error && (
        <Alert
          color="red"
          title="Error"
          mb="lg"
          withCloseButton
          onClose={() => setError(null)}
        >
          {error}
        </Alert>
      )}

      <Paper withBorder shadow="sm" radius="md">
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Price</Table.Th>
              <Table.Th>Stock</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>

      <ProductModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        product={selectedProduct}
        onSuccess={() => {
          setModalOpened(false);
          fetchProducts();
        }}
      />
    </Container>
  );
}
