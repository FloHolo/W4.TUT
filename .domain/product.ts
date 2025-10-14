// Type definition for the Product
export type Product = {
  readonly id: string;           // Unique key for persistence
  readonly name: string;
  readonly price: number;
  readonly category?: string;
};

// Input type for the factory
export type ProductInput = {
  id: unknown;
  name: unknown;
  price: unknown;
  category?: unknown;
};

// Factory function to create a Product
export const createProduct = (input: ProductInput): Product => {
  const { id, name, price, category } = input;

  // Validate required fields
  if (typeof id !== 'string' || id.trim() === '') {
    throw new Error('Product must have a non-empty string id.');
  }
  if (typeof name !== 'string' || name.trim() === '') {
    throw new Error('Product must have a non-empty string name.');
  }
  if (typeof price !== 'number' || isNaN(price) || price < 0) {
    throw new Error('Product must have a valid non-negative price.');
  }

  // Return immutable Product object
  return Object.freeze({
    id,
    name,
    price,
    category: typeof category === 'string' ? category : undefined,
  });
};
