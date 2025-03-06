import React, { useState } from 'react';
import { Filter, ShoppingCart } from 'lucide-react';
import ProductCardComponent from '../components/ProductCardComponent';

const productsData = [
  { id: 1, name: 'Product 1', image: '/product/1.png', price: 20, rating: 4.5, discount: 5, reviews: 13 },
  { id: 2, name: 'Product 2', image: '/product/2.png', price: 30, rating: 4, discount: 99, reviews: 653 },
  { id: 3, name: 'Product 3', image: '/product/3.png', price: 25, rating: 3.5, discount: 18, reviews: 23 },
  { id: 4, name: 'Product 4', image: '/product/4.png', price: 18, rating: 4.2, discount: 10, reviews: 45 },
  { id: 5, name: 'Product 5', image: '/product/5.png', price: 35, rating: 4.7, discount: 20, reviews: 67 },
  { id: 6, name: 'Product 6', image: '/product/6.png', price: 22, rating: 3.8, discount: 15, reviews: 32 },
  { id: 7, name: 'Product 7', image: '/product/7.png', price: 40, rating: 4.3, discount: 8, reviews: 90 },
  { id: 8, name: 'Product 8', image: '/product/8.png', price: 19, rating: 3.9, discount: 7, reviews: 25 },
  { id: 9, name: 'Product 9', image: '/product/9.png', price: 28, rating: 4.6, discount: 12, reviews: 38 },
  { id: 10, name: 'Product 10', image: '/product/10.png', price: 24, rating: 3.7, discount: 18, reviews: 52 },
  { id: 11, name: 'Product 11', image: '/product/11.png', price: 33, rating: 4.1, discount: 25, reviews: 120 },
  { id: 12, name: 'Product 12', image: '/product/12.png', price: 29, rating: 4.4, discount: 17, reviews: 73 },
  { id: 6, name: 'Product 6', image: '/product/6.png', price: 22, rating: 3.8, discount: 15, reviews: 32 },
  { id: 7, name: 'Product 7', image: '/product/7.png', price: 40, rating: 4.3, discount: 8, reviews: 90 },
  { id: 8, name: 'Product 8', image: '/product/8.png', price: 19, rating: 3.9, discount: 7, reviews: 25 },
  { id: 9, name: 'Product 9', image: '/product/9.png', price: 28, rating: 4.6, discount: 12, reviews: 38 },
  { id: 10, name: 'Product 10', image: '/product/10.png', price: 24, rating: 3.7, discount: 18, reviews: 52 },
  { id: 11, name: 'Product 11', image: '/product/11.png', price: 33, rating: 4.1, discount: 25, reviews: 120 },
  { id: 12, name: 'Product 12', image: '/product/12.png', price: 29, rating: 4.4, discount: 17, reviews: 73 },
  { id: 6, name: 'Product 6', image: '/product/6.png', price: 22, rating: 3.8, discount: 15, reviews: 32 },
  { id: 7, name: 'Product 7', image: '/product/7.png', price: 40, rating: 4.3, discount: 8, reviews: 90 },
  { id: 8, name: 'Product 8', image: '/product/8.png', price: 19, rating: 3.9, discount: 7, reviews: 25 },
  { id: 9, name: 'Product 9', image: '/product/9.png', price: 28, rating: 4.6, discount: 12, reviews: 38 },
  { id: 10, name: 'Product 10', image: '/product/10.png', price: 24, rating: 3.7, discount: 18, reviews: 52 },
  { id: 11, name: 'Product 11', image: '/product/11.png', price: 33, rating: 4.1, discount: 25, reviews: 120 },
  { id: 12, name: 'Product 12', image: '/product/12.png', price: 29, rating: 4.4, discount: 17, reviews: 73 },
  { id: 6, name: 'Product 6', image: '/product/6.png', price: 22, rating: 3.8, discount: 15, reviews: 32 },
  { id: 7, name: 'Product 7', image: '/product/7.png', price: 40, rating: 4.3, discount: 8, reviews: 90 },
  { id: 8, name: 'Product 8', image: '/product/8.png', price: 19, rating: 3.9, discount: 7, reviews: 25 },
  { id: 9, name: 'Product 9', image: '/product/9.png', price: 28, rating: 4.6, discount: 12, reviews: 38 },
  { id: 10, name: 'Product 10', image: '/product/10.png', price: 24, rating: 3.7, discount: 18, reviews: 52 },
  { id: 11, name: 'Product 11', image: '/product/11.png', price: 33, rating: 4.1, discount: 25, reviews: 120 },
  { id: 12, name: 'Product 12', image: '/product/12.png', price: 29, rating: 4.4, discount: 17, reviews: 73 },
  { id: 6, name: 'Product 6', image: '/product/6.png', price: 22, rating: 3.8, discount: 15, reviews: 32 },
  { id: 7, name: 'Product 7', image: '/product/7.png', price: 40, rating: 4.3, discount: 8, reviews: 90 },
  { id: 8, name: 'Product 8', image: '/product/8.png', price: 19, rating: 3.9, discount: 7, reviews: 25 },
  { id: 9, name: 'Product 9', image: '/product/9.png', price: 28, rating: 4.6, discount: 12, reviews: 38 },
  { id: 10, name: 'Product 10', image: '/product/10.png', price: 24, rating: 3.7, discount: 18, reviews: 52 },
  { id: 11, name: 'Product 11', image: '/product/11.png', price: 33, rating: 4.1, discount: 25, reviews: 120 },
  { id: 12, name: 'Product 12', image: '/product/12.png', price: 29, rating: 4.4, discount: 17, reviews: 73 },
  
];

const ProductSearchPage = () => {
  const [filter_open, setFilterOpen] = useState(false);
  const [filtered_products, setFilteredProducts] = useState(productsData);
  const [visible_products_count, setVisibleProductsCount] = useState(10);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setFilteredProducts(productsData.filter(product => product.price <= 25));
    setVisibleProductsCount(10); // Reset visible products count after filtering
  };

  const handleLoadMore = () => {
    setVisibleProductsCount((prevCount) => prevCount + 10); // Load 10 more products on each click
  };

  const visible_products = filtered_products.slice(0, visible_products_count);

  return (
    <div className="container mx-auto p-4">
      {/* Results and Filter */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-xl font-semibold">{filtered_products.length} Results Found</span>
        <button onClick={() => setFilterOpen(!filter_open)} className="flex items-center text-green-500">
          <Filter className="mr-2" /> Filter
        </button>
      </div>

      {/* Filter Box */}
      {filter_open && (
        <form className="bg-gray-100 p-4 mb-6 rounded-lg" onSubmit={handleFilterSubmit}>
          <div className="mb-4">
            <label className="block text-sm mb-2">Filter Option</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter filter option"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded-lg w-full"
          >
            Apply Filter
          </button>
        </form>
      )}

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible_products.map(product => (
          <ProductCardComponent
            key={product.id}
            product={product}
            showViewDetailBtn={true}
            viewDetailBgColor={"blue"}
          />
        ))}
      </div>

      {/* Load More Button */}
      {visible_products.length < filtered_products.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductSearchPage;
