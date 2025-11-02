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
  Center,
} from "@mantine/core";
import api from "../lib/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string | null;
}

export function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user, cart, addToCart } = useAuthStore();
  const navigate = useNavigate();

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

  const handleAddToCart = (productId: number) => {
    if (!user) {
      navigate("/login");
    } else {
      addToCart(productId);
    }
  };

  if (loading) {
    return (
      <Center style={{ minHeight: "80vh" }}>
        <Loader color="violet" size="lg" />
      </Center>
    );
  }

  if (error) {
    return (
      <Container pt="xl">
        <Alert color="red" title="Error" variant="light">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container
      fluid
      py="xl"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #4f46e5 0%, #9333ea 50%, #ec4899 100%)",
        backgroundAttachment: "fixed",
        padding: "4rem 2rem",
      }}
    >
      <Container size="lg">
        <Title
          order={1}
          ta="center"
          mb="lg"
          style={{
            fontWeight: 900,
            color: "#fff",
            letterSpacing: "-0.5px",
            textShadow: "0 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          Explore Our Quantum Collection
        </Title>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {products.map((product) => {
            const isInCart = cart.includes(product.id);
            const isOutOfStock = product.stock === 0;

            return (
              <Card
                key={product.id}
                radius="lg"
                padding="lg"
                shadow="xl"
                withBorder
                style={{
                  backdropFilter: "blur(16px)",
                  background: "rgba(255, 255, 255, 0.15)",
                  border: "1px solid rgba(255, 255, 255, 0.25)",
                  color: "#fff",
                  transition:
                    "transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 35px rgba(0,0,0,0.4)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(0,0,0,0.25)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                }}
              >
                <Card.Section>
                  <Image
                    src={
                      product.imageUrl ||
                      "https://placehold.co/600x400/EEE/AAA/png?text=No+Image" ||
                      "/placeholder.svg"
                    }
                    height={180}
                    alt={product.name}
                    style={{
                      objectFit: "cover",
                      borderRadius: "10px 10px 0 0",
                    }}
                  />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={600} size="lg" style={{ color: "#fff" }}>
                    {product.name}
                  </Text>
                  <Badge
                    color={isOutOfStock ? "red" : "teal"}
                    variant="filled"
                    style={{
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      background: isOutOfStock
                        ? "rgba(239, 68, 68, 0.8)"
                        : "rgba(34,197,94,0.8)",
                    }}
                  >
                    {isOutOfStock
                      ? "Out of Stock"
                      : `${product.stock} Available`}
                  </Badge>
                </Group>

                <Text size="sm" c="gray.2" lineClamp={3}>
                  {product.description}
                </Text>

                <Text
                  fw={700}
                  size="xl"
                  mt="md"
                  style={{
                    background:
                      "linear-gradient(90deg, #60a5fa, #c084fc, #ec4899)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  ${product.price.toFixed(2)}
                </Text>

                <Button
                  variant={isInCart ? "outline" : "gradient"}
                  gradient={{
                    from: "#7c3aed",
                    to: "#ec4899",
                    deg: 90,
                  }}
                  fullWidth
                  mt="md"
                  radius="md"
                  disabled={isOutOfStock || isInCart}
                  onClick={() => handleAddToCart(product.id)}
                  style={{
                    fontWeight: 600,
                    color: "#fff",
                    transition: "transform 0.15s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.04)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  {isOutOfStock
                    ? "Out of Stock"
                    : isInCart
                    ? "Added to Cart"
                    : "Add to Cart"}
                </Button>
              </Card>
            );
          })}
        </SimpleGrid>
      </Container>
    </Container>
  );
}
