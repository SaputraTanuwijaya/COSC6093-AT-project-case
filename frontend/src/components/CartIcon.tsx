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
      }
      setLoading(false);
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
        title="Your Cart"
        size="lg"
        pos="relative"
      >
        <LoadingOverlay visible={loading} />
        {cart.length === 0 ? (
          <Text>Your cart is empty.</Text>
        ) : (
          <Stack>
            {cartProducts.map((product) => (
              <Group key={product.id} justify="space-between">
                <Text>{product.name}</Text>
                <Group>
                  <Text>${product.price.toFixed(2)}</Text>
                  <Button
                    size="xs"
                    variant="outline"
                    color="red"
                    onClick={() => removeFromCart(product.id)}
                  >
                    Remove
                  </Button>
                </Group>
              </Group>
            ))}
            <Group
              justify="space-between"
              mt="md"
              style={{ borderTop: "1px solid grey", paddingTop: "1rem" }}
            >
              <Text fw={700} size="lg">
                Total:
              </Text>
              <Text fw={700} size="lg">
                ${total.toFixed(2)}
              </Text>
            </Group>
            {error && (
              <Alert color="red" title="Error">
                {error}
              </Alert>
            )}
            <Button
              fullWidth
              mt="md"
              onClick={handleCheckout}
              disabled={loading}
            >
              Checkout
            </Button>
          </Stack>
        )}
      </Modal>

      <Indicator label={cart.length} size={16} disabled={cart.length === 0}>
        <ActionIcon
          size="lg"
          variant="subtle"
          color="gray"
          onClick={() => setModalOpened(true)}
        >
          <IconShoppingCart />
        </ActionIcon>
      </Indicator>
    </>
  );
}
