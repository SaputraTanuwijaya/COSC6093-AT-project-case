import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  user: { id: number; email: string; role: string } | null;
  cart: number[];
  setToken: (token: string) => void;
  setUser: (user: any) => void;
  logout: () => void;
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      token: null,
      user: null,
      cart: [],

      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      logout: () => set({ token: null, user: null, cart: [] }), // <-- UPDATED: Clear cart on logout

      addToCart: (productId) =>
        set((state) => {
          if (state.cart.includes(productId)) {
            return state;
          }
          return { cart: [...state.cart, productId] };
        }),

      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((id) => id !== productId),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "auth-storage",
    }
  )
);
