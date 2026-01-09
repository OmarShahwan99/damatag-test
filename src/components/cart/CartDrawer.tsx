"use client";

import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { ShoppingCart } from "@mui/icons-material";
import { useState } from "react";
import CartItem from "./CartItem";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const items = useSelector((state: RootState) => state.cart.items);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="relative">
        <span className="absolute w-4 h-4 bg-blue-500 text-white rounded-full flex justify-center items-center z-10 text-xs">
          {items.length}
        </span>
        <IconButton onClick={() => setOpen(true)}>
          <ShoppingCart />
        </IconButton>
      </div>
      <Drawer anchor="right" open={open} onClose={onClose}>
        <Box className="sm:w-96 flex flex-col h-full">
          {/* Header */}
          <Box className="flex items-center justify-between p-4">
            <Typography variant="h6">Shopping Cart</Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider />

          {/* Content */}
          <Box className="flex-1 overflow-auto p-4 space-y-4">
            {items.length === 0 ? (
              <Typography className="text-center text-gray-500 mt-10">
                Your cart is empty
              </Typography>
            ) : (
              items.map((item) => <CartItem key={item.id} item={item} />)
            )}
          </Box>

          <Divider />

          {/* Footer */}
          <Box className="p-4 space-y-3">
            <Box className="flex justify-between">
              <Typography>Total</Typography>
              <Typography fontWeight="bold">${total.toFixed(2)}</Typography>
            </Box>

            <Button variant="contained" fullWidth disabled={items.length === 0}>
              Checkout
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
