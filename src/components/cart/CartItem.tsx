import {
  addToCart,
  type CartItem,
  decreaseQuantity,
  removeFromCart,
} from "@/store/slices/cartSlice";
import { Add, Delete, Remove } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

const CartItem = ({ item }: { item: CartItem }) => {
  const dispatch = useDispatch();

  return (
    <Box
      key={item.id}
      className="flex gap-3 items-center border rounded-lg p-2"
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-16 h-16 object-contain"
      />

      <Box className="flex-1">
        <Typography className="text-sm font-medium line-clamp-2">
          {item.title}
        </Typography>
        <Typography className="text-sm text-gray-500">${item.price}</Typography>

        {/* Quantity */}
        <Box className="flex items-center gap-2 mt-1">
          <IconButton
            size="small"
            onClick={() => dispatch(decreaseQuantity(item.id))}
          >
            <Remove fontSize="small" />
          </IconButton>

          <Typography>{item.quantity}</Typography>

          <IconButton size="small" onClick={() => dispatch(addToCart(item))}>
            <Add fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <IconButton
        color="error"
        onClick={() => dispatch(removeFromCart(item.id))}
      >
        <Delete />
      </IconButton>
    </Box>
  );
};

export default CartItem;
