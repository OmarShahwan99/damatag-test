"use client";

import { useMemo, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Slider,
  Typography,
  CircularProgress,
  Alert,
  Container,
} from "@mui/material";
import {
  useGetProductsQuery,
  useGetCategoriesQuery,
} from "@/store/api/productsApi";
import ProductCard from "@/components/product/ProductCard";
import Rating from "@mui/material/Rating";

export default function Products() {
  const {
    data: products,
    isLoading: isProductsLoading,
    error,
  } = useGetProductsQuery();
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [minRating, setMinRating] = useState<number | null>(null);

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "all" || product.category === category;

      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      const matchesRating = !minRating || product.rating.rate >= minRating;

      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });
  }, [products, search, category, priceRange, minRating]);

  const isLoading = isProductsLoading || isCategoriesLoading;

  if (isLoading) {
    return (
      <Box className="flex justify-center items-center h-[70vh]">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="p-6">
        <Alert severity="error">Failed to load products</Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box className="py-16">
        {/* <Typography variant="h4" className="font-bold">
          Products
        </Typography> */}

        {/* Filters */}
        <Box className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {/* Search */}
          <TextField
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
          />

          {/* Category */}
          <TextField
            select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
          >
            <MenuItem value="all">All</MenuItem>
            {categories?.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>

          {/* Price Range */}
          <Box>
            <Typography gutterBottom>Price Range</Typography>
            <Slider
              value={priceRange}
              onChange={(_, value) => setPriceRange(value as number[])}
              valueLabelDisplay="auto"
              min={0}
              max={60}
            />
          </Box>

          {/* Rating */}
          <Box>
            <Typography gutterBottom>Min Rating</Typography>
            <Rating
              value={minRating}
              onChange={(_, value) => setMinRating(value)}
            />
          </Box>
        </Box>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <Box className="w-full text-center mt-10 text-gray-500">
            No products found
          </Box>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </Box>
    </Container>
  );
}
