export interface Product {
  id: string; name: string; flavor: string; puffs: number;
  price: number; image: string; note: string; tag: string;
}

export const products: Product[] = [
  { id: "grape-ice", name: "Disposable Pod", flavor: "Grape Ice", puffs: 50000, price: 18.99, image: "/media/grape.jpg", note: "Deep, juicy, ice-cold finish", tag: "Best Seller" },
  { id: "mango-ice", name: "Disposable Pod", flavor: "Mango Ice", puffs: 50000, price: 18.99, image: "/media/mango.jpg", note: "Sun-ripe mango on crushed ice", tag: "Fan Favorite" },
  { id: "lush-ice", name: "Disposable Pod", flavor: "Lush Ice", puffs: 50000, price: 18.99, image: "/media/lush.jpg", note: "Watermelon, chilled to perfection", tag: "New" },
  { id: "peach-ice", name: "Disposable Pod", flavor: "Peach Ice", puffs: 50000, price: 18.99, image: "/media/peach.jpg", note: "Soft peach with a frosty edge", tag: "Smooth" },
  { id: "blue-razz", name: "Disposable Vape", flavor: "Blue Razz Ice", puffs: 50000, price: 24.99, image: "/media/blue.jpg", note: "Blueberry burst on crushed ice", tag: "Bold" },
  { id: "variety", name: "Flavor Box", flavor: "Mixed Fruit Pack", puffs: 50000, price: 49.99, image: "/media/puffs.jpg", note: "Can't pick one? Take three.", tag: "Bundle" }
];
