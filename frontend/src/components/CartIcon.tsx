import {
  Indicator,
  ActionIcon,
  Modal,
  Text,
  Button,
  Group,
  Stack,
  Alert,
  LoadingOverlay,
  Divider,
  Paper,
  ScrollArea,
  Box,
} from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import { useAuthStore } from "../store/auth.store";
import { useEffect, useState } from "react";
import api from "../lib/api";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
}

export function CartIcon() {
  const { cart, user, clearCart, removeFromCart } = useAuthStore();
  const [modalOpened, setModalOpened] = useState(false);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || cart.length === 0 || !modalOpened) {
      setCartProducts([]);
      return;
    }

    const fetchCartProducts = async () => {
      setLoading(true);
      try {
        const response = await api.get("/product");
        const allProducts: Product[] = response.data;
        const productsInCart = allProducts.filter((p) => cart.includes(p.id));
        setCartProducts(productsInCart);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch cart details.");
      } finally {
        setLoading(false);
      }
    };
    fetchCartProducts();
  }, [cart, modalOpened, user]);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      await api.post("/order", { productIds: cart });
      alert("Checkout successful! Your order has been placed.");
      clearCart();
      setModalOpened(false);
      navigate("/my-orders");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Checkout failed.");
    } finally {
      setLoading(false);
    }
  };

  const total = cartProducts.reduce((sum, p) => sum + p.price, 0);

  return (
    <>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        withCloseButton
        radius="xl"
        overlayProps={{
          backgroundOpacity: 0.5,
          blur: 10,
        }}
        transitionProps={{
          transition: "pop",
          duration: 250,
        }}
        styles={{
          // modal: {},
          content: {
            marginLeft: "auto",
            marginRight: 0,
            maxWidth: "480px",
            height: "fit-content",
            maxHeight: "90vh",
          },
        }}
      >
        <Stack gap="0" mb="md">
          <Text fw={700} size="xl" ta="center">
            🛒 Your Cart
          </Text>
          <Divider my="md" />
        </Stack>

        <LoadingOverlay visible={loading} />

        <Stack gap="md" mb="md">
          {cart.length === 0 ? (
            <Box ta="center" py="xl">
              <Text c="dimmed" size="md">
                Your cart is empty. Start adding some cool stuff!
              </Text>
            </Box>
          ) : (
            <>
              <ScrollArea.Autosize mah={350} offsetScrollbars>
                <Stack gap="sm">
                  {cartProducts.map((product) => (
                    <Paper
                      key={product.id}
                      p="md"
                      radius="md"
                      style={{
                        transition: "all 0.2s ease",
                      }}
                    >
                      <Group justify="space-between">
                        <div>
                          <Text fw={600} size="sm">
                            {product.name}
                          </Text>
                          <Text fw={700} size="lg" c="blue" mt="4">
                            ${product.price.toFixed(2)}
                          </Text>
                        </div>
                        <Button
                          size="xs"
                          variant="light"
                          color="red"
                          radius="md"
                          onClick={() => removeFromCart(product.id)}
                        >
                          Remove
                        </Button>
                      </Group>
                    </Paper>
                  ))}
                </Stack>
              </ScrollArea.Autosize>

              <Divider my="md" />

              <Group justify="space-between">
                <Text fw={700} size="lg">
                  Total:
                </Text>
                <Text fw={700} size="lg" c="blue">
                  ${total.toFixed(2)}
                </Text>
              </Group>
            </>
          )}
        </Stack>

        {error && (
          <Alert color="red" title="Error" radius="md" mb="md">
            {error}
          </Alert>
        )}

        {cart.length > 0 && (
          <Button
            fullWidth
            radius="md"
            size="md"
            onClick={handleCheckout}
            disabled={loading}
          >
            Proceed to Checkout
          </Button>
        )}
      </Modal>

      <Indicator
        label={cart.length}
        size={20}
        disabled={cart.length === 0}
        color="blue"
        processing
      >
        <ActionIcon
          size="lg"
          variant="light"
          radius="xl"
          color="blue"
          onClick={() => setModalOpened(true)}
          style={{
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.transform = "scale(1.12)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.transform = "scale(1)")
          }
        >
          <IconShoppingCart style={{ width: "70%", height: "70%" }} />
        </ActionIcon>
      </Indicator>
    </>
  );
}
