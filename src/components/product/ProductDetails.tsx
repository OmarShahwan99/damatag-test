"use client";

import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Rating,
  Divider,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import { useGetProductQuery } from "@/store/api/productsApi";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
} from "@/store/slices/cartSlice";
import { RootState } from "@/store";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function ProductDetails({ id }: { id: string }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { data: product, isLoading, error } = useGetProductQuery(Number(id));

  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === Number(id))
  );

  if (isLoading) {
    return (
      <Box className="flex justify-center items-center h-[70vh]">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Box className="p-6 max-w-4xl mx-auto">
        <Alert severity="error">Failed to load product</Alert>
      </Box>
    );
  }

  return (
    <Box className="p-6 max-w-6xl mx-auto">
      {/* Back */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.back()}
        className="mb-6!"
      >
        Back
      </Button>

      <Box className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <Box className="flex justify-center items-center bg-gray-100 rounded-lg p-6">
          <img
            src={product.image}
            alt={product.title}
            width={350}
            height={350}
            className="object-contain"
          />
        </Box>

        {/* Info */}
        <Box>
          <Typography variant="h5" fontWeight="bold">
            {product.title}
          </Typography>

          <Typography className="text-gray-500 mt-2!">
            {product.category}
          </Typography>

          <Box className="flex items-center gap-2 mt-3">
            <Rating value={product.rating.rate} precision={0.5} readOnly />
            <Typography className="text-sm text-gray-500">
              ({product.rating.count} reviews)
            </Typography>
          </Box>

          <Typography variant="h4" fontWeight="bold" className="mt-4!">
            ${product.price}
          </Typography>

          <Divider className="my-4!" />

          <Typography className="text-gray-700 leading-relaxed!">
            {product.description}
          </Typography>

          {/* Cart Actions */}
          <Box className="mt-6">
            {!cartItem ? (
              <Button
                variant="contained"
                size="large"
                onClick={() => dispatch(addToCart(product))}
              >
                Add to Cart
              </Button>
            ) : (
              <Box className="flex items-center gap-4">
                <IconButton
                  onClick={() => dispatch(decreaseQuantity(product.id))}
                >
                  <RemoveIcon />
                </IconButton>

                <Typography fontWeight="bold">{cartItem.quantity}</Typography>

                <IconButton onClick={() => dispatch(addToCart(product))}>
                  <AddIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
