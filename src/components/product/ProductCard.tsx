"use client";

import { Card, CardContent, Button, IconButton } from "@mui/material";
import { Product } from "@/types/product";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { addToCart, decreaseQuantity } from "@/store/slices/cartSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch();

  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === product.id)
  );

  return (
    <Card className="h-full flex flex-col ">
      <Link
        href={`/products/${product.id}`}
        className="flex justify-center items-center bg-gray-100 p-2 min-h-64"
      >
        <img
          src={product.image}
          alt={product.title}
          width={140}
          height={180}
          className="object-contain mx-auto"
        />
      </Link>

      <CardContent className="flex-1">
        <h3 className="font-semibold line-clamp-2">{product.title}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="font-bold">${product.price}</p>
      </CardContent>

      {/* Cart Action */}
      {!cartItem ? (
        <Button
          variant="text"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dispatch(addToCart(product));
          }}
        >
          Add to Cart
        </Button>
      ) : (
        <div className="flex items-center justify-center gap-3 pb-3">
          <IconButton
            size="small"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(decreaseQuantity(product.id));
            }}
          >
            <RemoveIcon />
          </IconButton>

          <span className="font-semibold">{cartItem.quantity}</span>

          <IconButton
            size="small"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(addToCart(product));
            }}
          >
            <AddIcon />
          </IconButton>
        </div>
      )}
    </Card>
  );
}
