import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

const customStorage = {
  getItem: (name) => {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },

  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  },

  removeItem: (name) => {
    localStorage.removeItem(name);
  },
};

export const store = create(
  persist(
    (set) => ({
      currentUser: null,
      isLoading: true,
      cartProduct: [],
      favoriteProduct: [],

      getUserInfo: async (uid) => {
        if (!uid) {
          set({ currentUser: null, isLoading: false });
          return;
        }
        const docRef = doc(db, 'users', uid);
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            set({
              currentUser: docSnap.data(),
              isLoading: false,
            });
          } else {
            set({ currentUser: null, isLoading: false });
          }
        } catch (error) {
          console.log('getUserInfo error', error);
          set({ currentUser: null, isLoading: false });
        }
      },

      addToCart: (product) => {
        return new Promise((resolve) => {
          set((state) => {
            const existingProduct = state.cartProduct.find(
              (p) => p._id === product._id
            );

            if (existingProduct) {
              return {
                cartProduct: state.cartProduct.map((p) =>
                  p._id === product._id
                    ? { ...p, quantity: (p.quantity || 0) + 1 }
                    : p
                ),
              };
            } else {
              return {
                
                cartProduct: [
                  ...state.cartProduct,
                  { ...product, quantity: 1 },
                ],
              };
            }
          });
          resolve();
        });
      },
      decreaseQuantity: (productId) => {
        set((state) => {
          const existingProduct = state.cartProduct.find(
            (p) => p._id === productId
          );

          if (existingProduct) {
            return {
              cartProduct: state.cartProduct.map((p) =>
                p._id === productId
                  ? { ...p, quantity: Math.max(p.quantity - 1, 1) }
                  : p

              ),
            };
          } else {
            return state;
          }
        });
      },
      removeFromCart: (productId) => {
        set((state) => ({
          cartProduct: state.cartProduct.filter(
            (item) => item._id !== productId
          ),
        }));
      },
      resetCart: () => {
        set({ cartProduct: [] });
      },
    }),
    {
      name: 'ecommerce-storage',
      storage: customStorage,
    }
  )
);
