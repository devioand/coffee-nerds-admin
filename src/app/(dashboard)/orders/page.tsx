"use client";

import React from "react";
import AlertDestructive from "@/components/alerts/AlertDestructive";
import OrderCard from "@/components/cards/OrderCard";
import OrderSkeletons from "@/components/skeletons/OrderSkeletons";
import AlertWarning from "@/components/alerts/AlertWarning";
import useOrders from "@/hooks/useOrders";

const Page = () => {
  const { data: orders, error, isLoading } = useOrders();

  if (!!isLoading) return <OrderSkeletons />;
  if (!!error?.message)
    return (
      <AlertDestructive
        className="w-max"
        title={error.message}
        description="Please attempt to refresh the page. If the issue continues, contact the IT team."
      />
    );
  if (!orders)
    return (
      <AlertDestructive
        className="w-max"
        title={"Invalid orders"}
        description="Please attempt to refresh the page. If the issue continues, contact the IT team."
      />
    );
  if (!!orders && orders.length === 0)
    return (
      <AlertWarning
        className="w-max"
        title="No order has been created yet."
        description="All new orders will be displayed here so wait for customer."
      />
    );
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            orderId={order.id}
            orderNo={order.order_no}
            createdAt={order.created_at}
            paymentMethod={order.payment_method}
            products={order.products}
            tableId={order.table_id}
          />
        ))}
      </div>
    </>
  );
};

export default Page;
