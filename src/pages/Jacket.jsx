import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import ProductCard from "../components/product/ProductCard";
import { supabase } from "../services/supabaseClient";

function Jacket() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        let query = supabase.from("products").select("*").eq("category", "jacket");

        // Apply sorting
        if (sort === "price-low-high") query = query.order("price", { ascending: true });
        if (sort === "price-high-low") query = query.order("price", { ascending: false });
        if (sort === "newest") query = query.order("created_at", { ascending: false });

        const { data, error } = await query;

        if (error) throw error;
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err.message);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sort]);

  // Skeleton loader component
  const SkeletonCard = () => (
    <div className="animate-pulse bg-gray-100 rounded-xl h-64 w-full">
      <div className="h-3/4 bg-gray-200 rounded-t-xl"></div>
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col gap-6">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 text-base font-medium text-gray-800 bg-gray-100 hover:bg-primary hover:text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Return to home page"
          >
            Back to Home
          </Link>

          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
              Jacket Collection
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              Discover our premium Jacket collection crafted from the finest Aso Oke fabric, blending tradition with elegance.
            </p>
          </div>

          {/* Products info + sort */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
            <span className="text-gray-600 text-base">
              {loading ? "Loading..." : `${products.length} products found`}
            </span>
            <div className="relative">
              <label htmlFor="sort" className="sr-only">
                Sort products
              </label>
              <select
                id="sort"
                className="appearance-none bg-white pl-4 pr-10 py-2 rounded-lg border border-gray-200 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort products by"
              >
                <option value="newest">Newest</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                size={20}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Products grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 mt-6">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            ) : error ? (
              <div className="col-span-full text-center">
                <p className="text-red-500 text-base">{error}</p>
                <button
                  onClick={() => fetchProducts()}
                  className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200"
                  aria-label="Retry loading products"
                >
                  Try Again
                </button>
              </div>
            ) : products.length > 0 ? (
              products.map((item) => (
                <ProductCard
                  key={item.id}
                  category={item.category}
                  title={item.title}
                  image={`${item.image_url}?width=400&quality=70`}
                  price={item.price}
                  sizes={item.sizes}
                  loading="lazy"
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600 text-base">
                No products found.
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Jacket;