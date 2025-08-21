import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { ChevronDown, Search as SearchIcon } from "lucide-react";
import ProductCard from "../components/product/ProductCard";
import { supabase } from "../services/supabaseClient";

function Search() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  // Debounced search term
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchTerm(searchTerm), 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        let query = supabase.from("products").select("*");

        // Category filter
        if (category !== "all") {
          query = query.eq("category", category);
        }

        // Search filter
        if (debouncedSearchTerm) {
          query = query.ilike("title", `%${debouncedSearchTerm}%`);
        }

        // Sort
        if (sort === "price-low-high") query = query.order("price", { ascending: true });
        else if (sort === "price-high-low") query = query.order("price", { ascending: false });
        else if (sort === "newest") query = query.order("created_at", { ascending: false });

        const { data, error } = await query;

        if (error) throw error;

        let result = data;

        // Shuffle default products if no filters applied
        if (category === "all" && sort === "newest" && !debouncedSearchTerm) {
          for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
          }
        }

        setProducts(result);
      } catch (err) {
        console.error("Error fetching products:", err.message);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, sort, debouncedSearchTerm]);

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
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
              Search Products
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              Find your perfect Aso Oke traditional wear
            </p>
          </div>

          {/* Search input */}
          <div className="relative">
            <label htmlFor="search" className="sr-only">
              Search products
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label="Search products"
            />
            <SearchIcon
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={20}
              aria-hidden="true"
            />
          </div>

          {/* Filters and sort */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="relative">
                <label htmlFor="category" className="sr-only">
                  Filter by category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="appearance-none bg-white pl-4 pr-10 py-2 rounded-lg border border-gray-200 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-primary/50"
                  aria-label="Filter by category"
                >
                  <option value="all">All Categories</option>
                  <option value="agbada">Agbada</option>
                  <option value="fila">Fila</option>
                  <option value="bubu">Bubu Gown</option>
                  <option value="cargo">Cargo Pant</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                  size={20}
                  aria-hidden="true"
                />
              </div>
              <div className="relative">
                <label htmlFor="sort" className="sr-only">
                  Sort products
                </label>
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none bg-white pl-4 pr-10 py-2 rounded-lg border border-gray-200 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-primary/50"
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
            <span className="text-gray-600 text-base">
              {loading ? "Loading..." : `${products.length} products found`}
            </span>
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
                  title={item.title}
                  category={item.category}
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

export default Search;