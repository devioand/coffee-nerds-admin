import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const OrderSkeletons = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="p-4 shadow-lg rounded-xl">
          <Skeleton className="h-6 w-3/4 rounded mb-2" />
          <Skeleton className="h-4 w-1/2 rounded mb-4" />
          <Skeleton className="h-4 w-full rounded mb-4" />
          <Skeleton className="h-4 w-5/6 rounded mb-4" />
          <Skeleton className="h-4 w-3/4 rounded mb-4" />
          <Skeleton className="h-4 w-3/4 rounded mb-4" />
          <Skeleton className="h-4 w-3/4 rounded mb-4" />
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-1/4 rounded" />
            <Skeleton className="h-8 w-1/4 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderSkeletons;
