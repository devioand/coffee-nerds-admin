import React, { FC, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteOrder, getTableById } from "@/app/(dashboard)/orders/actions";
import { Product, Table } from "@/types/order.types";
import { formatDistanceToNowStrict } from "date-fns";
import ConfirmationDialog from "../dialogs/ConfirmationDialog";

interface OrderCardProps {
  orderId: string;
  orderNo: string | number;
  tableId: string;
  products: Product[];
  paymentMethod: string;
  createdAt: string;
}
const OrderCard: FC<OrderCardProps> = ({
  orderId,
  orderNo,
  createdAt,
  paymentMethod,
  products,
  tableId,
}) => {
  const queryClient = useQueryClient();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const { data: table, isLoading: tableLoading } = useQuery<Table>({
    queryKey: ["tables", tableId],
    queryFn: () => getTableById(tableId),
  });
  const deleteOrderMutation = useMutation({
    mutationFn: (orderId: string) => deleteOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      alert("Failed to delete the order: " + error.message);
    },
  });

  const handleDelete = (orderId: string) => {
    setSelectedOrderId(orderId);
  };

  const confirmDelete = () => {
    if (selectedOrderId) {
      deleteOrderMutation.mutate(selectedOrderId);
      setSelectedOrderId(null);
    }
  };

  return (
    <>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Order #{orderNo}</CardTitle>
          <CardDescription>
            <div className="flex gap-1">
              <span>Table No: </span>
              {tableLoading ? (
                <span>Loading...</span>
              ) : (
                <span className="font-semibold">
                  {table?.table_number ? table?.table_number : "Not found"}
                </span>
              )}
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-10">
            <div className="space-y-2">
              <div>
                <span className="font-semibold">Products:</span>{" "}
                <span className="text-[16px] font-bobby">
                  {products.map((p) => p.name).join(", ")}
                </span>
              </div>
              <div className="capitalize">
                <span className="font-semibold">Payment Method:</span>{" "}
                {paymentMethod}
              </div>
              <div>
                <span className="font-semibold">Created At:</span>{" "}
                {formatDistanceToNowStrict(new Date(createdAt), {
                  addSuffix: true,
                })}
              </div>
              <div>
                <span className="font-semibold">Customer:</span> Guest
              </div>
            </div>
            <div className="flex space-x-2">
              <Button disabled>View</Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(orderId)}
              >
                {deleteOrderMutation.isPending ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation modal on order deletion */}
      <ConfirmationDialog
        isOpen={!!selectedOrderId}
        onClose={() => setSelectedOrderId(null)}
        onConfirm={confirmDelete}
        title="Confirm Deletion"
        description="Are you sure you want to delete this order? This action cannot be undone."
      />
    </>
  );
};

export default OrderCard;
