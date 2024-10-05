import React, { FC } from "react";
import { Badge } from "../ui/badge";

interface Props {
  status: string;
}
const OrderStatusBadge: FC<Props> = ({ status }) => {
  if (status === "pending") return <Badge variant="destructive">Pending</Badge>;
  if (status === "delivered") return <Badge variant="success">Delivered</Badge>;
  if (status === "completed") return <Badge variant="success">Completed</Badge>;
  return <Badge>{status}</Badge>;
};

export default OrderStatusBadge;
