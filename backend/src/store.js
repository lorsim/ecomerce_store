export function createStore({ nth }) {
  return {
    nth,
    catalog: {
      apple: { id: "apple", price: 50 },
      banana: { id: "banana", price: 30 },
      milk: { id: "milk", price: 70 },
    },
    carts: new Map(),
    orders: [],
    discount: {
      orderCount: 0,
      active: null,
      history: [],
      totalDiscountAmount: 0,
    },
  };
}
