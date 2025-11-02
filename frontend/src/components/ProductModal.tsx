"use client";

import {
  Modal,
  TextInput,
  Textarea,
  NumberInput,
  Button,
  LoadingOverlay,
  Alert,
  Title,
  Divider,
  Group,
  Stack,
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
      imageUrl: "",
    },
    validate: {
      name: (val) => (val.trim().length === 0 ? "Name is required" : null),
      price: (val) => (val < 0 ? "Price must be positive" : null),
      stock: (val) => (val < 0 ? "Stock must be positive" : null),
    },
  });

  useEffect(() => {
    if (product) {
      form.setValues({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        imageUrl: product.imageUrl ?? "",
      });
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
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton
      centered
      radius="xl"
      size="lg"
      overlayProps={{
        backgroundOpacity: 0.5,
        blur: 10,
      }}
      transitionProps={{ transition: "pop", duration: 250 }}
      styles={{
        content: {
          maxWidth: "550px",
        },
      }}
    >
      <LoadingOverlay visible={loading} />

      <Stack gap="0" mb="xl">
        <Title
          order={3}
          ta="center"
          style={{
            background: "linear-gradient(90deg, #7f00ff, #1e90ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 700,
            fontSize: "1.5rem",
            letterSpacing: "0.5px",
          }}
        >
          {isEditing ? "Edit Product" : "Create New Product"}
        </Title>
        <Divider my="md" />
      </Stack>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Product Name"
            placeholder="Enter product name"
            radius="md"
            size="md"
            withAsterisk
            {...form.getInputProps("name")}
          />

          <Textarea
            label="Description"
            placeholder="Describe your product..."
            radius="md"
            size="md"
            autosize
            minRows={3}
            maxRows={5}
            {...form.getInputProps("description")}
          />

          <Group grow>
            <NumberInput
              label="Price ($)"
              placeholder="0.00"
              step={0.01}
              min={0}
              radius="md"
              size="md"
              {...form.getInputProps("price")}
            />
            <NumberInput
              label="Stock"
              placeholder="0"
              min={0}
              radius="md"
              size="md"
              {...form.getInputProps("stock")}
            />
          </Group>

          <TextInput
            label="Image URL"
            placeholder="https://example.com/image.png"
            radius="md"
            size="md"
            {...form.getInputProps("imageUrl")}
          />

          {error && (
            <Alert color="red" title="Error" variant="light" radius="md">
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            radius="md"
            size="md"
            mt="xl"
            loading={loading}
          >
            {isEditing ? "Update Product" : "Create Product"}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
