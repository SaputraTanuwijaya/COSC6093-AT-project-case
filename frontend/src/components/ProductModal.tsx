import {
  Modal,
  TextInput,
  Textarea,
  NumberInput,
  Button,
  LoadingOverlay,
  Alert,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import api from "../lib/api";
import type { Product } from "../pages/AdminPage";

interface ProductModalProps {
  opened: boolean;
  onClose: () => void;
  product: Product | null;
  onSuccess: () => void;
}

export function ProductModal({
  opened,
  onClose,
  product,
  onSuccess,
}: ProductModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isEditing = !!product;

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
    },
    validate: {
      name: (val) => (val.trim().length === 0 ? "Name is required" : null),
      price: (val) => (val < 0 ? "Price must be positive" : null),
      stock: (val) => (val < 0 ? "Stock must be positive" : null),
    },
  });

  useEffect(() => {
    if (product) {
      form.setValues(product);
    } else {
      form.reset();
    }
  }, [product, opened]);

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    setError(null);
    try {
      if (isEditing) {
        await api.patch(`/product/${product.id}`, values);
      } else {
        await api.post("/product", values);
      }
      onSuccess();
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isEditing ? "Edit Product" : "Create Product"}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <LoadingOverlay visible={loading} />
        <TextInput
          label="Name"
          placeholder="Product name"
          required
          {...form.getInputProps("name")}
        />
        <Textarea
          label="Description"
          placeholder="Product description"
          mt="md"
          {...form.getInputProps("description")}
        />
        <NumberInput
          label="Price"
          placeholder="99.99"
          step={0.01}
          min={0}
          mt="md"
          required
          {...form.getInputProps("price")}
        />
        <NumberInput
          label="Stock"
          placeholder="100"
          min={0}
          mt="md"
          required
          {...form.getInputProps("stock")}
        />

        {error && (
          <Alert color="red" title="Error" mt="md">
            {error}
          </Alert>
        )}

        <Button type="submit" fullWidth mt="xl">
          {isEditing ? "Update Product" : "Create Product"}
        </Button>
      </form>
    </Modal>
  );
}
