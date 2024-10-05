import { getOrders } from "@/app/(dashboard)/orders/actions";
import { Order, Product } from "@/types/order.types";
import { useQuery } from "@tanstack/react-query";

const useOrders = () => {
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data, error } = await getOrders();
      if (!!error) throw new Error("Failed to fetch order.");

      // Parse products JSON strings into Product array
      return data.map((order) => ({
        ...order,
        products: JSON.parse(order.products) as Product[],
      }));
    },
    refetchInterval: 5000,
  });
};

export default useOrders;
