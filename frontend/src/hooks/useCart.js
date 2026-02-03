import { useContext } from "react";
import { CartContext } from "../context/cartContextBase";

export const useCart = () => {
  return useContext(CartContext);
};