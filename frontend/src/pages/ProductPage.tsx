import {
  Card,
  Image,
  Text,
  Title,
  Badge,
  Button,
  Group,
  SimpleGrid,
  Container,
  Loader,
  Alert,
} from "@mantine/core";
import { useEffect, useState } from "react";
import api from "../lib/api";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get("/product");
        setProducts(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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

  return (
    <Container pt="xl">
      <Title order={1} mb="lg">
        Our Products
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
        {products.map((product) => (
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            key={product.id}
          >
            <Card.Section>
              <Image
                src={`https://picsum.photos/seed/${product.id}/400/200`}
                height={160}
                alt={product.name}
              />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>{product.name}</Text>
              <Badge
                color={product.stock > 0 ? "green" : "red"}
                variant="light"
              >
                {product.stock > 0
                  ? `${product.stock} in Stock`
                  : "Out of Stock"}
              </Badge>
            </Group>

            <Text size="sm" c="dimmed">
              {product.description}
            </Text>

            <Text fw={700} size="xl" mt="md">
              ${product.price.toFixed(2)}
            </Text>

            <Button
              variant="light"
              color="blue"
              fullWidth
              mt="md"
              radius="md"
              disabled={product.stock === 0}
            >
              Add to cart
            </Button>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}
